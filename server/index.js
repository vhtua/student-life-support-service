import { hashPassword, verifyPassword } from './utils/password_hash.js';

const userInputPassword = 's0/\/\P4$$w0rD';
const encryptedPassword = '$2b$10$7mgbuI0wy8ymPGvvcq6PWOLKscGcvEKVVNHAJf1GSKooqQN6AIUeq';

(async () => {
    try {
        const hashedPassword = await hashPassword(userInputPassword);
        console.log('Hashed password:', hashedPassword);
    } catch (error) {
        console.error(error.message);
    }
})();


(async () => {
    try {
        const verifyAuthentication = await verifyPassword(userInputPassword, encryptedPassword);
        console.log(verifyAuthentication);
    } catch (error) {
        console.error(error.message)
    }    
})();
