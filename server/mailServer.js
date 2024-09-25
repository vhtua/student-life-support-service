import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
});

const mailOptions = {
    from: {
        name: 'VGU Student Life Support Service',
        address: process.env.EMAIL
    },
    to: ['18812@student.vgu.edu.vn'],
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html: "<h1>Welcome</h1><p>That was easy!</p>",
    attachments: [
        {
            filename: 'logo.png',
            path: path.join(__dirname, 'assets', 'logo.png'),
            contentType: 'image/png'
        }
    ]
};

const sendMail = async (transporter, mailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error(error);
    }
}

sendMail(transporter, mailOptions);