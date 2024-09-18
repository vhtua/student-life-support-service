// For authorization
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Redis from '../config/redis.js';

// For authentication
import pool from "../config/db.js"
import queries from "../sql/user_queries.js";
import passwordTool from "../utils/password_tools.js"

// Logger
import logger from '../middleware/logger.js';
import { json } from 'express';


dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRED_IN = String(process.env.EXPIRED_BEARER_ACCESS_TOKEN_TIME);
const REFRESH_TOKEN_EXPIRED_IN = Number(process.env.EXPIRED_BEARER_REFRESH_TOKEN_TIME);



const getUsersList = async (req, res) => {
    pool.query(queries.getUsersList, (error, results) => {
        if (error) {
            res.status(500).json([]);
            logger.error();
            throw error;
        }
        
        res.json({results});

    });

}


export default { getUsersList };