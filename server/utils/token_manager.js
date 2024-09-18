import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET_STAFF = process.env.ACCESS_TOKEN_SECRET_STAFF;
const REFRESH_TOKEN_SECRET_STAFF = process.env.REFRESH_TOKEN_SECRET_STAFF;
const ACCESS_TOKEN_SECRET_ADMIN = process.env.ACCESS_TOKEN_SECRET_ADMIN;
const REFRESH_TOKEN_SECRET_ADMIN = process.env.REFRESH_TOKEN_SECRET_ADMIN;
const ACCESS_TOKEN_EXPIRED_IN = String(process.env.EXPIRED_BEARER_ACCESS_TOKEN_TIME);
const REFRESH_TOKEN_EXPIRED_IN = Number(process.env.EXPIRED_BEARER_REFRESH_TOKEN_TIME);


const getTokenSecretByRoleName = (roleName) => {
    let USER_ACCESS_TOKEN_SECRET;
    let USER_REFRESH_TOKEN_SECRET;
    switch (roleName) {
        case "Student":
            USER_ACCESS_TOKEN_SECRET = ACCESS_TOKEN_SECRET;
            USER_REFRESH_TOKEN_SECRET = REFRESH_TOKEN_SECRET;
            break;
        case "Dorm Staff":
        case "Student Affairs":
            USER_ACCESS_TOKEN_SECRET = ACCESS_TOKEN_SECRET_STAFF;
            USER_REFRESH_TOKEN_SECRET = REFRESH_TOKEN_SECRET_STAFF;
            break;
        case "Admin":
            USER_ACCESS_TOKEN_SECRET = ACCESS_TOKEN_SECRET_ADMIN;
            USER_REFRESH_TOKEN_SECRET = REFRESH_TOKEN_SECRET_ADMIN;
            break;
        default:
            USER_ACCESS_TOKEN_SECRET = ACCESS_TOKEN_SECRET;
            USER_REFRESH_TOKEN_SECRET = REFRESH_TOKEN_SECRET;
    }

    return { USER_ACCESS_TOKEN_SECRET, USER_REFRESH_TOKEN_SECRET }
}


// Helper function to promisify jwt.verify
const verifyTokenAsync = (token, secret) => {
    
    return new Promise((resolve, reject) => {

        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return reject(err);
            }
            resolve(user);
        });
        
    });

};


export default { getTokenSecretByRoleName, verifyTokenAsync }