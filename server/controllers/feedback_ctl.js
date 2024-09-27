// For authorization
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Redis from '../config/redis.js';

// For authentication
import pool from "../config/db.js"
import feedbackQueries from "../sql/feedback_queries.js";
import passwordTool from "../utils/password_tools.js";

// Logger
import logger, { writeLogToDB, event_type } from '../middleware/logger.js';
import { json } from 'express';
import fs from 'fs';
import path from 'path';
import { log } from 'console';


dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRED_IN = String(process.env.EXPIRED_BEARER_ACCESS_TOKEN_TIME);
const REFRESH_TOKEN_EXPIRED_IN = Number(process.env.EXPIRED_BEARER_REFRESH_TOKEN_TIME);



const sendFeedback = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request


        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const user_id = user ? user.user_id : null;
        if (!user_id) return res.status(401).json({message: 'Cannot identify the user'});

        logger.info(`User ${user_id} is sending a feedback`);
        writeLogToDB(user_id, event_type.critical, 'User is sending a feedback');


        const title = req.body.title;
        const content = req.body.content;
        const rating_score = req.body.rating_score;
        const created_date = req.body.created_date;

        
        await pool.query("BEGIN");
        await pool.query(feedbackQueries.sendFeedback, [user_id, title, content, rating_score, created_date]);
        await pool.query("COMMIT");

        logger.info(`User ${user_id} successfully send the feedback`);
        writeLogToDB(user_id, event_type.critical, 'User successfully send the feedback');
       
        return res.status(200).json({ message: 'Successfully send the feedback' });
    } catch (error) {
        await pool.query("ROLLBACK");
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};



export default { sendFeedback };