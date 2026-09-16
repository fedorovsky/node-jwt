# node-jwt · server

Express API with JWT authentication backed by SQLite (via knex).

## Quick start

```bash
npm install
npm run migrate
npm run dev                 # restarts on file changes
```

The API listens on `http://localhost:3000` by default.

## Scripts

| Script                           | Purpose                               |
| -------------------------------- | ------------------------------------- |
| `npm start`                      | Run the server                        |
| `npm run dev`                    | Run with file watching                |
| `npm test`                       | Run the test suite (in-memory SQLite) |
| `npm run migrate`                | Apply pending migrations              |
| `npm run migrate:make -- <name>` | Create a new migration                |
| `npm run migrate:rollback`       | Roll back the last migration batch    |
| `npm run format`                 | Format sources with Prettier          |

## Configuration

Settings live in [`src/config/index.mjs`](src/config/index.mjs): port `3000`, JWT secret and lifetime (`1h`), bcrypt cost and CORS origin. Environment variables are intentionally not used yet; when they are introduced, this module is the single place to change.

## Project layout

```
src/
  server.mjs              entry point: config, DB, HTTP server, graceful shutdown
  app.mjs                 composition root: wires dependencies and mounts routers
  config/                 application settings and knex factory
  lib/                    HttpError, asyncHandler, token service (jose)
  middleware/             validate, authenticate, error handling
  modules/
    auth/                 schemas → routes → controller → service
    users/                repository, controller, routes
    health/               liveness endpoint
test/                     node:test suites against an in-memory database
migrations/               knex migrations (CommonJS, used by the knex CLI)
```

Layering rule: routes know HTTP, services know business rules, repositories know SQL. Only `server.mjs` touches the process and the real database file.

## API

All error responses share one shape:

```json
{ "error": "Unauthorized", "message": "Human-readable explanation." }
```

Validation errors (`400`) additionally include `details: [{ field, message }]`.

### Auth

| Method | Path                   | Auth   | Success | Description                                  |
| ------ | ---------------------- | ------ | ------- | -------------------------------------------- |
| POST   | `/auth/register`       | —      | `201`   | Create a user; returns `{ message, token }`  |
| POST   | `/auth/login`          | —      | `200`   | Returns `{ message, token }`                 |
| POST   | `/auth/check-email`    | —      | `200`   | Returns `{ exists, message }`                |
| POST   | `/auth/validate-token` | Bearer | `200`   | Verifies the token and returns a renewed one |

Request body for `register` / `login`:

```json
{ "email": "user@example.com", "password": "at least 6 characters" }
```

Error codes: `400` invalid payload · `401` invalid credentials / bad token (`error` is `Token Expired` for expired tokens) · `409` email already registered.

### Users

| Method | Path                | Auth   | Description                                        |
| ------ | ------------------- | ------ | -------------------------------------------------- |
| GET    | `/users/me`         | Bearer | Current user `{ id, email, username }`             |
| GET    | `/users/all`        | —      | All users (no password hashes)                     |
| DELETE | `/users/remove-all` | —      | Deletes every user (development helper)            |
| GET    | `/protected`        | Bearer | Demo protected route; returns `{ message, users }` |

### Health

`GET /health` → `{ status: "ok", uptime, timestamp }` (also checks the database).

## Tokens

Tokens are HS256 JWTs signed with the secret from the config module, with `sub` = user id, `email`, `iat` and `exp`.
Send them as `Authorization: Bearer <token>`.

## Manual testing

- [`auth.http`](auth.http) — request collection for the JetBrains HTTP client / VS Code REST Client. Run "Auth - Register" first; it stores the credentials and token.
- [`tools/node-jwt.postman_collection.json`](tools/node-jwt.postman_collection.json) — Postman collection.

## Docker

```bash
docker build -t node-jwt-server -f docker/Dockerfile .
docker run -d -p 3000:3000 -v "$PWD/database.db:/usr/app/database.db" \
  --name node-jwt-server node-jwt-server
```

The image runs migrations on start and then launches the API.
