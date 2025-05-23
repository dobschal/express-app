
# This is the dockerfile for the production environment
# It builds the application and runs it

FROM node:lts-alpine
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY app.js .
COPY database ./database
COPY public ./public
COPY views ./views
COPY routes ./routes

EXPOSE 3000

CMD ["node", "app.js"]
