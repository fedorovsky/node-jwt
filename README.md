# node-jwt

### Build a Docker image from the current directory with the name node-jwt-image
```bash
docker build -t node-jwt-image .
```

### Run the container in detached mode, map port 3000 to 3000, and name it node-jwt-container
```bash
docker run -d -p 3000:3000 --name node-jwt-container node-jwt-image
```
