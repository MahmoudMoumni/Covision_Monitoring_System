# stage 1
FROM node:latest as node
WORKDIR /app
COPY package*.json ./
COPY . .
#RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install
RUN npm install -g @angular/cli && npm install
RUN npm install --save hls.js

EXPOSE 4202

CMD ["npm", "start"]


