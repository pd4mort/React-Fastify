# Dockerfile backend
FROM node:16.15.0-alpine

WORKDIR /app

COPY package.json ./
RUN npm install
RUN npx prisma generate
RUN npx prisma migrate

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
