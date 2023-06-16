import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail, findUsers } from "./user.service";
import { CreateUserInput, LoginInput } from "./user.schema";
import { verifyPassword } from "../../utils/hash";

/**
 * Register user handler
 * @param request 
 * @param reply 
 * @returns 
 */
export async function registerUserHandler(
    request: FastifyRequest<{
        Body: CreateUserInput;
    }>,
    reply: FastifyReply
) {
    const body = request.body;
    try {
        const user = await createUser(body);
        
        return reply.code(201).send( user );

    } catch (e) {
        console.log(e)
        return reply.code(500).send(e);
    }
}

/**
 * login user handler
 * @param request 
 * @param reply 
 * @returns 
 */
export async function loginHandler(request: FastifyRequest<{
    Body: LoginInput
}>,
    reply: FastifyReply
) {
    const body = request.body

    //find user by email
    const user = await findUserByEmail(body.email)

    if (!user) {
        return reply.code(401).send({
            message: "Invalid credentials"
        });
    }

    // verify password
    const correctPassword = verifyPassword({
        proposedPassword: body.password,
        salt: user.salt,
        hash: user.password
    });

    if (correctPassword) {
        const { password, salt, ...rest } = user;
    
        // generate access token
        const accessToken = request.jwt.sign({ ...rest });
        
        return { accessToken };
    }
    
    return reply.code(401).send({
        message: "Invalid credentials"
    });

}

export async function getUserHandler() {
    const users = await findUsers();

    return users;
}