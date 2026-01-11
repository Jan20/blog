############################################################
# Multi-stage Dockerfile optimized for Angular SSR
# - build stage uses official Node image to run full install + build
# - runtime stage installs only production deps and runs as non-root
############################################################

ARG NODE_VERSION=24

# ----- Build stage: full environment for compiling the app -----
FROM node:${NODE_VERSION} AS build
WORKDIR /app

# Copy only package manifests first to leverage docker layer caching
COPY package*.json ./

# Install all dependencies (including dev) required for building
RUN npm ci

# Copy source and build the SSR app (browser + server)
COPY . .
RUN npm run build:ssr --if-present


# ----- Runtime stage: small, production-only image -----
FROM node:${NODE_VERSION}-alpine3.21 AS runtime
WORKDIR /app

# Environment: production and port
ENV NODE_ENV=production
ENV PORT=80

# Install only production dependencies (no build tools)
# keep commands compact and avoid interactive prompts
COPY package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund

# Copy built artifacts from the build stage and assign to `node` user
# using --chown to avoid permission issues when switching users
COPY --from=build --chown=node:node /app/dist/blog/browser /app/browser
COPY --from=build --chown=node:node /app/dist/blog/server /app/server
COPY --from=build --chown=node:node /app/robots.txt /app/browser/ || true
COPY --from=build --chown=node:node /app/sitemap.xml /app/browser/ || true

RUN npm install -g pm2

# Expose the port the app listens on
EXPOSE 80

# Basic healthcheck: ensure the server responds on the configured PORT
CMD ["pm2-runtime", "/app/server/server.mjs"]
