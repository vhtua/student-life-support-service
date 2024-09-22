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
app.use("/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tickets", ticketRoutes);
// app.use("/api/v1/attachments", attachmentRoutes);

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