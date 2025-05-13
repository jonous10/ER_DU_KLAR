# Use Node base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm install

# Copy all app files
COPY . .

# Use port 3000 for Next.js
EXPOSE 3000

# Build step
RUN npm run build

# Production start
CMD ["npm", "start"]
