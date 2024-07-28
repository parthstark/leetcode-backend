FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install typescript --save-dev

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]
