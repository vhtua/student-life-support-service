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
 */
// const authenticateToken = (allowedRoles) => {
	
// 	return (req, res, next) => {
		
// 		const authHeader = req.headers['authorization'];
// 		const token = authHeader && authHeader.split(' ')[1];
// 		if (!token) return res.status(401).send('Access Token Required');

// 		let isRoleMatched = false;
// 		// console.log(ACCESS_TOKEN_SECRET);
// 		// console.log(ACCESS_TOKEN_SECRET_STAFF);
// 		// console.log(ACCESS_TOKEN_SECRET_ADMIN);

// 		allowedRoles.some((role, index) => {
// 			console.log(role);
// 			if (role === constants.studentRoleName) { 
// 				// console.log("True Student"); 
// 				jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
// 					if (!err) {
// 						req.user = user;
// 						// console.log(user);
// 						next();
// 						isRoleMatched = true;
// 						return true;
// 					}
// 				});
		
// 			}
// 			else if (role === constants.staffRoleName) { 
// 				// console.log("True Staff");
// 				jwt.verify(token, ACCESS_TOKEN_SECRET_STAFF, (err, user) => {
// 					if (!err) {
// 						req.user = user;
// 						// console.log(user);
// 						next();
// 						isRoleMatched = true;
// 						return true;
// 					}
// 				}); 

// 			}
// 			else if (role === constants.adminRoleName) { 
// 				// console.log("True Admin") 
// 				jwt.verify(token, ACCESS_TOKEN_SECRET_ADMIN, (err, user) => {
// 					if (!err) {
// 						req.user = user;
// 						// console.log(user);
// 						next();
// 						isRoleMatched = true;
// 						return true;
// 					}
// 				}); 
				
// 			} 
// 			else { logger.error("Please specify the user roles!") }

// 		});

// 		if (!isRoleMatched)
// 			return res.status(401).send('Invalid or Expired Token');

// 	};

// };


const authenticateToken = (allowedRoles) => {
  return async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).send('Access Token Required');
    }

    try {
      let user = null;

      // Loop through the allowed roles and verify token for each corresponding secret
      for (let role of allowedRoles) {
        if (role === constants.studentRoleName) {
          try {
            user = await TokenManager.verifyTokenAsync(token, ACCESS_TOKEN_SECRET);
          } catch (err) {}
        } else if (role === constants.staffRoleName) {
          try {
            user = await TokenManager.verifyTokenAsync(token, ACCESS_TOKEN_SECRET_STAFF);
          } catch (err) {}
        } else if (role === constants.adminRoleName) {
          try {
            user = await TokenManager.verifyTokenAsync(token, ACCESS_TOKEN_SECRET_ADMIN);
          } catch (err) {}
        }
        
        // If token is valid and user is found, break out of loop
        if (user) {
          req.user = user; // Store user info for further use
          return next();
        }
      }

      // If no valid token matched the roles
      return res.status(403).send('Invalid or Expired Token');

    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};





export default authenticateToken;
