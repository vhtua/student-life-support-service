// For authorization
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Redis from '../config/redis.js';
import TokenManager from '../utils/token_manager.js'

// For authentication
import pool from "../config/db.js"
import queries from "../sql/auth_queries.js";
import passwordTool from "../utils/password_tools.js"

// Logger
import logger from '../middleware/logger.js';


dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET_STAFF = process.env.ACCESS_TOKEN_SECRET_STAFF;
const REFRESH_TOKEN_SECRET_STAFF = process.env.REFRESH_TOKEN_SECRET_STAFF;
const ACCESS_TOKEN_SECRET_ADMIN = process.env.ACCESS_TOKEN_SECRET_ADMIN;
const REFRESH_TOKEN_SECRET_ADMIN = process.env.REFRESH_TOKEN_SECRET_ADMIN;
const ACCESS_TOKEN_EXPIRED_IN = String(process.env.EXPIRED_BEARER_ACCESS_TOKEN_TIME);
const REFRESH_TOKEN_EXPIRED_IN = Number(process.env.EXPIRED_BEARER_REFRESH_TOKEN_TIME);



/**
 * Asynchronous login route handler for authenticating users and issuing access and refresh tokens.
 *
 * This function handles the login process by:
 * 1. Retrieving the username and password from the request body.
 * 2. Verifying the provided credentials against the stored password in the database.
 * 3. If authentication is successful, it generates an access token (with an amount of short time expiration) 
 *    and a refresh token (with longer expiration).
 * 4. The refresh token is stored securely in Redis and sent to the client as an HTTP-only, 
 *    secure cookie. The access token is included in the JSON response.
 *
 * If authentication fails (e.g., due to invalid credentials), the function returns a `401 Unauthorized` 
 * response with an appropriate message. In case of server errors, a `500 Internal Server Error` 
 * response is returned.
 *
 * @param {Object} req - The HTTP request object. It expects `req.body` to contain:
 *   - `username` (string): The user's username.
 *   - `password` (string): The user's password.
 * @param {Object} res - The HTTP response object used to send the access token and user details
 *   in the response body, and the refresh token as a cookie.
 *
 * @returns {void} - Sends the following responses:
 *   - `401 Unauthorized`: If the username or password is invalid.
 *   - `500 Internal Server Error`: If a database error occurs.
 *   - `200 OK`: If login is successful, the response contains:
 *      - Access token (JSON Web Token).
 *      - User details (username, email, user ID).
 *      - Refresh token stored in an HTTP-only, secure cookie.
 *
 * @example
 * // POST request body:
 * {
 *   "username": "john_doe",
 *   "password": "password123"
 * }
 * 
 * // Successful login response:
 * {
 *   "userId": "1",
 *   "username": "john_doe",
 *   "email": "john@example.com",
 *   "accessToken": "jwt-token-here"
 * }
 * 
 * @throws {Error} - If there is a problem with querying the database or verifying the password,
 *                   an appropriate error is logged and a `401 Unauthorized` or `500 Internal Server Error` 
 *                   response is returned.
 */
