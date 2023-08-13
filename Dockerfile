# Stage 1: Build the application
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy the application source code
COPY . .

# Build the application
RUN npm run build:ssr

# Stage 2: Create the production image
FROM node:18-alpine

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Expose the port that your application will listen on
EXPOSE 80

# Define the command to run your application
CMD ["node", "dist/blog/server/main.js"]