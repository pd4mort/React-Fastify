import crypto from 'crypto'

//Hash&Salt generation
export function hashPassword(password: string) {

    const salt = crypto.randomBytes(16).toString("hex");

    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString('hex');

    return { hash, salt };
}

/**
 * verify Password user
 * @param param0 
 * @returns 
 */
export function verifyPassword({
    proposedPassword,
    salt,
    hash
}: {
    proposedPassword: string,
    salt: string,
    hash: string | null,
}) {
    const proposedHash = crypto.pbkdf2Sync(
        proposedPassword,
        salt,
        1000,
        64,
        "sha512"
    ).toString('hex');

    return proposedHash === hash;
};

