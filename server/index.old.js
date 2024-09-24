import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from "cors";

// Import configurations
import authenticateToken from './middleware/authenticateToken.js';
import Redis from './config/redis.js';
import WebConfig from './config/etc_web.js';
import logger from './middleware/logger.js';
import constants from './config/constants.js';

// Import routes
import authRoutes from './routes/auth_route.js'
import userRoutes from './routes/user_route.js'
import studentRoutes from './routes/student_route.js';
import ticketRoutes from './routes/ticket_route.js';
import attachmentRoutes from './routes/attachment_route.js';
import ratingRoutes from './routes/rating_routes.js';
import notificationRoutes from './routes/notification_routes.js';

// Import samples
import books from './utils/books.js';


// ==============================|| Read config, init app ||============================== //
dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser()); // Enable cookie parsing
app.use(cors(WebConfig.corsOptions));




// ==============================|| Routes ||============================== //
// Support GET, POST, PUT (update all attr), PATCH (update some parts), DELETE
app.use("/auth", authRoutes);                     // 5 apis: login, logout, refresh, verify, verify refresh token
app.use("/api/v1/users", userRoutes);             // 5 apis
app.use("/api/v1/tickets", ticketRoutes);         // 7 apis
app.use("/api/v1/attachments", attachmentRoutes); // 1 api
app.use("/api/v1/rating", ratingRoutes);          // 2 apis
app.use("/api/v1/notification", notificationRoutes);    

// app.use("/api/v1/student", studentRoutes);
// app.use("/api/v1/announcement", ticketRoutes);



// API for testing successful authentication, authorization
app.get('/ping', authenticateToken(constants.allRoleName), (req, res) => { res.json({message: "pong"}); });
app.get('/books', authenticateToken([constants.studentRoleName , constants.staffRoleName]), (req, res) => { res.json(books); });
app.head('/books', authenticateToken(constants.allRoleName), (req, res) => { 
  res.set( {'Content-Type': 'application/json',
            'Content-Length': JSON.stringify(books).length
          });
  res.status(200).end(); // end the response without sending the body
});



// ==============================|| Main app ||============================== //
// Connect to Redis and start the server
const startServer = async () => {
  await Redis.connectRedis();
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};


startServer();