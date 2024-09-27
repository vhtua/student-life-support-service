// For authorization
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from 'cookie-parser';
import Redis from '../config/redis.js';

// For authentication
import pool from "../config/db.js"
import queries from "../sql/user_queries.js";
import authQueries from "../sql/auth_queries.js";
import passwordTool from "../utils/password_tools.js";

// Logger
import logger from '../middleware/logger.js';
import { writeLogToDB, event_type } from '../middleware/logger.js';
import { json } from 'express';
import user_queries from '../sql/user_queries.js';

// middleware
import mailer from '../middleware/mailer.js';
import { log } from 'console';


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

    writeLogToDB(user.user_id, event_type.info, `Username ${username} is being retrieved`, new Date());

    pool.query(queries.getUserByUserName, [username], (error, results) => {
        if (error) {
            writeLogToDB(user.user_id, event_type.error, `Failed to retrieve user by username ${username}`, new Date());
            res.status(500).json([]);
            logger.error();
            throw error;
        }
        
        writeLogToDB(user.user_id, event_type.info, `Username ${username} has been retrieved`, new Date());
        const userDetails = results.rows[0];
        res.json(userDetails);

    });
}



const getUsersList = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request

    // Decode the token to extract user information
    const user = jwt.decode(accessToken);
    const username = user ? user.username : null;
    if (!username) return res.status(401).json({message: 'Cannot identify the username'});

    writeLogToDB(user.user_id, event_type.info, `All users are being retrieved`, new Date());

    pool.query(queries.getUsersList, (error, results) => {
        if (error) {
            writeLogToDB(user.user_id, event_type.error, `Failed to retrieve all users`, new Date());
            res.status(500).json([]);
            logger.error();
            throw error;
        }
        
        writeLogToDB(user.user_id, event_type.critical, `All users have been retrieved`, new Date());
        const userDetailsList = results.rows;
        res.json(userDetailsList);

    });

}


const changePassword = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request
    const user = jwt.decode(accessToken);

    try {
        const currentPassword = req.body.currentPassword;
        const newPassword = req.body.newPassword;

        // Decode the token to extract user information
        
        const userName = user ? user.username : null;
        if (!userName) return res.status(401).json({message: 'Cannot identify the username'});

        writeLogToDB(user.user_id, event_type.info, `User is changing the password`, new Date());

        // Retrieve user password from the database
        const { rows } = await pool.query(authQueries.getUserPasswordByUsername, [userName]);
        if (rows.length === 0) {
            writeLogToDB(user.user_id, event_type.error, `User not found`, new Date());
            return res.status(404).json({ message: 'User not found' });
        }

        const dbRetrievedPassword = String(rows[0].password);

        // Verify if the current password matches
        const isAuthenticated = await passwordTool.verifyPassword(String(currentPassword), dbRetrievedPassword);
        if (!isAuthenticated) {
            writeLogToDB(user.user_id, event_type.error, `User has entered the wrong current password`, new Date());
            return res.status(403).json({ message: 'Invalid current password' });
        }

        // Hash the new password
        const hashedNewPassword = await passwordTool.hashPassword(newPassword);

        // Update the user's password in the database
        await pool.query(queries.changePasswordByUserName, [userName, hashedNewPassword]);

        // Return success response
        writeLogToDB(user.user_id, event_type.info, `User has changed the password`, new Date());
        return res.status(200).json({ message: 'Password changed successfully' });

    } catch (error) {
        writeLogToDB(user.user_id, event_type.error, `Failed to change the password`, new Date());
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}


