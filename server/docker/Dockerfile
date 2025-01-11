# Specify the base image
FROM node:20-alpine

# Create the application directory
WORKDIR /usr/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code to the working directory
COPY server.mjs ./
COPY knexfile.cjs ./
COPY migrations ./migrations

# Expose the port that the application will use
EXPOSE 3000

# Command to run migrations and start the application
CMD [ "sh", "-c", "npm run migrate && npm start" ]
