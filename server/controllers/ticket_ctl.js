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



const getTicketsList = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request

        const userNameParam = req.params.username;

        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const userName = user ? user.username : null;
        if (!userName) return res.status(401).json({message: 'Cannot identify the username'});

        if (userNameParam !== userName) return res.status(403).json({message: 'Unauthorized access'});

        // Retrieve data from the database
        const { rows } = await pool.query(ticketQueries.getTicketsList, [userName]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

       
        return res.status(200).json( rows );

    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};




const getTicketDetails = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request

        const userNameParam = req.params.username;


        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const userName = user ? user.username : null;
        if (!userName) return res.status(401).json({message: 'Cannot identify the username'});

        if (userNameParam !== userName) return res.status(403).json({message: 'Unauthorized access'});


        const ticketId = req.params.ticket_id;


        const { rows } = await pool.query(ticketQueries.getTicketDetails, [userName, ticketId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Get attachments
        const attachments  = await pool.query(ticketQueries.getAttachmentsByTicketId, [ticketId]);
        // Add the attachment as an object of the rows
        rows[0].attachments = attachments.rows

    
        return res.status(200).json( rows[0] );
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


const getTicketTypeList = async (req, res) => {
    try {
        const { rows } = await pool.query(ticketQueries.getTicketTypeList);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        return res.status(200).json( rows );
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


const getTicketAudienceTypeList = async (req, res) => {
    try {
        const { rows } = await pool.query(ticketQueries.getTicketAudienceTypeList);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        return res.status(200).json( rows );
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Server  error' });
    }
};


const createTicket = async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request
  
      // Decode the token to extract user information
      const user = jwt.decode(accessToken);
      const userName = user ? user.username : null;
      const userId = user ? user.userId : null;
      if (!userName) return res.status(401).json({ message: 'Cannot identify the username' });
        
        

      const createdDate = req.body.created_date;
      const ticketTypeId = req.body.ticket_type_id;
      const subject = req.body.subject;
      const content = req.body.content;
      const audienceTypeId = req.body.audience_type_id;
      const ticketStatusId = req.body.ticket_status_id;
  
      await pool.query('BEGIN');
  
      const result = await pool.query(ticketQueries.insertIntoTicket, [createdDate, ticketTypeId, subject, content, audienceTypeId, ticketStatusId]);
  
      const ticketId = result.rows[0].ticket_id;
      await pool.query(ticketQueries.insertIntoUserTicket, [userId, ticketId]);

      await pool.query(ticketQueries.insertIntoMessage, [ticketId, userId, createdDate]);
  
      // Handle attachments
      const attachments = req.files;
      if (attachments && attachments.length > 0) {
        for (const file of attachments) {
          const attachmentType = file.mimetype;
          const attachmentName = file.originalname;
          const url = "http://localhost:3000/api/v1/attachments/" + file.originalname;
          console.log
          await pool.query(ticketQueries.insertIntoAttachment, [attachmentType, attachmentName, url, ticketId, createdDate]);
        }
      }
  
      await pool.query('COMMIT');
      return res.status(200).json({ message: 'Successfully creating the ticket' });
    } catch (error) {
      console.error(error);
      await pool.query('ROLLBACK');
      return res.status(500).json({ message: 'Server error' });
    }
};


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


const getPublicTicketDetails = async (req, res) => {
    try {
        // const ticketId = req.params.ticket_id;

        const { rows } = await pool.query(ticketQueries.getPublicTicketDetails);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Tickets not found' });
        }

        // For each ticket_id, get attachments
        for (let i = 0; i < rows.length; i++) {
            const attachments  = await pool.query(ticketQueries.getAttachmentsByTicketId, [rows[i].ticket_id]);
            rows[i].attachments = attachments.rows;
        }


        return res.status(200).json( rows );
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}



export default { getTicketsList, getTicketDetails, getTicketTypeList, getTicketAudienceTypeList, createTicket, getAttachments, rateTicket, getRating, getPublicTicketDetails };