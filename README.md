## Development
```bash
npm start
```
Runs both the client-side and server-side of the application in development mode, enabling live updates during development. Here's a breakdown:

### Client-side
- **Framework**: React  
- **Tooling**: Vite (for fast development with Hot Module Replacement - HMR)  
- **Language**: TypeScript  

Theclient-side handles UI updates and provides an efficient development workflow.

### Server-side
- **Runtime**: Node.js  
- **Framework**: Express (for server logic and API handling)  
- **Database**: SQLite (a lightweight, file-based database)  

This setup provides an integrated environment for seamless frontend and backend development.


## Docker

### Docker Build with arg
```bash
docker compose build --build-arg GIT_COMMIT_HASH="custom-git-commit"
```

### Docker Build
```bash
docker compose build
```

### Docker Run
```bash
docker compose up
```

### Docker Build and Run
```bash
docker compose up --build
```
Before building and running the Docker container, you need to manually create a `database.db` file. This step ensures that the Docker volume correctly maps to the file system and the application can access the database.


## Checking the Work:

- The client will be available at [http://localhost:7373](http://localhost:7373)  
- The server will be available at [http://localhost:3000](http://localhost:3000)
