import jwt from 'jsonwebtoken';

/**
 * Authenticate the JWT token for API usage
 * @param {*} request
 * @param {*} respond 
 * @param {*} next 
 */
function authenticateToken(request, respond, next) {
    const authorizationHeader = request.headers['authorization'];
    // 'Beaer [token]'
    const token = authorizationHeader.split(' ')[1];
    if (!token) respond.sendStatus(401);
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, data) => {
        console.log(error, data);
        if (error) respond.sendStatus(403);
        next();
    });
}

export { authenticateToken };