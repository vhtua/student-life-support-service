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


const getAttachments = async (req, res) => {
    try {
        // Get the attachment name from the request parameter
        const attachmentName = req.params.attachment_name;
        const filePath = path.resolve(`./uploads/${attachmentName}`);
        

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Get the file stat
        const stat = fs.statSync(filePath);
        // console.log(filePath);

        // Determine the content type based on the file extension
        const ext = path.extname(filePath).toLowerCase();
        let contentType = 'application/octet-stream'; // Default content type

        switch (ext) {
            case '.mp4':
                contentType = 'video/mp4';
                break;
            case '.jpg':
            case '.jpeg':
                contentType = 'image/jpeg';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.gif':
                contentType = 'image/gif';
                break;
            // Add more cases as needed for other file types
        }

        // Set headers to stream the file
        res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': stat.size,
            'Content-Disposition': 'inline'
        });

        // Create a read stream and pipe it to the response
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};



export default { getAttachments };