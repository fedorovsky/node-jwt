## Docker

Build a Docker Image from the current directory with the name node-jwt-client

```bash
docker build -t node-jwt-client .
```

Run the container in detached mode, map port 3000 to 3000, and name it
node-jwt-client-container

```bash
docker run -d -p 3000:80 --name node-jwt-client-container node-jwt-client
```
