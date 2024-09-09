import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config();
const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

/**
 * Hashes a plain text password using bcrypt.
 * 
 * @param {string} userInputPassword - The plain text password to hash.
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 * @throws {Error} - Throws an error if hashing fails.
 * 
 * @example
 * // Example usage:
 * const hashedPassword = await hashPassword('myPassword123');
 * console.log(hashedPassword);
 */
async function hashPassword(userInputPassword) {
    try {
        console.log(saltRounds);
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(userInputPassword, salt);
        return hash; // Return the hashed password
    } catch (error) {
        throw new Error('Error hashing password: ' + error.message);
    }
}

/**
 * Verifies if the provided plain password matches the hashed password.
 * 
 * @param {string} userInputPassword - The plain text password provided by the user.
 * @param {string} encryptedPassword - The hashed password stored in the database.
 * @returns {Promise<boolean>} - Resolves to true if passwords match, otherwise false.
 */
async function verifyPassword(userInputPassword, encryptedPassword) {
    try {
        const isMatch = await bcrypt.compare(userInputPassword, encryptedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Error verifying password: ' + error.message);
    }
}


export {hashPassword, verifyPassword}