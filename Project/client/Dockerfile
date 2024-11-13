# Build stage: Build the Vite app
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the entire project to the container
COPY . .

# Copy the environment file for the appropriate environment
COPY .env.production .env

# Build the Vite app (production build)
RUN npm run build

# Production stage: Use a lightweight server to serve the static files
FROM node:16-slim

# Set the working directory
WORKDIR /app

RUN mkdir "shared"
RUN mkdir "build"

# Install http-server globally to serve the static files
RUN npm install -g http-server

# Copy the built files from the build stage
COPY --from=build /app/dist /app/build

# Run http-server to serve the static files on the chosen port
CMD mv build/* shared; http-server build -p 8080 --host 0.0.0.0
