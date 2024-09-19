// For authorization
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Redis from '../config/redis.js';

// For authentication
import pool from "../config/db.js"
import queries from "../sql/student_queries.js";
import passwordTool from "../utils/password_tools.js"

// Logger
import logger from '../middleware/logger.js';
import { json } from 'express';



const changePassword = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request
    const inputHashedPassword = req.body.password;


    const user = jwt.decode(accessToken); // Decode the token to extract the user information
    const userName = user ? user.username : null;
    if (!userName) return res.status(401).send('Cannot identify the username');

    

    pool.query(queries.changePasswordByUserName, [userName, inputHashedPassword], (error, results) => {
        if (error) {
            res.status(500).json([]);
            logger.error();
            throw error;
        }
        
        res.json({results});

    });

}


export default { changePassword };