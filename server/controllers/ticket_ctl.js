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

        // const userNameParam = req.params.username;

        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const user_id = user ? user.user_id : null;
        if (!user_id) return res.status(401).json({message: 'Cannot identify the user'});


        // Retrieve data from the database
        const { rows } = await pool.query(ticketQueries.getTicketsList, [user_id]);
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

        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const user_id = user ? user.user_id : null;
        if (!user_id) return res.status(401).json({message: 'Cannot identify the user'});


        const ticketId = req.params.ticket_id;


        const { rows } = await pool.query(ticketQueries.getTicketDetails, [user_id, ticketId]);
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
      const user_id = user ? user.user_id : null;
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
      await pool.query(ticketQueries.insertIntoUserTicket, [user_id, ticketId]);

      await pool.query(ticketQueries.insertIntoMessage, [ticketId, user_id, createdDate]);
  
      // Handle attachments
      const attachments = req.files;
      console.log(attachments);
      if (attachments && attachments.length > 0) {
        for (const file of attachments) {
          const attachmentType = file.mimetype;
          const attachmentName = file.originalname;
          const url = "http://localhost:3000/api/v1/attachments/" + file.hashedfilename;
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


const getPendingTicketDetails = async (req, res) => {
    try {
        const { rows } = await pool.query(ticketQueries.getPendingTicketDetails);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Tickets not found' });
        }

        return res.status(200).json( rows );
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}


const getPendingTicketDetailsByTicketId = async (req, res) => {
    try {
        const ticketId = req.params.ticket_id;

        const { rows } = await pool.query(ticketQueries.getPendingTicketDetailsByTicketId, [ticketId]);
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
}

const updateTicketStatus = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request
  
        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const userName = user ? user.username : null;
        const user_id = user ? user.user_id : null;
        if (!user_id) return res.status(401).json({ message: 'Cannot identify the username' });
        
        const ticketId = req.body.ticket_id;
        const ticketStatusId = req.body.ticket_status_id;
  
        await pool.query('BEGIN');
  
        await pool.query(ticketQueries.updateTicketStatus, [ticketId, ticketStatusId]);
  
        await pool.query('COMMIT');
        return res.status(200).json({ message: 'Successfully updating the ticket status' });
    } catch (error) {
        console.error(error);
        await pool.query('ROLLBACK');
        return res.status(500).json({ message: 'Server error' });
    }
};


const assignStaffToTicket = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request
  
        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const user_id = user ? user.user_id : null;
        if (!user_id) return res.status(401).json({ message: 'Cannot identify the user' });

        const ticketId = req.body.ticket_id;

        await pool.query('BEGIN');
        await pool.query(ticketQueries.updateTicketStatus, [ticketId, 2]);  // 2 == in progress

        await pool.query(ticketQueries.assignUserToTicket, [user_id, ticketId]);


        const created_date = new Date().toISOString();
        await pool.query(ticketQueries.assignStaffToMessage, [ticketId, user_id, created_date]);

        await pool.query('COMMIT');

        return res.status(200).json({ message: 'Successfully assigning the staff to the ticket' });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
    
};


const getInProgressTickets = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request
  
        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const user_id = user ? user.user_id : null;
        if (!user_id) return res.status(401).json({ message: 'Cannot identify the user' });


        const { rows } = await pool.query(ticketQueries.getInProgressTickets, [user_id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Tickets not found' });
        }

        return res.status(200).json( rows );
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }

}


const getInProgressTicketDetailsByTicketId = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request
  
        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const user_id = user ? user.user_id : null;
        if (!user_id) return res.status(401).json({ message: 'Cannot identify the user' });

        const ticketId = req.params.ticket_id;

        const { rows } = await pool.query(ticketQueries.getInProgressTicketDetailsByTicketId, [ticketId, user_id]);
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

}


const cancelTicket = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request
  
        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const user_id = user ? user.user_id : null;
        if (!user_id) return res.status(401).json({ message: 'Cannot identify the user' });

        const ticket_id = req.body.ticket_id;

        await pool.query('BEGIN');
        await pool.query(ticketQueries.updateTicketStatus, [ticket_id, 4]);  // 4 == cancelled
        const ended_date = new Date().toISOString();
        await pool.query(ticketQueries.updateTicketEndedDate, [ticket_id, ended_date]);


        await pool.query('COMMIT');

        return res.status(200).json({ message: 'Successfully cancelling the ticket' });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


const doneTicket = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request
  
        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const user_id = user ? user.user_id : null;
        if (!user_id) return res.status(401).json({ message: 'Cannot identify the user' });

        const ticket_id = req.body.ticket_id;

        await pool.query('BEGIN');
        await pool.query(ticketQueries.updateTicketStatus, [ticket_id, 3]);  // 3 == done

        const ended_date = new Date().toISOString();
        await pool.query(ticketQueries.updateTicketEndedDate, [ticket_id, ended_date]);

        await pool.query('COMMIT');

        return res.status(200).json({ message: 'Successfully done the ticket' });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};



const getClosedTickets = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request
  
        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const user_id = user ? user.user_id : null;
        if (!user_id) return res.status(401).json({ message: 'Cannot identify the user' });


        const { rows } = await pool.query(ticketQueries.getClosedTickets, [user_id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Tickets not found' });
        }

        console.log(rows);
        return res.status(200).json( rows );
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};



const getClosedTicketDetails = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request
  
        // Decode the token to extract user information
        const user = jwt.decode(accessToken);
        const user_id = user ? user.user_id : null;
        if (!user_id) return res.status(401).json({ message: 'Cannot identify the user' });

        const ticketId = req.params.ticket_id;

        const { rows } = await pool.query(ticketQueries.getClosedTicketDetails, [ticketId, user_id]);
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



export default { 
    getTicketsList, 
    getTicketDetails, 
    getTicketTypeList, 
    getTicketAudienceTypeList, 
    createTicket, 
    getPublicTicketDetails,
    getPendingTicketDetails,
    getPendingTicketDetailsByTicketId,
    updateTicketStatus,
    assignStaffToTicket,
    getInProgressTickets,
    getInProgressTicketDetailsByTicketId,
    cancelTicket,
    doneTicket,
    getClosedTickets,
    getClosedTicketDetails
};