## Docker

### Development
```bash
npm start
```

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

## Checking the Work:

- The client will be available at [http://localhost:7373](http://localhost:7373).
- The server will be available at [http://localhost:3000](http://localhost:3000).
