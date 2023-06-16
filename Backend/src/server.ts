import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import fjwt, { JWT } from '@fastify/jwt';
import userRoutes from "./modules/user/user.route";
import productRoutes from "./modules/product/product.route";
import { userSchemas } from './modules/user/user.schema'
import { productSchemas } from './modules/product/product.schema'
import { version } from '../package.json'

/**
 * Modules
 */
declare module "fastify" {
    interface FastifyRequest {
        jwt: JWT;
    }
    export interface FastifyInstance {
        authenticate: any;
    }
}

declare module "@fastify/jwt" {
    interface FastifyJWT {
        user: {
            id: number;
            email: string;
            name: string;
        };
    }
}
/**-------------------- Fin declare modules */


/**
 * Server build
 * @returns 
 */
function buildServer() {

    const server = Fastify();
    //CORS
    server.register(require('@fastify/cors'), {
        origin: true,
    });
    //secret
    server.register(require("@fastify/jwt"), {
        secret: 'pojiadv645adsfkluh35asdfg45g'
    });
    //JWT
    server.decorate(
        "authenticate",
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await request.jwtVerify();
            } catch (e) {
                return reply.send(e);
            }
        }
    );


    server.addHook("preHandler", (req, reply, next) => {
        req.jwt = server.jwt;
        return next();
    });

    const allSchemas = [...userSchemas, ...productSchemas];

    for (const schema of allSchemas) {
        server.addSchema(schema);
    }

    /**
     * SWAGGER
     */
    const swaggerOptions = {
        swagger: {
            info: {
                title: "Fastify & Prisma API",
                description: "API for products",
                version,
            },
            host: "localhost:3001",
            schemes: ["http", "https"],
            consumes: ["application/json"],
            produces: ["application/json"],
            securityDefinitions: {
                bearerAuth: {
                    type: "apiKey",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    in: "header",
                }
            },
            paths: {
                "/": {
                    get: {
                        security: [{
                            Bearer: []
                        }]
                    }
                }
            }
        },
    };

    const swaggerUiOptions = {
        routePrefix: "/docs",
        exposeRoute: true,
    };


    server.register(require('@fastify/swagger'), swaggerOptions);
    server.register(require('@fastify/swagger-ui'), swaggerUiOptions);
    server.register((server, options, done) => {
        server.get("/check-alive", {
            schema: {
            },
            handler: (req, res) => {
                res.send({ status: "OK" });
            },
        });
        done();
    });

    /**Fin SWAGGER */

    server.register(userRoutes, { prefix: "api/users" });
    server.register(productRoutes, { prefix: "api/product" });

    return server;
}

export default buildServer;