const editPhoneNumber = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request

    // Decode the token to extract user information
    const user = jwt.decode(accessToken);

    try {
        
        const userName = user ? user.username : null;
        if (!userName) return res.status(401).json({message: 'Cannot identify the username'});

        writeLogToDB(user.user_id, event_type.info, `User is changing the phone number`, new Date());
        
        const newPhoneNumber  = req.body.newPhoneNumber;

        await pool.query(queries.changePhoneNumberByUserName, [userName, newPhoneNumber]);

        logger.info(`username: ${userName} changed the phone number`);
        writeLogToDB(user.user_id, event_type.critical, `User has changed the phone number`, new Date());

        return res.status(200).json({ message: 'Your phone number was changed successfully' });

    } catch (error) {
        writeLogToDB(user.user_id, event_type.error, `Failed to change the phone number`, new Date());
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


const editDorm = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request

    // Decode the token to extract user information
    const user = jwt.decode(accessToken);

    try {
       
        const userName = user ? user.username : null;
        if (!userName) return res.status(401).json({message: 'Cannot identify the username'});   

        const user_id = req.params.user_id;
        const dorm_area = String(req.body.dorm_area);
        const dorm_room = String(req.body.dorm_room);

        writeLogToDB(user.user_id, event_type.info, `User ID #${user_id} dorm info is being changed`, new Date());

        const dormIdResult = await pool.query(queries.getDorm, [dorm_area, dorm_room]);
        const dorm_id = dormIdResult.rows[0].dorm_id;

        await pool.query("BEGIN");
        const result = await pool.query(queries.changeDormByUserId, [user_id, dorm_id]);
        // console.log(result);    

        await pool.query("COMMIT");
        logger.info(`User ID #${user_id} dorm info was changed`);
        writeLogToDB(user.user_id, event_type.critical, `User ID #${user_id} dorm info was changed`, new Date());

        return res.status(200).json({ message: 'User dorm was changed successfully' });

    } catch (error) {
        await pool.query("ROLLBACK");
        writeLogToDB(user.user_id, event_type.error, `Failed to change the dorm information`, new Date());
        logger.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}


const editRole = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request

    // Decode the token to extract user information
    const user = jwt.decode(accessToken);
    const userName = user ? user.username : null;
        

    try {
        const user_id = req.params.user_id;
        const role_id = req.body.role_id;

        writeLogToDB(user.user_id, event_type.info, `User ID #${user_id} role is being changed`, new Date());
        logger.info(`username: ${userName} is changing the role`);

        // const roleResult = await pool.query(queries.getRoleId, [role_name]);
        // const role_id = roleResult.rows[0].role_id;

        await pool.query("BEGIN");
        const result = await pool.query(queries.changeRoleByUserId, [user_id, role_id]);

        await pool.query("COMMIT");

        logger.info(`username: ${userName} changed the role`);
        writeLogToDB(user.user_id, event_type.critical, `User ID #${user_id} role was changed`, new Date());

        return res.status(200).json({ message: 'User role was changed successfully' });

    } catch (error) {
        await pool.query("ROLLBACK");
        logger.error(error);
        writeLogToDB(user.user_id, event_type.error, `Failed to change the role`, new Date());
        return res.status(500).json({ message: 'Server error' });
    }
}



const editUser = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request

    // Decode the token to extract user information
    const user = jwt.decode(accessToken);

    try {
        const user_id = req.params.user_id;
        const { fullname, gender, program, phone_number, intake, place_of_birth, date_of_birth } = req.body;

        logger.info(`user id: ${user_id} is being edited profile`);
        writeLogToDB(user.user_id, event_type.info, `User is editing user id #${user_id} profile`, new Date());

        await pool.query("BEGIN");
        const result = await pool.query(queries.editUser, [user_id, fullname, gender, program, phone_number, intake, place_of_birth, date_of_birth]);

        await pool.query("COMMIT");

        logger.info(`user id: ${user_id} profile has been edited`);
        writeLogToDB(user.user_id, event_type.critical, `User has edited user id #${user_id} profile`, new Date());

        return res.status(200).json({ message: 'User profile was edited successfully' });
    } catch (error) {
        await pool.query("ROLLBACK");
        logger.error(error);
        writeLogToDB(user.user_id, event_type.error, `Failed to edit profile`, new Date());
        return res.status(500).json({ message: 'Server error' });
    }
};




