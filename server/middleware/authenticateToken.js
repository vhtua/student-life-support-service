import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

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
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send('Access Token Required');

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).send('Invalid or Expired Token');
    req.user = user; // Store the user info for further use
    next();
  });
};

export default authenticateToken;
