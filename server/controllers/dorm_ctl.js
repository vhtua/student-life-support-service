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
import logger, { writeLogToDB, event_type } from '../middleware/logger.js';
import { json } from 'express';
import fs from 'fs';
import path from 'path';


dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRED_IN = String(process.env.EXPIRED_BEARER_ACCESS_TOKEN_TIME);
const REFRESH_TOKEN_EXPIRED_IN = Number(process.env.EXPIRED_BEARER_REFRESH_TOKEN_TIME);



const getAllDorms = async (req, res) => {
    try {
        console.log("Get all dorms");
        // Find list of dorm areas
        const { rows } = await pool.query(dormQueries.getDormArea);
        const dormAreas = rows;

        // Find list of dorm rooms for each dorm area
        const dorms = [];
        for (const area of dormAreas) {
            const { rows } = await pool.query(dormQueries.getDormRoomByArea, [area.dorm_area]);
            dorms.push({ dorm_area: area.dorm_area, rooms: rows });
        }
        return res.status(200).json(dorms);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};



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



const createDorm = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request
    
    // Decode the token to extract user information
    const user = jwt.decode(accessToken);

    try {
        const { dorm_area, dorm_room } = req.body;

        logger.info(`User ${user.user_id} is creating dorm ${dorm_area}-${dorm_room}`);
        writeLogToDB(user.user_id, event_type.critical, `User is creating dorm ${dorm_area}-${dorm_room}`, new Date());

        // Check if dorm already exists
        const { rows } = await pool.query(dormQueries.getDormRoomByArea, [dorm_area]);
        for (const row of rows) {
            if (row.dorm_room === dorm_room) {
                return res.status(400).json({ message: 'Dorm already exists' });
            }
        }

        // Create new dorm
        await pool.query('BEGIN');

        await pool.query(dormQueries.createDorm, [dorm_area, dorm_room]);

        await pool.query('COMMIT');

        logger.info(`Dorm ${dorm_area}-${dorm_room} created`);
        writeLogToDB(user.user_id, event_type.critical, `Dorm ${dorm_area}-${dorm_room} was created`, new Date());

        return res.status(201).json({ message: 'Dorm created' });
    } catch (error) {
        await pool.query('ROLLBACK');
        logger.error(error);
        writeLogToDB(user.user_id, event_type.error, `Failed to create dorm ${dorm_area}-${dorm_room}`);
        return res.status(500).json({ message: 'Server error' });
    }
};



const deleteDorm = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request

    // Decode the token to extract user information
    const user = jwt.decode(accessToken);

    try {
        const dorm_area = req.params.area;
        const dorm_room = req.params.room;

        console.log("Delete dorm", dorm_area, dorm_room);
        writeLogToDB(user.user_id, event_type.critical, `User is deleting dorm ${dorm_area}-${dorm_room}`, new Date());

        // Check if dorm exists
        const { rows } = await pool.query(dormQueries.getDormRoomByArea, [dorm_area]);
        let found = false;
        for (const row of rows) {
            if (row.dorm_room === dorm_room) {
                found = true;
                break;
            }
        }
        if (!found) {
            return res.status(400).json({ message: 'Dorm not found' });
        }

        // Delete dorm
        await pool.query('BEGIN');

        await pool.query(dormQueries.deleteDorm, [dorm_area, dorm_room]);

        await pool.query('COMMIT');

        logger.info(`Dorm ${dorm_area}-${dorm_room} deleted`);
        writeLogToDB(user.user_id, event_type.critical, `Dorm ${dorm_area}-${dorm_room} was deleted`, new Date());

        return res.status(200).json({ message: 'Dorm deleted' });
    } catch (error) {
        await pool.query('ROLLBACK');
        logger.error(error);
        writeLogToDB(user.user_id, event_type.error, `Failed to delete dorm ${dorm_area}-${dorm_room}`);
        return res.status(500).json({ message: 'Server error' });
    }
};



export default { 
    getAllDorms,
    getDormArea,
    getDormRoomByArea,
    createDorm,
    deleteDorm
};