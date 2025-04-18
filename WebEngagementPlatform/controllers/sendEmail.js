import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendMail = (recipientEmail, subject, message, callback) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: 'rajatdhage18@gmail.com',
        to: recipientEmail,
        subject,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return callback(error);
        }
        console.log(`Email sent to: ${recipientEmail} with Message ID: ${info.messageId}`);
        callback(null, info);
    });
};

export default sendMail;