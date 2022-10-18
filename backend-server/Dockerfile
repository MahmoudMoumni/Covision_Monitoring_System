# Use Node v8.9.0 LTS
#FROM node:carbon
FROM node:14-alpine

# Setup app working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install
RUN npm install express  multer sequelize mysql2  nodemailer  axios
RUN npm install cors --save
RUN npm install jsonwebtoken passport passport-local lodash bcryptjs   --save
RUN npm install nodemon --save-dev

# Copy sourcecode
COPY . .

# Start app
CMD [ "npm", "start" ]