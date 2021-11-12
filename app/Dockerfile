FROM node:16-alpine3.12

WORKDIR /usr/src/app

RUN npm i -g @nestjs/cli

COPY package.json ./

RUN npm install

# RUN npm run build

COPY . .

RUN nest build

# RUN mkdir -p filestorage/wallet

CMD ["npm", "run", "start"]
