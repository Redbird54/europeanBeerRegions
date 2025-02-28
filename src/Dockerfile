# Use the official Node.js image as a base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the backend application code to the container
COPY . .

# Expose the port your backend will listen on (e.g., 8080)
EXPOSE 8080

# Set environment variables (use .env instead of hardcoding)
ENV NODE_ENV=production

# Start the backend
CMD ["npm", "start"]