const authenticateUser = async (req, res) => {

    // Authentication
    const { username, password } = req.body;
    logger.info(`username: ${username} is trying to log in`);

    pool.query(queries.getUserPasswordByUsername, [username], (error, results) => {
        if (error) {
            res.status(500).json([]);
            logger.error(`username: ${username} logged in failed due to internal server error`);
            throw error;
        }

        (async () => {
            try {
                const dbRetrievedPassword = String(results.rows[0].password) ;
                const isAuthenticated = await passwordTool.verifyPassword(String(password), dbRetrievedPassword);
                
                if (!isAuthenticated) {
                    res.status(403).json({ message: 'Invalid username or password' });
                    logger.error(`username: ${username} logged in failed due to wrong credentials information`);
                } else {
                    // Authorization

                    const userId = String(results.rows[0].id); 
                    const username = String(results.rows[0].username); 
                    const email = String(results.rows[0].email);
                    const fullname = String(results.rows[0].fullname);
                    const role_name = String(results.rows[0].role_name);

                    const user = { userId, username, email, fullname, role_name };


                    const { USER_ACCESS_TOKEN_SECRET, USER_REFRESH_TOKEN_SECRET } = TokenManager.getTokenSecretByRoleName(role_name);
                    // console.log(USER_ACCESS_TOKEN_SECRET);
                    // console.log(USER_REFRESH_TOKEN_SECRET);

                    // Issue Access Token (expires in an amount of time)
                    const accessToken = jwt.sign(user, USER_ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRED_IN });
                
                    // Issue Refresh Token
                    const refreshToken = jwt.sign(user, USER_REFRESH_TOKEN_SECRET);
                
                    // Store Refresh Token in Redis with expiration
                    await Redis.storeRefreshTokenInRedis(userId, refreshToken, REFRESH_TOKEN_EXPIRED_IN);
                
                    // Send Refresh Token as an HTTP-only, Secure cookie
                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,       // Prevent JavaScript access to the cookie
                        secure: true,         // Send only over HTTPS
                        sameSite: 'Strict',   // Protect against CSRF
                        maxAge: REFRESH_TOKEN_EXPIRED_IN * 1000, // in milliseconds
                    });
                    

                    logger.info(`username: ${username} logged into the system`);
                    // Send access token in response
                    res.json({ ...user, accessToken });
                }
                
            } catch (error) {
                res.status(403).json([]);
                logger.error(error.message);
            }    
        })();
        
    })
}



/**
 * Asynchronous logout route handler for clearing refresh tokens and ending user sessions.
 *
 * This function handles the logout process by:
 * 1. Retrieving the `refreshToken` from the cookies in the request.
 * 2. If the refresh token exists, it deletes the token from Redis to invalidate it.
 * 3. Clears the `refreshToken` cookie from the user's browser.
 * 4. Returns a message indicating that logout was successful.
 *
 * If no refresh token is found in the cookies, it immediately responds with a logout success message.
 * In case of any errors during the process (e.g., Redis errors), it returns a `500 Internal Server Error`.
 *
 * @param {Object} req - The HTTP request object. It expects `req.cookies.refreshToken` 
 *                       to contain the refresh token, if present.
 * @param {Object} res - The HTTP response object used to send the logout success message
 *                       and clear the refresh token cookie.
 *
 * @returns {void} - Sends the following responses:
 *   - `200 OK`: If the refresh token is successfully cleared, with the message "Logout successful".
 *   - `500 Internal Server Error`: If an error occurs while attempting to delete the token from Redis.
 *
 * @example
 * // Client has a valid refresh token:
 * // Clears the refresh token from Redis and sends a success message.
 * // Also clears the 'refreshToken' cookie.
 *
 * // Client does not have a refresh token:
 * // Simply sends the message "Logout successful".
 *
 * @throws {Error} - If there is an issue clearing the token from Redis, a `500 Internal Server Error` 
 *                   response is sent, and the error is logged.
 */
const logOutUser = async (req, res) => {
    const refreshToken = req.cookies.refreshToken; // Get refresh token from cookie
    if (!refreshToken) {
      res.send('Logout successful');
    } else {
      try {
          await Redis.redisClient.del(`refreshToken:${refreshToken}`);
          res.clearCookie('refreshToken'); // Clear the refresh token cookie
          res.send('Logout successful');
        } catch (err) {
          res.status(500).send('Error logging out');
        }
    }
}



/**
 * Asynchronous route handler for refreshing the access token using a refresh token.
 *
 * This function processes requests to refresh an access token by:
 * 1. Retrieving the refresh token from an HTTP-only cookie.
 * 2. Verifying the refresh token's validity in Redis and checking the token itself.
 * 3. If the refresh token is valid, a new access token is issued.
 * 4. If the refresh token is invalid or missing, an appropriate error response is returned.
 *
 * If the refresh token is not provided or invalid, it clears the cookie and sends a `403 Forbidden` 
 * status with a message indicating that the token is invalid or the user has logged out. 
 * Any internal server errors during the process return a `500 Internal Server Error`.
 *
 * @param {Object} req - The HTTP request object. It expects `req.cookies.refreshToken` 
 *                       to contain the refresh token, if present.
 * @param {Object} res - The HTTP response object used to send the new access token or error messages.
 *
 * @returns {void} - Sends the following responses:
 *   - `403 Forbidden`: If the refresh token is missing, invalid, or expired. 
 *                      The message 'Invalid Refresh Token' or 'Empty Refresh Token' is returned.
 *   - `500 Internal Server Error`: If an error occurs while processing the refresh token.
 *   - `200 OK`: If the refresh token is valid, a new access token is returned in the JSON response.
 *
 * @example
 * // Request:
 * // Client must send a valid refresh token in an HTTP-only cookie.
 *
 * // Successful response:
 * // {
 * //   "accessToken": "new-access-token-here"
 * // }
 *
 * @throws {Error} - If there is an issue verifying the refresh token in Redis or JWT verification fails, 
 *                   the appropriate error message is returned, such as `403 Forbidden` for invalid tokens.
 */
