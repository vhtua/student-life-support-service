import { hashPassword, verifyPassword } from './utils/password_hash.js';

const userInputPassword = '123';
const encryptedPassword = '$2b$12$sSoc30jnIZ.KC.L2Jnq0X.ep9nhcFlPd10eByTcLPI.u/dLQFFZqy';

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
