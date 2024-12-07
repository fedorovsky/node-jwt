## Development
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

| Command                          | Description                                                     | Example                                                                  |
|----------------------------------|-----------------------------------------------------------------|--------------------------------------------------------------------------|
| Docker Build with `arg`          | Build Docker image with a specified build argument.             | `docker compose build --build-arg GIT_COMMIT_HASH="custom-git-commit"`   |
| Docker Build                     | Build Docker image using the configuration in the Compose file. | `docker compose build`                                                   |
| Docker Run                       | Start and run the services defined in the Compose file.         | `docker compose up`                                                      |
| Docker Build and Run             | Build the Docker image and run the services.                    | `docker compose up --build`                                              |
| Docker Stop                      | Stop the services without removing containers.                  | `docker compose stop`                                                    |


Before building and running the Docker container, you need to manually create a `database.db` file. This step ensures that the Docker volume correctly maps to the file system and the application can access the database.


## Checking the Work:

- The client will be available at [http://localhost:7373](http://localhost:7373)  
- The server will be available at [http://localhost:3000](http://localhost:3000)
