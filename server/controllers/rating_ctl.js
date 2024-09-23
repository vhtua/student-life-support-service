// For authorization
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Redis from '../config/redis.js';

// For authentication
import pool from "../config/db.js"
import ticketQueries from "../sql/ticket_queries.js";
import authQueries from "../sql/auth_queries.js";
import passwordTool from "../utils/password_tools.js";

// Logger
import logger from '../middleware/logger.js';
import { json } from 'express';
import fs from 'fs';
import path from 'path';


dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRED_IN = String(process.env.EXPIRED_BEARER_ACCESS_TOKEN_TIME);
const REFRESH_TOKEN_EXPIRED_IN = Number(process.env.EXPIRED_BEARER_REFRESH_TOKEN_TIME);



const rateTicket = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request

        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const userName = user ? user.username : null;
        if (!userName) return res.status(401).json({ message: 'Cannot identify the username' });

        console.log(req.body);

        const ticketId = req.body.ticket_id;
        const rating = req.body.rating;
        const created_date = req.body.created_date;

        await pool.query(ticketQueries.rateTicket, [ticketId, rating, created_date]);

        return res.status(200).json({ message: 'Successfully rating the ticket' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}



const getRating = async (req, res) => {
    try {
        const ticketId = req.params.ticket_id;

        const { rows } = await pool.query(ticketQueries.getRating, [ticketId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        return res.status(200).json( rows[0] );
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}



export default { rateTicket, getRating };