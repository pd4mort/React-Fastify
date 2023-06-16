## dependencies
npm install @fastify/jwt @fastify/swagger @fastify/swagger-ui @prisma/client @types/node fastify fastify-zod ts-node-dev zod


## devDependencies
npm instal ts-node tslint typescript


## Initialise prisma
npx prisma init --datasource-provider postgresql

### Migrate schema
npx prisma migrate dev --name init

