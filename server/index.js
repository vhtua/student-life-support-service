import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from "cors";

// Import configurations
import authenticateToken from './middleware/authenticateToken.js';
import Redis from './config/redis.js';
import WebConfig from './config/etc_web.js';
import books from './utils/books.js';
import logger from './middleware/logger.js';

// Import routes
import authRoutes from './routes/auth_route.js'




// ==============================|| Read config, init app ||============================== //
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser()); // Enable cookie parsing
app.use(cors(WebConfig.corsOptions));


// ==============================|| Routes ||============================== //
app.use("/auth", authRoutes);


app.get('/ping', authenticateToken, (req, res) => { res.json({message: "pong"}); });


// app.post('/verify-refresh-token', (req, res) => {
//     const refreshToken = req.cookies.refreshToken;  // Get the refresh token from the HTTP-only cookie
//     if (!refreshToken) return res.status(401).send('No refresh token provided');

//     jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
//         if (err) return res.status(403).json({ valid: false, message: 'Invalid or expired token' });
//         res.json({ valid: true });
//     });
// });



// Connect to Redis and start the server
const startServer = async () => {
  await Redis.connectRedis();
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

startServer();
