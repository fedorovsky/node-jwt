## Development
```bash
npm install
```
```bash
npm start
```
Runs both the client-side and server-side of the application in development mode, enabling live updates during development. Here's a breakdown:

#### Client-side
- **Framework**: React  
- **Tooling**: Vite
- **Language**: TypeScript  

#### Server-side
- **Runtime**: Node.js  
- **Framework**: Express
- **Database**: SQLite (a lightweight, file-based database)  

This setup provides an integrated environment for seamless frontend and backend development.

## Docker  

| Command                          | Description                                                     | Example                                                                                             |
|----------------------------------|-----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| Docker Build with `arg`          | Build Docker image with a specified build argument.             | `docker compose -f docker/docker-compose.yml build --build-arg GIT_COMMIT_HASH="custom-git-commit"` |
| Docker Build                     | Build Docker image using the configuration in the Compose file. | `docker compose -f docker/docker-compose.yml build`                                                 |
| Docker Run                       | Start and run the services defined in the Compose file.         | `docker compose -f docker/docker-compose.yml up`                                                    |
| Docker Build and Run             | Build the Docker image and run the services.                    | `docker compose -f docker/docker-compose.yml up --build`                                            |
| Docker Stop                      | Stop the services without removing containers.                  | `docker compose -f docker/docker-compose.yml stop`                                                  |


Before building and running the Docker container, you need to manually create a `database.db` file. 
Example: `touch database.db` in the root directory of the project.
This step ensures that the Docker volume correctly maps to the file system and the application can access the database.

## Checking the Work

### Docker Compose

After `docker compose -f docker/docker-compose.yml up` the services are published on these host ports:

| Service       | Address                                          | Notes                                                                                   |
|---------------|--------------------------------------------------|-----------------------------------------------------------------------------------------|
| Client        | [http://localhost:1001](http://localhost:1001)   | nginx serving the React build; requests to `/api/*` are proxied to the server container |
| Server (API)  | [http://localhost:1002](http://localhost:1002)   | Express API directly, e.g. `http://localhost:1002/health`                               |
| SQLite Viewer | [http://localhost:1003](http://localhost:1003)   | `sqlite-web` over the shared `database.db`                                              |

Inside the Compose network the client reaches the API as `http://server:3000`; the API is also available through the client at `http://localhost:1001/api/...` (the `/api` prefix is stripped by nginx).

### Development (`npm start`)

| Service      | Address                                        | Notes                                                        |
|--------------|------------------------------------------------|--------------------------------------------------------------|
| Client       | [http://localhost:5173](http://localhost:5173) | Vite dev server; `/api/*` is proxied to the server            |
| Server (API) | [http://localhost:3000](http://localhost:3000) | Express with `node --watch`, e.g. `http://localhost:3000/health` |