const createUser = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request

    // Decode the token to extract user information
    const user = jwt.decode(accessToken);

    try {
        const { username, fullname, email, role_id, gender, program, dorm_area, dorm_room, phone_number, intake, place_of_birth, date_of_birth } = req.body;

        // Find the dorm_id
        const dormIdResult = await pool.query(queries.getDorm, [dorm_area, dorm_room]);
        const dorm_id = dormIdResult.rows[0].dorm_id;

        // generate a new password for new user 
        const password = passwordTool.generateRandomPassword();
        const hashedPassword = await passwordTool.hashPassword(password);

        await pool.query("BEGIN");
        const result = await pool.query(queries.createUser, [username, fullname, email, hashedPassword, role_id, gender, program, dorm_id, phone_number, intake, place_of_birth, date_of_birth]);

        console.log(result);
        logger.info(`username: ${username} has been created.`);

        await pool.query("COMMIT");

        writeLogToDB(user.user_id, event_type.critical, `Username ${username} has been created`, new Date());

        // Send an email to the new user
        const loginPageURL = process.env.FRONT_END_LOGIN_PAGE_URL;
        const mailOptions = {
            from: {
                name: 'VGU Student Life Support Service',
                address: process.env.SYS_EMAIL
            },
            to: [email],
            subject: 'Your account has been created',
            // text: 'This is a title',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <table width="100%" style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px;">
            <tr>
                <td style="text-align: center; background-color: #f7f7f7; padding: 20px 0;">
                    <h2 style="color: #444;">VGU Student Life Support Service</h2>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px;">
                    <h3 style="color: #444;">Guten Tag ${fullname},</h3>

                    <p>Welcome to VGU Student Life Support Service, you just have been registered with this account:</p>

                    <table style="border: 1px solid black; border-collapse: collapse;">
                        <tr>
                            <th style="padding: 10px; text-align: left; border: 1px solid black;
          border-collapse: collapse;">Username</th>
                            <td style="padding: 10px; text-align: left; border: 1px solid black; border-collapse: collapse;">${username}</td>
                        </tr>

                        <tr>
                            <th style="padding: 10px;
          text-align: left; border: 1px solid black;
          border-collapse: collapse;">Password</th>
                            <td style="padding: 10px;
          text-align: left; border: 1px solid black;
          border-collapse: collapse;"><pre>${password}</pre></td>
                        </tr>
                    </table>

                    <p>Click the login button below to log into the system with the above credentials</p>

                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${loginPageURL}" style="background-color: #f58427; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                            Login
                        </a>
                    </div>
                    <p>For security reasons, we recommend you to change your password immediately after login. Please contact support if you have questions.</p>
                    <p>Have a nice day! 💕</p>

                    <br>
                    
                    <p>Best regards,</p>
                    <p>VGU Student Life Support Service</p>
                </td>
            </tr>
            <tr>
                <td style="background-color: #f7f7f7; text-align: center; padding: 10px;">
                    <small style="color: #888;">© 2024 VGU Student Life Support Service</small>
                </td>
            </tr>
        </table>
    </div>
            `
        }

        await mailer.sendMail(mailer.transporter, mailOptions);
        writeLogToDB(user.user_id, event_type.critical, `An email has been sent to ${email}`, new Date());

        return res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        await pool.query("ROLLBACK");
        logger.error(error);
        writeLogToDB(user.user_id, event_type.error, `Failed to create a user`, new Date());
        return res.status(500).json({ message: 'Server error' });
    }
};




const deleteUser = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1]; // Get the access token from the header request

    // Decode the token to extract user information
    const user = jwt.decode(accessToken);

    try {
        const user_id = req.params.user_id;

        logger.info(`username: ${user.user_name} is deleting a user`);
        writeLogToDB(user.user_id, event_type.info, `User is deleting user id #${user_id}`, new Date());

        await pool.query("BEGIN");
        const result = await pool.query(queries.deleteUser, [user_id]);
        
        await pool.query("COMMIT");

        logger.info(`user_id has been deleted`);
        writeLogToDB(user.user_id, event_type.critical, `User has deleted user id #${user_id}`, new Date());
        return res.status(200).json({ message: 'User was deleted successfully' });

    } catch (error) {
        await pool.query("ROLLBACK");
        logger.error(error);
        writeLogToDB(user.user_id, event_type.error, `Failed to delete a user`, new Date());
        return res.status(500).json({ message: 'Server error' });
    }
};



export default { getUsersList, getUserByUserName, changePassword, editPhoneNumber, editDorm, editRole, createUser, deleteUser, editUser };