const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken; // Get refresh token from HTTP-only cookie
    //console.log(`Refresh token from cookie ${refreshToken}`) --> debugging

    if (!refreshToken) {
      res.clearCookie('refreshToken'); // Clear the refresh token cookie
      res.status(403).send('Empty Refresh Token');
    } else {
        try {
            // Verify Refresh Token in Redis
            const userId = await Redis.verifyRefreshTokenInRedis(refreshToken);
            if (!userId) return res.status(403).send('Invalid Refresh Token');

            // Fetch the role from the Refresh Token
            const user = jwt.decode(refreshToken); // Decode the token to extract the user information
            // console.log(user);
            const { iat, ...userData } = user;      // Remove the field iat of user data
            // console.log(userData);
            

            // Verify the token against different secrets
            const isStudentMatch = await TokenManager.verifyTokenAsync(refreshToken, REFRESH_TOKEN_SECRET)
            .then(() => true)
            .catch(() => false);

            const isStaffMatch = await TokenManager.verifyTokenAsync(refreshToken, REFRESH_TOKEN_SECRET_STAFF)
            .then(() => true)
            .catch(() => false);

            const isAdminMatch = await TokenManager.verifyTokenAsync(refreshToken, REFRESH_TOKEN_SECRET_ADMIN)
            .then(() => true)
            .catch(() => false);

            // console.log(isStudentMatch);
            // console.log(isStaffMatch);
            // console.log(isAdminMatch);
          
      
            // Verify the token itself
            // jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
            //     if (err) return res.status(403).send('Invalid Refresh Token');
        
            //     // Issue a new Access Token
            //     const newAccessToken = jwt.sign({ username: user.username, userId: user.userId }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRED_IN });
            //     res.json({ accessToken: newAccessToken });
            // });


            if (isStudentMatch) {
                // Issue a new Access Token
                const newAccessToken = jwt.sign(userData, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRED_IN });
                res.json({ accessToken: newAccessToken });

            } else if (isStaffMatch) {
                // Issue a new Access Token
                const newAccessToken = jwt.sign(userData, ACCESS_TOKEN_SECRET_STAFF, { expiresIn: ACCESS_TOKEN_EXPIRED_IN });
                res.json({ accessToken: newAccessToken });

            } else if (isAdminMatch) {
                // Issue a new Access Token
                const newAccessToken = jwt.sign(userData, ACCESS_TOKEN_SECRET_ADMIN, { expiresIn: ACCESS_TOKEN_EXPIRED_IN });
                res.json({ accessToken: newAccessToken });

            } else {
                return res.status(403).send('Invalid Refresh Token');
            }
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    }
}



/**
 * Asynchronous route handler for verifying a provided access token.
 *
 * This function handles requests to verify the validity of a JWT (JSON Web Token) by:
 * 1. Retrieving the token from the request body.
 * 2. Verifying the token using a secret key.
 * 3. If the token is valid, it responds with a `valid: true` status.
 * 4. If the token is invalid or expired, it responds with a `403 Forbidden` status and an appropriate message.
 *
 * @param {Object} req - The HTTP request object. It expects `req.body.token` to contain the JWT that needs to be verified.
 * @param {Object} res - The HTTP response object used to send the verification result back to the client.
 *
 * @returns {void} - Sends the following responses:
 *   - `403 Forbidden`: If the token is invalid or expired, with the message 'Invalid or expired token' and `valid: false`.
 *   - `200 OK`: If the token is valid, with `valid: true`.
 *
 * @example
 * // Request body:
 * // {
 * //   "token": "jwt-token-here"
 * // }
 *
 * // Successful verification response:
 * // {
 * //   "valid": true
 * // }
 *
 * // Failed verification response (invalid or expired token):
 * // {
 * //   "valid": false,
 * //   "message": "Invalid or expired token"
 * // }
 *
 * @throws {Error} - If there is an issue verifying the token, the function returns a `403 Forbidden` response.
 */
