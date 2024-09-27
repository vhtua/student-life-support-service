// For authorization
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Redis from '../config/redis.js';

// For authentication
import pool from "../config/db.js"
import ticketQueries from "../sql/ticket_queries.js";
import notiQueries from "../sql/notification_queries.js";
import passwordTool from "../utils/password_tools.js";

// Logger
import logger, { writeLogToDB, event_type } from '../middleware/logger.js';
import { json } from 'express';
import fs from 'fs';
import path from 'path';
import { title } from 'process';


dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRED_IN = String(process.env.EXPIRED_BEARER_ACCESS_TOKEN_TIME);
const REFRESH_TOKEN_EXPIRED_IN = Number(process.env.EXPIRED_BEARER_REFRESH_TOKEN_TIME);



const getNotificationsList = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request

        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const roleName = user ? user.role_name : null;
        if (!roleName) return res.status(401).json({message: 'Cannot identify the role name'});

        // Retrieve data from the database
        const { rows } = await pool.query(notiQueries.getNotificationsList, [roleName]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Notification not found' });
        }
       
        return res.status(200).json( rows );
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


const createNotification = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request

        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const roleName = user ? user.role_name : null;
        if (!roleName) return res.status(401).json({message: 'Cannot identify the role name'});
        const userId = user ? user.user_id : null;
        if (!userId) return res.status(401).json({message: 'Cannot identify the user'});


        logger.info(`User ${userId} is creating a notification`);
        writeLogToDB(userId, event_type.critical, 'User is creating a notification', new Date());


        const sender_id = userId;
        const title = req.body.title;
        const content = req.body.content;
        const recipients = req.body.recipients;
        const created_date = new Date().toISOString();

        // search self-role id
        const { rows: selfRole } = await pool.query('SELECT id FROM "Role" WHERE role_name = $1', [roleName]);
        if (selfRole.length === 0) {
            return res.status(404).json({ message: 'Role not found' });
        }
        const role_id = selfRole[0].id;

        await pool.query('BEGIN');

        // Insert data into the database
        const { rows } = await pool.query(notiQueries.createNotification, [title, content, sender_id, created_date]);
        

        // Insert audience data of the notification
        await pool.query(notiQueries.insertNotificationAudience, [rows[0].id, role_id]); // Self-role
        for (let i = 0; i < recipients.length; i++) {
            const role_id = recipients[i];
            await pool.query(notiQueries.insertNotificationAudience, [rows[0].id, role_id]);
        }

        await pool.query('COMMIT');

        logger.info(`User ${userId} has created a notification`);
        writeLogToDB(userId, event_type.critical, 'User has created a notification', new Date());

        return res.status(200).json({ message: 'Notification created' });
    } catch (error) {
        await pool.query('ROLLBACK');
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};



export default { getNotificationsList, createNotification };