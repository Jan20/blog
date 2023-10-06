###############
# Build Stage #
###############
FROM node:20 AS build_stage

WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Copy the application source code
COPY . .

# Build the application
RUN npm ci && npm run build:ssr

###############
# Final Image #
###############
FROM node:20-alpine3.17

# Copy only the necessary files from the build stage
COPY --from=build_stage /app/dist ./dist

# Expose the port that your application will listen on
EXPOSE 80

# Define the command to run your application
CMD ["node", "dist/blog/server/main.js"]