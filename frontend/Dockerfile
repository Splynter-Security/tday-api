FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install http-server -g

COPY . .

EXPOSE 8080

CMD ["http-server", ".", "-p", "8080"]
