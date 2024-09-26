// For authorization
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Redis from '../config/redis.js';

// For authentication
import pool from "../config/db.js"
import queries from "../sql/user_queries.js";
import authQueries from "../sql/auth_queries.js";
import passwordTool from "../utils/password_tools.js";

// Logger
import logger from '../middleware/logger.js';
import { json } from 'express';


dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRED_IN = String(process.env.EXPIRED_BEARER_ACCESS_TOKEN_TIME);
const REFRESH_TOKEN_EXPIRED_IN = Number(process.env.EXPIRED_BEARER_REFRESH_TOKEN_TIME);




const getUserByUserName = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request
    
    // Decode the token to extract user information
    const user = jwt.decode(accessToken);
    const username = user ? user.username : null;
    if (!username) return res.status(401).json({message: 'Cannot identify the username'});


    pool.query(queries.getUserByUserName, [username], (error, results) => {
        if (error) {
            res.status(500).json([]);
            logger.error();
            throw error;
        }
        
        const userDetails = results.rows[0];
        res.json(userDetails);

    });
}



const getUsersList = async (req, res) => {
    pool.query(queries.getUsersList, (error, results) => {
        if (error) {
            res.status(500).json([]);
            logger.error();
            throw error;
        }
        
        const userDetailsList = results.rows;
        res.json(userDetailsList);

    });

}


const changePassword = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request

        const currentPassword = req.body.currentPassword;
        const newPassword = req.body.newPassword;

        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const userName = user ? user.username : null;
        if (!userName) return res.status(401).json({message: 'Cannot identify the username'});

        // Retrieve user password from the database
        const { rows } = await pool.query(authQueries.getUserPasswordByUsername, [userName]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const dbRetrievedPassword = String(rows[0].password);

        // Verify if the current password matches
        const isAuthenticated = await passwordTool.verifyPassword(String(currentPassword), dbRetrievedPassword);
        if (!isAuthenticated) {
            return res.status(403).json({ message: 'Invalid current password' });
        }

        // Hash the new password
        const hashedNewPassword = await passwordTool.hashPassword(newPassword);

        // Update the user's password in the database
        await pool.query(queries.changePasswordByUserName, [userName, hashedNewPassword]);

        // Return success response
        return res.status(200).json({ message: 'Password changed successfully' });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


const editProfile = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request

        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const userName = user ? user.username : null;
        if (!userName) return res.status(401).json({message: 'Cannot identify the username'});
        
        const newPhoneNumber  = req.body.newPhoneNumber;

        await pool.query(queries.changePhoneNumberByUserName, [userName, newPhoneNumber]);

        logger.info(`username: ${userName} changed the phone number`);

        return res.status(200).json({ message: 'Your phone number was changed successfully' });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};



export default { getUsersList, getUserByUserName, changePassword, editProfile };