FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p logs

EXPOSE 6969

CMD ["npm", "run", "dev"]