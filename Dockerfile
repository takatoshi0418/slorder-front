FROM node:16.15.1

WORKDIR /var/www

RUN npm install npm -g
RUN npm install express

EXPOSE 8080

COPY slorder/dist/ /var/www/
COPY docker/server.js /var/www/server.js

CMD node server.js
