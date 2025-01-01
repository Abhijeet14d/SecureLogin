import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
// Create a transporter


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'singha17200@gmail.com', // Your email address
    pass: 'bzylpbihemtzpwkw', // App password
  },
});

// Verify the connection
transporter.verify((error, success) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Server is ready to send emails!');
  }
});

export const sendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: 'singha17200@gmail.com', // Sender address
      to, // Recipient address
      subject, // Subject line
      text, // Plain text body
      html, // HTML body (optional)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