const verifyToken = async (req, res) => {
    

    try {
        const { token } = req.body;
        if (!token) return res.status(401).send('No access token provided');


        // Verify the token against different secrets
        const isStudentMatch = await TokenManager.verifyTokenAsync(token, ACCESS_TOKEN_SECRET)
        .then(() => true)
        .catch(() => false);

        const isStaffMatch = await TokenManager.verifyTokenAsync(token, ACCESS_TOKEN_SECRET_STAFF)
        .then(() => true)
        .catch(() => false);

        const isAdminMatch = await TokenManager.verifyTokenAsync(token, ACCESS_TOKEN_SECRET_ADMIN)
        .then(() => true)
        .catch(() => false);

        // Verify the token using the proper secret key
        // jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        //     if (err) {
        //         return res.status(403).json({ valid: false, message: 'Invalid or expired token' });
        //     }
        //     res.json({ valid: true });
        // });
        // Return the response based on matches
        if (isStudentMatch || isStaffMatch || isAdminMatch) {
            // let role_name;
            // role_name = isStudentMatch ? "Student" : null;
            // role_name = isStaffMatch ? "Staff" : null;
            // role_name = isAdminMatch ? "Admin" : null;

            return res.json({ valid: true });
        } else {
            return res.status(403).json({ valid: false, message: 'Invalid or expired token' });
        }

    } catch (error) {
        return res.status(500).json({ valid: false, message: 'Internal Server Error' });
    }

    
}





// const verifyRefreshToken = async (req, res) => {
//     const refreshToken = req.cookies.refreshToken;  // Get the refresh token from the HTTP-only cookie
//     if (!refreshToken) return res.status(401).send('No refresh token provided');
//     const user = jwt.decode(refreshToken);
//     const userRole = user ? user.role_name : null;

//     let isStudentMatch = false;
//     let isStaffMatch = false;
//     let isAdminMatch = false;

//     jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
//         if (!err) {
//             isStudentMatch = true; 
//             return res.json({ valid: true, role_name: userRole });
               
//         }   
//     });

//     jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_STAFF, (err, user) => {
//         if (!err) {
//             isStaffMatch = true;
//             return res.json({ valid: true, role_name: userRole });
//         }   
//     });

//     jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_ADMIN, (err, user) => {
//         if (!err) {
//             isAdminMatch = true;
//             return res.json({ valid: true, role_name: userRole });
//         }   
//     });

//     if (!isStudentMatch && !isStaffMatch && !isAdminMatch)
//         return res.status(403).json({ valid: false, message: 'Invalid or expired token' });
// }



const verifyRefreshToken = async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken; // Get the refresh token from the HTTP-only cookie
      if (!refreshToken) return res.status(401).send('No refresh token provided');
  
      const user = jwt.decode(refreshToken); // Decode the token to extract the user information
      const userRole = user ? user.role_name : null;
  
      // Verify the token against different secrets
      const isStudentMatch = await TokenManager.verifyTokenAsync(refreshToken, REFRESH_TOKEN_SECRET)
        .then(() => true)
        .catch(() => false);
  
      const isStaffMatch = await TokenManager.verifyTokenAsync(refreshToken, REFRESH_TOKEN_SECRET_STAFF)
        .then(() => true)
        .catch(() => false);
  
      const isAdminMatch = await TokenManager.verifyTokenAsync(refreshToken, REFRESH_TOKEN_SECRET_ADMIN)
        .then(() => true)
        .catch(() => false);
  
      // Return the response based on matches
      if (isStudentMatch || isStaffMatch || isAdminMatch) {
        return res.json({ valid: true, role_name: userRole });
      } else {
        return res.status(403).json({ valid: false, message: 'Invalid or expired token' });
      }
  
    } catch (error) {
      return res.status(500).json({ valid: false, message: 'Internal Server Error' });
    }
};





export default { authenticateUser, logOutUser, refreshToken, verifyToken, verifyRefreshToken }