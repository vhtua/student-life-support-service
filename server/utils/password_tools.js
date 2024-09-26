import bcrypt from 'bcryptjs'
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
        // console.log(saltRounds);
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


function generateRandomPassword() {
    // 1. Password must be at least 8 characters long
    // 2. Password must contain at least one uppercase letter
    // 3. Password must contain at least one lowercase letter
    // 4. Password must contain at least one number
    // 5. Password must contain at least one special character  
    
    const length = 8;
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    const allChars = uppercase + lowercase + numbers + specialChars;

    let password = '';
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    return shuffleString(password);
}


function shuffleString(string) {
    const array = string.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}


export default {hashPassword, verifyPassword, generateRandomPassword}