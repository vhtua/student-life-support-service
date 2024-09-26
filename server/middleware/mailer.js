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
        user: process.env.SYS_EMAIL,
        pass: process.env.SYS_EMAIL_PASSWORD
    },
});

const mailOptions = {
    from: {
        name: 'VGU Student Life Support Service',
        address: process.env.SYS_EMAIL
    },
    to: ['sample-email@gmail.com'],
    subject: 'Sending Email using VGU SLS Service',
    text: 'This is a title',
    html: "<h1>Welcome</h1><p>This is a html document</p>",
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

// sendMail(transporter, mailOptions);

export default { transporter, sendMail };