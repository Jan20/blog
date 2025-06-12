# BUILD STAGE
FROM node:24 AS build_stage

WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the application source code
COPY . .

# Build the Angular SSR application (both browser and server builds)
RUN npm run build:ssr

# -------------------------------------------------------------------
# FINAL IMAGE
FROM node:24-alpine3.21

WORKDIR /app

# Copy necessary files from the builder stage

COPY --from=build_stage /app/dist/blog/browser /app/browser
COPY --from=build_stage /app/dist/blog/server /app/server

COPY robots.txt sitemap.xml /app/browser/

# Install pm2 for process management
RUN npm install -g pm2

# Expose the port that your application will listen on
EXPOSE 80

# Define the command to run your application
CMD ["pm2-runtime", "/app/server/server.mjs"]
