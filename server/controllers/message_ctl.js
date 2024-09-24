// For authorization
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Redis from '../config/redis.js';

// For authentication
import pool from "../config/db.js"
import messageQueries from "../sql/message_queries.js";
import notiQueries from "../sql/notification_queries.js";
import passwordTool from "../utils/password_tools.js";

// Logger
import logger from '../middleware/logger.js';
import { json } from 'express';
import fs from 'fs';
import path from 'path';


// API route to get all messages by conversation_id
const getMessages = async (req, res) => {
    const { ticket_id } = req.params;
    try {
        const result = await pool.query(messageQueries.getMessages, [ticket_id]);

        if (result.rows == undefined || result.rows.length == 0) {
            console.log('Messages not found');
            return res.status(404).json({message: 'Messages not found'});}

        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request

        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const userId = user ? user.userId : null;
        if (!userId) return res.status(401).json({message: 'Cannot identify the userId'});

        

        // Check if the user is authorized to view the messages
        const messageAudience = await pool.query(messageQueries.getMessagesAudience, [ticket_id]);
        [
            { user_id: 1 },
            { user_id: 2 }
        ]
        // check if the userId is in the message audience
        const isAuthorized = messageAudience.rows.some(audience => audience.user_id == userId);
        if (!isAuthorized) return res.status(401).json({message: 'Cannot authorize the user'});



        // if (userId !=  result.rows[0].sender_id) return res.status(401).json({message: 'Cannot authorize the sender id'});

        // console.log(result.rows[0]);

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving messages');
    }

};


const getConversationId = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request

        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const username = user ? user.username : null;
        if (!username) return res.status(401).json({message: 'Cannot identify the userId'});

        const result = await pool.query(
            messageQueries.getConversationId,
            [username]
        );

        if (result.rows == undefined || result.rows.length == 0) {
            console.log('Conversation not found');
            return res.status(404).json({message: 'Conversation not found'});}

        res.json(result.rows);


    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving conversation id');
    }
};


export default { getMessages, getConversationId };