import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from "cors";

// Swagger UI for API documentation
import swaggerUi from 'swagger-ui-express';
import YAML from "yaml";
import fs from 'fs';

// Import configurations
import authenticateToken from './middleware/authenticateToken.js';
import Redis from './config/redis.js';
import WebConfig from './config/etc_web.js';
import logger from './middleware/logger.js';
import constants from './config/constants.js';

// Import routes
import authRoutes from './routes/auth_route.js'
import userRoutes from './routes/user_route.js'
import dormRoutes from './routes/dorm_route.js';
import ticketRoutes from './routes/ticket_route.js';
import attachmentRoutes from './routes/attachment_route.js';
import ratingRoutes from './routes/rating_routes.js';
import notificationRoutes from './routes/notification_routes.js';
import messageRoutes from './routes/message_route.js';
import announcementRoutes from './routes/announcement_route.js';
import feedbackRoutes from './routes/feedback_route.js';
import roleRoutes from './routes/role_route.js';
import logsRoutes from './routes/logs_route.js';
import reportRoutes from './routes/report_route.js';

// Import samples
import books from './utils/books.js';


// ==============================|| Read config, init app ||============================== //
dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;


const app = express();
app.use(express.json());
app.use(cookieParser()); // Enable cookie parsing
app.use(cors(WebConfig.corsOptions)); // Enable CORS


// ==============================|| Routes ||============================== //
app.use("/auth", authRoutes);                     
app.use("/api/v1/users", userRoutes);                  
app.use("/api/v1/dorms", dormRoutes)
app.use("/api/v1/tickets", ticketRoutes);        
app.use("/api/v1/attachments", attachmentRoutes); 
app.use("/api/v1/rating", ratingRoutes);          
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/roles", roleRoutes);       
app.use("/api/v1/notification", notificationRoutes); 
app.use("/api/v1/announcement", announcementRoutes);        
app.use("/api/v1/feedback", feedbackRoutes);       
app.use("/api/v1/logs", logsRoutes);     
app.use("/api/v1/reports", reportRoutes);
app.use('/api-docs/v1', swaggerUi.serve, swaggerUi.setup(WebConfig.swaggerDocument, WebConfig.swaggerOptions));


// API for testing successful authentication, authorization
app.get('/', (req, res) => { res.json({service: "VGU Student Life Support Service Server"}); });
app.get('/ping', authenticateToken(constants.allRoleName), (req, res) => { res.json({message: "pong"}); });
app.get('/books', authenticateToken([constants.studentRoleName , constants.staffRoleName]), (req, res) => { res.json(books); });
app.head('/books', authenticateToken(constants.allRoleName), (req, res) => { 
  res.set( {'Content-Type': 'application/json',
            'Content-Length': JSON.stringify(books).length
          });
  res.status(200).end();
});


// ==============================|| WEB SOCKET ||============================== //
// Create HTTP server to attach Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: WebConfig.corsOptions.origin,
    methods: ['GET', 'POST'],
  },
}); 

import pool from './config/db.js';


// Socket.io connection handling
io.on('connection', (socket) => {
  // console.log('A user connected');

  socket.on('join_conversation', (ticket_id) => {
      socket.join(ticket_id);
      console.log(`User joined conversation ${ticket_id}`);
  });

  socket.on('send_message', async (data) => {
      const { ticket_id, sender_id, sender_fullName, message_details } = data;
      const created_date = new Date();
      try {

          await pool.query('BEGIN');

          const result = await pool.query(
              'INSERT INTO "Message" (ticket_id, sender_id, message_details, created_date) VALUES ($1, $2, $3, $4) RETURNING *',
              [ticket_id, sender_id, message_details, created_date]
          );

          const getFullName = await pool.query(
              'SELECT fullname FROM "User" WHERE id = $1',
              [sender_id]
          );

          const sender_fullName = getFullName.rows[0].fullname;

          result.rows[0].sender_fullName = sender_fullName;
          // console.log(result.rows[0], sender_fullName + "just sent msg");
          
          const newMessage = result.rows[0];
          await pool.query('COMMIT');
          io.to(ticket_id).emit('receive_message', newMessage);
      } catch (err) {
          await pool.query('ROLLBACK');
          console.error(err);
      }
  });

  socket.on('disconnect', () => {
      console.log('A user disconnected from the conversation');
  });
});


// ==============================|| Main app ||============================== //
// Connect to Redis and start the server
const startServer = async () => {
  await Redis.connectRedis();
  server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};


startServer();

export default {app, server}