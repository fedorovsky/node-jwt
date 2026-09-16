import { config } from './config/index.mjs';
import { createDb } from './config/db.mjs';
import { createApp } from './app.mjs';

const SHUTDOWN_TIMEOUT_MS = 10_000;

async function main() {
  const db = createDb();

  // Fail at startup if the database is unreachable; warn if not migrated.
  await db.raw('select 1');
  const [, pending] = await db.migrate.list();
  if (pending.length > 0) {
    console.warn(
      `[db] ${pending.length} pending migration(s); run "npm run migrate"`,
    );
  }

  const app = createApp({ config, db });

  const server = app.listen(config.port, config.host, () => {
    console.log(
      `[server] ${config.nodeEnv} listening on http://${config.host}:${config.port}`,
    );
  });

  server.on('error', async (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`[server] port ${config.port} is already in use`);
    } else {
      console.error('[server] failed to listen', err);
    }
    await db.destroy();
    process.exit(1);
  });

  const shutdown = (signal) => {
    console.log(`[server] ${signal} received, shutting down`);

    const forceExit = setTimeout(() => {
      console.error('[server] forced exit after timeout');
      process.exit(1);
    }, SHUTDOWN_TIMEOUT_MS).unref();

    server.close(async () => {
      try {
        await db.destroy();
        clearTimeout(forceExit);
        process.exit(0);
      } catch (err) {
        console.error('[server] error during shutdown', err);
        process.exit(1);
      }
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('unhandledRejection', (reason) => {
    console.error('[server] unhandled rejection', reason);
    shutdown('unhandledRejection');
  });
}

main().catch((err) => {
  console.error('[server] failed to start', err);
  process.exit(1);
});
