import prisma from "../../utils/prisma";
import { hashPassword } from "../../utils/hash";
import { CreateUserInput } from "./user.schema"


/**
 * Create user service
 * @param input 
 * @returns 
 */
export async function createUser(input: CreateUserInput) {

    const { password, ...rest } = input;

    const { hash, salt } = hashPassword(password);

    const user = await prisma.user.create({
        data: { ...rest, salt, password: hash }
    });

    return user;
}

/**
 * Find user by email service
 * @param email 
 * @returns 
 */
export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email,
        }
    });
}

/**
 * Find all user service
 * @returns 
 */
export async function findUsers() {
    return prisma.user.findMany({
        select: {
            email: true,
            name: true,
            id: true
        }
    });
}