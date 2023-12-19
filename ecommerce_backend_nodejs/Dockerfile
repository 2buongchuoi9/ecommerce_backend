FROM node:20

EXPOSE 8088

WORKDIR /app

RUN npm i npm@latest -g

COPY packge.json packge-lock.json ./

RUN npm install

COPY . .

CMD [ "node", "server.js" ]