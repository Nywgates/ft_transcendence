FROM node:16

# Create directory for app
WORKDIR /user/src/app

# Copy package of nestjs Server
COPY package*.json ./

# install packages
RUN npm install

# Copy-Paste core file
COPY . .

# Build project
RUN npm run build

# Expost port
EXPOSE 5000

# Launch server
CMD ["node", "dist/main"]