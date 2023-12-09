    # Use Node.js as the base image
    FROM node:14

    # Set the working directory in the container
    WORKDIR /app

    # Copy package.json and package-lock.json to install dependencies
    COPY package.json package-lock.json ./

    # Install dependencies
    RUN npm install

    # Copy the rest of the application code to the container
    COPY . .

    # Expose port 3000 for the React development server
    EXPOSE 3000

    # Start the React development server
    CMD ["npm", "start"]
