// For authorization
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Redis from '../config/redis.js';

// For authentication
import pool from "../config/db.js"
import reportQueries from "../sql/report_queries.js";
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



const getTicketsReport = async (req, res) => {
    try {
        const { start_date, end_date } = req.query;

        // start_date = '2021-01-01';
        // end_date = '2021-12-31';

        const pendingTicket = await pool.query(reportQueries.getNumberOfTicketsByStatus, ['pending', start_date, end_date]);
        const inProgressTicket = await pool.query(reportQueries.getNumberOfTicketsByStatus, ['in progress', start_date, end_date]);
        const doneTicket = await pool.query(reportQueries.getNumberOfTicketsByStatus, ['done', start_date, end_date]);
        const cancelledTicket = await pool.query(reportQueries.getNumberOfTicketsByStatus, ['cancelled', start_date, end_date]);
        

        const rows = [
            {
                ticket_status: 'pending',
                count: pendingTicket.rows[0].count
            },
            {
                ticket_status: 'in progress',
                count: inProgressTicket.rows[0].count
            },
            {
                ticket_status: 'done',
                count: doneTicket.rows[0].count
            },
            {
                ticket_status: 'cancelled',
                count: cancelledTicket.rows[0].count
            }
        ];
        
        
        res.status(200).json(rows);
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Internal server error" });
    }
}





export default { getTicketsReport };