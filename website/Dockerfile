# Step 1: Use the official Node.js image
FROM node:16-alpine as build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Step 4: Copy the rest of the app’s code
COPY . .

# Step 5: Build the app for production
RUN npm run build

# Step 6: Use nginx to serve the static files (optional for static builds)
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3001
