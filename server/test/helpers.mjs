import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createConfig } from '../src/config/index.mjs';
import { createDb } from '../src/config/db.mjs';
import { createApp } from '../src/app.mjs';

const migrationsDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'migrations',
);

const silentLogger = { error() {}, warn() {}, log() {} };

/**
 * Boots the app against a fresh in-memory SQLite database on a random port.
 * Returns a tiny fetch wrapper plus a teardown function.
 */
export async function startTestServer(configOverrides = {}) {
  const config = createConfig({
    nodeEnv: 'test',
    bcryptSaltRounds: 4,
    ...configOverrides,
    jwt: {
      secret: 'test-secret-that-is-long-enough-for-hs256-use',
      ...configOverrides.jwt,
    },
  });

  const db = createDb({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: { filename: ':memory:' },
    migrations: { directory: migrationsDir },
  });
  await db.migrate.latest();

  const app = createApp({ config, db, logger: silentLogger });
  const server = await new Promise((resolve) => {
    const s = app.listen(0, '127.0.0.1', () => resolve(s));
  });
  const baseUrl = `http://127.0.0.1:${server.address().port}`;

  const api = async (method, path, { body, token } = {}) => {
    const headers = {};
    if (body !== undefined) headers['content-type'] = 'application/json';
    if (token) headers.authorization = `Bearer ${token}`;

    const res = await fetch(baseUrl + path, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const text = await res.text();
    let json = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = text;
    }
    return { status: res.status, body: json, headers: res.headers };
  };

  const close = async () => {
    await new Promise((resolve) => server.close(resolve));
    await db.destroy();
  };

  return { api, close, config, baseUrl };
}

export const uniqueEmail = () =>
  `user-${Date.now()}-${Math.random().toString(16).slice(2)}@example.com`;
