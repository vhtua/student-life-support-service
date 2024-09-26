// For authorization
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Redis from '../config/redis.js';

// For authentication
import pool from "../config/db.js"
import roleQueries from "../sql/role_queries.js";
import authQueries from "../sql/auth_queries.js";
import passwordTool from "../utils/password_tools.js";

// Logger
import logger from '../middleware/logger.js';
import { json } from 'express';
import fs from 'fs';
import path from 'path';



const getRoles = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request
  
        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const user_id = user ? user.user_id : null;
        if (!user_id) return res.status(401).json({ message: 'Cannot identify the user' });

        const { rows } = await pool.query(roleQueries.getRoles);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        return res.status(200).json( rows );
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }

}


export default { getRoles };