# Base image
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app's files
COPY . .

# Build the client
RUN npm run build

# Serve the built client with a lightweight HTTP server
FROM nginx:1.21
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the client
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
