import { FastifyInstance } from "fastify";
import { getUserHandler, loginHandler, registerUserHandler } from "./user.controller"
import { userRef } from "./user.schema";

/**
 * User routes
 * @param server 
 */
async function userRoutes(server: FastifyInstance) {

    /**
     * Register new user
     */
    server.post('/', {
        schema: {
            body: userRef("createUserSchema"),
            response: {
                201: userRef("createUserResponseSchema")
            }
        }
    }, registerUserHandler
    );

    /**
     * Login user
     */
    server.post('/login', {
        schema: {
            body: userRef("loginSchema"),
            response: {
                200: userRef("loginResponseSchema")
            },
        },
    },
        loginHandler
    );

    /**
     * Get users
     * need authenticate
     */
    server.get('/', {
        preHandler: [server.authenticate],
        schema: userRef("loginResponseSchema"),
    },
        getUserHandler
    );
}

export default userRoutes