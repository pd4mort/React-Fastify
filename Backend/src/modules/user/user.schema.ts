import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

/**
 * Core for user
 */
const userCore = {
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string'
    })
        .email(),
    name: z.string(),
}

const createUserSchema = z.object({
    ...userCore,
    password: z.string({
        required_error: 'Pasword is required',
        invalid_type_error: 'Pasword must be a string'
    })
});

const createUserResponseSchema = z.object({
    id: z.number(),
    ...userCore,
});

const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string'
    })
        .email(),
    password: z.string({
        required_error: 'Pasword is required',
    })
});

const loginResponseSchema = z.object({
    accessToken: z.string()
});


export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export const { schemas: userSchemas, $ref: userRef } = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema
}, {
    $id: 'UserSchema'
});
