// For authorization
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import Redis from '../config/redis.js';
import TokenManager from '../utils/token_manager.js'

// For authentication
import pool from "../config/db.js"
import queries from "../sql/auth_queries.js";
import passwordTool from "../utils/password_tools.js"

// Logger
import logger, { writeLogToDB, event_type } from '../middleware/logger.js';
import mailer from '../middleware/mailer.js';


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
                    writeLogToDB(results.rows[0].id, event_type.security, `Username ${username} logged in failed due to wrong credentials information`, new Date());
                    logger.error(`username: ${username} logged in failed due to wrong credentials information`);
                    res.status(403).json({ message: 'Invalid username or password' });
                    
                } else {
                    // Authorization

                    const user_id = String(results.rows[0].id); 
                    const username = String(results.rows[0].username); 
                    const email = String(results.rows[0].email);
                    const fullname = String(results.rows[0].fullname);
                    const role_name = String(results.rows[0].role_name);

                    const user = { user_id, username, email, fullname, role_name };


                    const { USER_ACCESS_TOKEN_SECRET, USER_REFRESH_TOKEN_SECRET } = TokenManager.getTokenSecretByRoleName(role_name);
                    // console.log(USER_ACCESS_TOKEN_SECRET);
                    // console.log(USER_REFRESH_TOKEN_SECRET);

                    // Issue Access Token (expires in an amount of time)
                    const accessToken = jwt.sign(user, USER_ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRED_IN });
                
                    // Issue Refresh Token
                    const refreshToken = jwt.sign(user, USER_REFRESH_TOKEN_SECRET);
                
                    // Store Refresh Token in Redis with expiration
                    await Redis.storeRefreshTokenInRedis(user_id, refreshToken, REFRESH_TOKEN_EXPIRED_IN);
                
                    // Send Refresh Token as an HTTP-only, Secure cookie
                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,       // Prevent JavaScript access to the cookie
                        secure: true,         // Send only over HTTPS
                        sameSite: 'Strict',   // Protect against CSRF
                        maxAge: REFRESH_TOKEN_EXPIRED_IN * 1000, // in milliseconds
                    });
                    

                    logger.info(`username: ${username} logged into the system`);
                    writeLogToDB(user_id, event_type.security, `Username ${username} logged in successfully`, new Date());
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
        const user = jwt.decode(refreshToken);
        try {
            await Redis.redisClient.del(`refreshToken:${refreshToken}`);
            res.clearCookie('refreshToken'); // Clear the refresh token cookie

            logger.info(`username: ${user.username} logged out`);   
            res.send('Logout successful');
        } catch (err) {
            logger.error(err.message);
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
            const user_id = await Redis.verifyRefreshTokenInRedis(refreshToken);
            if (!user_id) return res.status(403).send('Invalid Refresh Token');

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



const getResetPassword = async (req, res) => {
    try {
        const email = req.query.email;

        // check if the email exists in the database
        const existEmail = await pool.query(queries.getUserByEmail, [email]);
        if (existEmail.rows.length === 0) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // generate a new password    
        const password = passwordTool.generateRandomPassword();
        const newAccessToken = jwt.sign({email}, ACCESS_TOKEN_SECRET, { expiresIn: "120s" });

        // save the new password to the redis server with the token as the key for 2 minutes
        await Redis.storeResetPasswordInRedis(password, newAccessToken, 120);
        
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename); 
        const __static_dirname = path.join(__dirname, '..', 'static'); 

        console.log(__static_dirname);
        
        const resetPasswordLink = `http://localhost:3210/login?token=${newAccessToken}`;
        
        const mailOptions = {
            from: {
                name: 'VGU Student Life Support Service',
                address: process.env.SYS_EMAIL
            },
            to: [email],
            subject: 'RESET PASSWORD REQUEST',
            // text: 'This is a title',
            html: `
            <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
                <table width="100%" style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px;">
                    <tr>
                        <td style="text-align: center; background-color: #f7f7f7; padding: 20px 0;">
                            <h2 style="color: #444;">VGU Student Life Support Service</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <p>We received a request to reset the password for your account. To reset your password, click on the button below:</p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${resetPasswordLink}" style="background-color: #f58427; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                                    Reset Password
                                </a>
                            </div>
                            <p>If the button above doesn't work, copy and paste the URL below into your browser:</p>
                            <p style="word-break: break-word;">
                                <a href="${resetPasswordLink}" style="color: #f58427;">${resetPasswordLink}</a>

                            <p> After redirecting to the login page of the service, you need to use this new password: </p>
                            <div style="text-align: center; margin: 30px 0; ">
                                <p> <strong><pre>${password}</pre></strong> </p>
                            </div>

                            <p>If you didn't request a password reset, please ignore this email or contact support if you have questions.</p>
                            
                            
                            <p>Best regards,</p>
                            <p>VGU Student Life Support Service</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f7f7f7; text-align: center; padding: 10px;">
                            <small style="color: #888;">© 2024 VGU Student Life Support Service</small>
                        </td>
                    </tr>
                </table>
            </div>
        `,
        };

        await mailer.sendMail(mailer.transporter, mailOptions)

        res.status(200).json({ message: 'Password reset successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const resetPassword = async (req, res) => {
    const { token } = req.body;

    // Decode the token to extract user information
    const user = jwt.decode(token);
    const email = user ? user.email : null;
    if (!email) return res.status(401).json({ message: 'Cannot identify the user email' });

    
    console.log(token);

    try {
        const password = await Redis.getResetPasswordFromRedis(token);
        if (password) {

            // hash the password
            const hashedPassword = await passwordTool.hashPassword(password);

            await pool.query("BEGIN");
            // save the new password to the database
            await pool.query(queries.updateUserPassword, [hashedPassword, email]);

            await pool.query("COMMIT");

            res.status(200).json({ message: 'Password reset successfully' });
            console.log(email, "has changed the new password with reset password token");
        } else {
            console.log("Password not found for the given token");
            res.status(404).json({ message: 'Password not found for the given token' }); 
        }
    } catch (error) {
        await pool.query("ROLLBACK");
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}



export default { authenticateUser, logOutUser, refreshToken, verifyToken, verifyRefreshToken, getResetPassword, resetPassword }