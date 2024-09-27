// For authorization
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Redis from '../config/redis.js';

// For authentication
import pool from "../config/db.js"
import dormQueries from "../sql/dorm_queries.js";
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





const getDormArea = async (req, res) => {
    try {
        const { rows } = await pool.query(dormQueries.getDormArea);
        return res.status(200).json(rows);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}



const getDormRoomByArea = async (req, res) => {
    try {
        const area = req.params.area;
        const { rows } = await pool.query(dormQueries.getDormRoomByArea, [area]);
        return res.status(200).json(rows);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}


export default { 
    getDormArea,
    getDormRoomByArea
};