import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import TokenManager from '../utils/token_manager.js';
import constants from '../config/constants.js';
import logger from './logger.js';


dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET_STAFF = process.env.ACCESS_TOKEN_SECRET_STAFF;
const ACCESS_TOKEN_SECRET_ADMIN = process.env.ACCESS_TOKEN_SECRET_ADMIN;

/**
 * Middleware function to authenticate and verify a JSON Web Token (JWT).
 *
 * This middleware extracts the JWT from the `Authorization` header of the incoming
 * request, verifies its validity using a secret key, and ensures that the token is
 * neither expired nor invalid. If the token is valid, it attaches the decoded user
 * information to the `req` object and allows the request to proceed. If the token
 * is missing or invalid, it returns a `401 Unauthorized` response.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The callback function to pass control to the next middleware.
 *
 * @returns {Object|void} - Returns a `401 Unauthorized` response if the token is missing,
 *                          invalid, or expired. Otherwise, it calls the `next()` function 
 *                          to proceed to the next middleware.
 *
 * @example
 * // Add this middleware to protect routes:
 * app.get('/protected', authenticateToken, (req, res) => {
 *   res.send('Protected content');
 * });
 *
 * @throws {Error} - If the token is missing, invalid, or expired, the user receives an error message.
 */
const authenticateToken = (allowedRoles) => {
	
	return (req, res, next) => {
		
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		if (!token) return res.status(401).send('Access Token Required');

		let isRoleMatched = false;
		console.log(ACCESS_TOKEN_SECRET);
		console.log(ACCESS_TOKEN_SECRET_STAFF);
		console.log(ACCESS_TOKEN_SECRET_ADMIN);

		allowedRoles.some((role, index) => {
			console.log(role);
			if (role === constants.studentRoleName) { 
				// console.log("True Student"); 
				jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
					if (!err) {
						req.user = user;
						// console.log(user);
						next();
						isRoleMatched = true;
						return true;
					}
				});
		
			}
			else if (role === constants.staffRoleName) { 
				// console.log("True Staff");
				jwt.verify(token, ACCESS_TOKEN_SECRET_STAFF, (err, user) => {
					if (!err) {
						req.user = user;
						// console.log(user);
						next();
						isRoleMatched = true;
						return true;
					}
				}); 

			}
			else if (role === constants.adminRoleName) { 
				// console.log("True Admin") 
				jwt.verify(token, ACCESS_TOKEN_SECRET_ADMIN, (err, user) => {
					if (!err) {
						req.user = user;
						// console.log(user);
						next();
						isRoleMatched = true;
						return true;
					}
				}); 
				
			} 
			else { logger.error("Please specify the user roles!") }

		});

		if (!isRoleMatched)
			return res.status(401).send('Invalid or Expired Token');

		// jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
		// 	if (err) return res.status(401).send('Invalid or Expired Token');
		// 	req.user = user; // Store the user info for further use
		// 	console.log(user);
		// 	next();
		// });

	};

};





export default authenticateToken;
