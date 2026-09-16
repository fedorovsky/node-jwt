import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startTestServer, uniqueEmail } from './helpers.mjs';

describe('users', () => {
  let api, close;
  const password = 'Sup3r-secret';

  const registerUser = async () => {
    const email = uniqueEmail();
    const res = await api('POST', '/auth/register', {
      body: { email, password },
    });
    return { email, token: res.body.token };
  };

  before(async () => ({ api, close } = await startTestServer()));
  after(() => close());

  test('GET /health reports ok', async () => {
    const res = await api('GET', '/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'ok');
  });

  test('GET /users/all lists users without password hashes', async () => {
    const { email } = await registerUser();
    const res = await api('GET', '/users/all');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));

    const user = res.body.find((u) => u.email === email);
    assert.ok(user);
    assert.deepEqual(Object.keys(user).sort(), ['email', 'id', 'username']);
  });

  test('GET /users/me returns the authenticated user', async () => {
    const { email, token } = await registerUser();
    const res = await api('GET', '/users/me', { token });
    assert.equal(res.status, 200);
    assert.equal(res.body.email, email);
    assert.equal(typeof res.body.id, 'number');
    assert.equal(typeof res.body.username, 'string');
    assert.equal(res.body.password, undefined);
  });

  test('GET /users/me without a token is 401', async () => {
    const res = await api('GET', '/users/me');
    assert.equal(res.status, 401);
    assert.equal(res.body.error, 'Unauthorized');
  });

  test('GET /protected requires a token and returns users', async () => {
    const { token } = await registerUser();
    assert.equal((await api('GET', '/protected')).status, 401);

    const res = await api('GET', '/protected', { token });
    assert.equal(res.status, 200);
    assert.equal(res.body.message, 'This is a protected route');
    assert.ok(res.body.users.length >= 1);
  });

  test('DELETE /users/remove-all clears the table', async () => {
    await registerUser();
    const res = await api('DELETE', '/users/remove-all');
    assert.equal(res.status, 200);
    assert.ok(res.body.deleted >= 1);

    const list = await api('GET', '/users/all');
    assert.deepEqual(list.body, []);
  });

  test('unknown routes return a JSON 404', async () => {
    const res = await api('GET', '/nope');
    assert.equal(res.status, 404);
    assert.equal(res.body.error, 'Not Found');
  });

  test('security headers are set and x-powered-by is hidden', async () => {
    const res = await api('GET', '/health');
    assert.equal(res.headers.get('x-powered-by'), null);
    assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
  });
});

describe('users · update profile', () => {
  let api, close;
  const password = 'Sup3r-secret';

  const registerUser = async () => {
    const email = uniqueEmail();
    const res = await api('POST', '/auth/register', {
      body: { email, password },
    });
    return { email, token: res.body.token };
  };

  before(async () => ({ api, close } = await startTestServer()));
  after(() => close());

  test('PATCH /users/me changes the username', async () => {
    const { email, token } = await registerUser();
    const res = await api('PATCH', '/users/me', {
      token,
      body: { username: '  New.Name_42  ' },
    });
    assert.equal(res.status, 200);
    assert.equal(res.body.username, 'New.Name_42');
    assert.equal(res.body.email, email);
    assert.equal(res.body.password, undefined);

    const me = await api('GET', '/users/me', { token });
    assert.equal(me.body.username, 'New.Name_42');
  });

  test('PATCH /users/me validates the username', async () => {
    const { token } = await registerUser();
    for (const username of ['ab', 'has space', 'x'.repeat(33), 'bad$char']) {
      const res = await api('PATCH', '/users/me', {
        token,
        body: { username },
      });
      assert.equal(
        res.status,
        400,
        `expected 400 for ${JSON.stringify(username)}`,
      );
      assert.equal(res.body.details[0].field, 'username');
    }
  });

  test('PATCH /users/me rejects an empty body and ignores unknown fields', async () => {
    const { email, token } = await registerUser();
    const empty = await api('PATCH', '/users/me', { token, body: {} });
    assert.equal(empty.status, 400);
    assert.equal(empty.body.message, 'Nothing to update');

    const sneaky = await api('PATCH', '/users/me', {
      token,
      body: { email: 'other@example.com', username: 'legit_name' },
    });
    assert.equal(sneaky.status, 200);
    assert.equal(sneaky.body.email, email);
  });

  test('PATCH /users/me requires authentication', async () => {
    const res = await api('PATCH', '/users/me', {
      body: { username: 'nope_1' },
    });
    assert.equal(res.status, 401);
  });
});
