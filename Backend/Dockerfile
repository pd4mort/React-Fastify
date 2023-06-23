# Dockerfile backend
FROM node:16.13-alpine as builder

WORKDIR /app

COPY package.json ./
RUN npm install
COPY ./prisma prisma
COPY ./src src
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
