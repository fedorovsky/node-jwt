import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { SignJWT } from 'jose';
import { startTestServer, uniqueEmail } from './helpers.mjs';

describe('auth', () => {
  let api, close, config, baseUrl;
  const password = 'Sup3r-secret';

  before(async () => {
    ({ api, close, config, baseUrl } = await startTestServer());
  });
  after(() => close());

  test('registers a new user and returns a token', async () => {
    const res = await api('POST', '/auth/register', {
      body: { email: uniqueEmail(), password },
    });
    assert.equal(res.status, 201);
    assert.equal(res.body.message, 'User registered successfully');
    assert.match(res.body.token, /^[\w-]+\.[\w-]+\.[\w-]+$/);
  });

  test('normalises email case and rejects duplicates with 409', async () => {
    const email = uniqueEmail();
    const first = await api('POST', '/auth/register', {
      body: { email: email.toUpperCase(), password },
    });
    assert.equal(first.status, 201);

    const dup = await api('POST', '/auth/register', {
      body: { email, password },
    });
    assert.equal(dup.status, 409);
    assert.equal(dup.body.message, 'User already exists');
  });

  test('rejects invalid registration payloads with 400', async () => {
    const badEmail = await api('POST', '/auth/register', {
      body: { email: 'nope', password },
    });
    assert.equal(badEmail.status, 400);
    assert.equal(badEmail.body.message, 'Valid email is required');
    assert.equal(badEmail.body.details[0].field, 'email');

    const shortPassword = await api('POST', '/auth/register', {
      body: { email: uniqueEmail(), password: '123' },
    });
    assert.equal(shortPassword.status, 400);
    assert.match(shortPassword.body.message, /at least 6 characters/);

    const missing = await api('POST', '/auth/register', { body: {} });
    assert.equal(missing.status, 400);
  });

  test('rejects malformed JSON with 400', async () => {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{ not json',
    });
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.equal(body.message, 'Malformed JSON body.');
  });

  test('logs in with valid credentials', async () => {
    const email = uniqueEmail();
    await api('POST', '/auth/register', { body: { email, password } });

    const res = await api('POST', '/auth/login', { body: { email, password } });
    assert.equal(res.status, 200);
    assert.equal(res.body.message, 'Login successful');
    assert.ok(res.body.token);
  });

  test('returns the same 401 for unknown email and wrong password', async () => {
    const email = uniqueEmail();
    await api('POST', '/auth/register', { body: { email, password } });

    const unknown = await api('POST', '/auth/login', {
      body: { email: uniqueEmail(), password },
    });
    const wrong = await api('POST', '/auth/login', {
      body: { email, password: 'wrong-password' },
    });

    assert.equal(unknown.status, 401);
    assert.equal(wrong.status, 401);
    assert.deepEqual(unknown.body, wrong.body);
    assert.equal(wrong.body.message, 'Invalid credentials');
  });

  test('reports whether an email is registered', async () => {
    const email = uniqueEmail();
    const before = await api('POST', '/auth/check-email', { body: { email } });
    assert.equal(before.status, 200);
    assert.deepEqual(before.body, {
      exists: false,
      message: 'Email is available',
    });

    await api('POST', '/auth/register', { body: { email, password } });

    const after = await api('POST', '/auth/check-email', { body: { email } });
    assert.deepEqual(after.body, {
      exists: true,
      message: 'Email is already registered',
    });
  });

  test('validate-token renews a valid token', async () => {
    const { body } = await api('POST', '/auth/register', {
      body: { email: uniqueEmail(), password },
    });

    const res = await api('POST', '/auth/validate-token', {
      token: body.token,
    });
    assert.equal(res.status, 200);
    assert.equal(res.body.message, 'Token is valid and has been renewed.');
    assert.ok(res.body.token);
  });

  test('validate-token rejects missing, expired and forged tokens', async () => {
    const key = new TextEncoder().encode(config.jwt.secret);
    const email = uniqueEmail();
    await api('POST', '/auth/register', { body: { email, password } });

    const missing = await api('POST', '/auth/validate-token');
    assert.equal(missing.status, 401);
    assert.equal(missing.body.error, 'Unauthorized');

    const expired = await new SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(Math.floor(Date.now() / 1000) - 60)
      .sign(key);
    const expiredRes = await api('POST', '/auth/validate-token', {
      token: expired,
    });
    assert.equal(expiredRes.status, 401);
    assert.equal(expiredRes.body.error, 'Token Expired');

    const forged = await new SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode('another-secret-another-secret-123456'));
    const forgedRes = await api('POST', '/auth/validate-token', {
      token: forged,
    });
    assert.equal(forgedRes.status, 401);
    assert.equal(forgedRes.body.message, 'Authentication token is invalid.');

    const ghost = await new SignJWT({ email: uniqueEmail() })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(key);
    const ghostRes = await api('POST', '/auth/validate-token', {
      token: ghost,
    });
    assert.equal(ghostRes.status, 401);
    assert.equal(
      ghostRes.body.message,
      'Authentication failed. User not found.',
    );
  });

  test('accepts legacy tokens that carry only an email claim', async () => {
    const email = uniqueEmail();
    await api('POST', '/auth/register', { body: { email, password } });

    const legacy = await new SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(config.jwt.secret));

    const res = await api('GET', '/users/me', { token: legacy });
    assert.equal(res.status, 200);
    assert.equal(res.body.email, email);
  });
});
