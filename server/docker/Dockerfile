FROM node:20-alpine

WORKDIR /usr/app

# Install production dependencies first to leverage the Docker layer cache.
COPY package*.json ./
RUN npm ci --omit=dev

COPY knexfile.cjs ./
COPY migrations ./migrations
COPY src ./src

EXPOSE 3000

# Run pending migrations, then start the API.
CMD [ "sh", "-c", "npm run migrate && npm start" ]
