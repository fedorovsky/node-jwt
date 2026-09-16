# node-jwt · client

React 18 + TypeScript single-page app built with Vite. State lives in Redux
Toolkit; server data is fetched with RTK Query; UI primitives come from
shadcn/ui on Tailwind CSS.

## Quick start

```bash
npm install
npm run dev
```

The dev server proxies `/api/*` to the backend on `http://localhost:3000` (see
`vite.config.ts`), so run the server alongside.

## Scripts

| Script            | Purpose                            |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start Vite with hot reload         |
| `npm run build`   | Type-check and build to `dist/`    |
| `npm run preview` | Serve the production build locally |
| `npm run lint`    | ESLint                             |
| `npm run format`  | Prettier                           |

## Project layout

```
src/
  app/          bootstrap: store, providers, router, layout (header/footer)
  pages/        route groups; each folder owns its <Routes> and page components
  features/
    auth/       API client, Redux slice + thunks, useAuth facade, forms, ProtectedRoute
    users/      users query + UsersTable
    profile/    current-user query, update mutation, EditProfileForm
  shared/
    api/        RTK Query root (baseUrl /api, bearer token header)
    config/     ROUTES constants
    lib/        token storage, error message helper
    types/      User
    ui/         small presentational pieces (PageTitle)
    styled-system/  shadcn/ui components, tailwind.css
```

Conventions: cross-feature imports go through the `@/` alias and a feature's
`index.ts`; relative imports stay inside a feature. Components never dispatch
thunks directly, they use `useAuth()`.

## Authentication flow

1. On mount `Layout` runs `useValidateToken()`, which sends the stored token to
   `POST /auth/validate-token` and keeps the renewed one.
2. `ProtectedRoute` waits for that check, then either renders or redirects to
   `/auth/login`, remembering where the user came from.
3. Login and register store the token and reset cached RTK Query data; logout
   clears both.

Profile editing (`/profile/edit`) sends `PATCH /users/me` and invalidates the
`Profile` and `Users` tags, so the header, profile view and users list refresh
without a reload.

The token is kept in `localStorage` under `token` via
`shared/lib/token-storage.ts`.

## Environment

| Variable               | Purpose                           |
| ---------------------- | --------------------------------- |
| `VITE_GIT_COMMIT_HASH` | Shown in the footer; set at build |

## Docker

```bash
docker build -t node-jwt-client -f docker/Dockerfile --build-arg GIT_COMMIT_HASH=$(git rev-parse --short HEAD) .
docker run -d -p 8080:80 --name node-jwt-client node-jwt-client
```

Nginx serves the SPA and proxies `/api/` to the `server` service defined in
`docker/docker-compose.yml` at the repository root.
