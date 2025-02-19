# Use the official Node.js image as a base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the backend application code to the container
COPY . .

# Expose the port your backend will listen on (e.g., 8080)
EXPOSE 8080

# Wait for database container to be ready before starting backend server
RUN apt-get update && apt-get install -y curl && \
    curl -LO https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -xvzf dockerize-linux-amd64-v0.6.1.tar.gz -C /usr/local/bin && \
    rm dockerize-linux-amd64-v0.6.1.tar.gz

# Run the backend server
CMD ["dockerize", "-wait", "tcp://mysql-db:3306", "-timeout", "60s", "npm", "start"]
