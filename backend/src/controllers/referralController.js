import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

// Create a transporter to send emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services (e.g., SendGrid, SES) if preferred
  auth: {
    user: process.env.EMAIL_USER, // Your email address (Gmail)
    pass: process.env.EMAIL_PASS, // Your email password (or app-specific password)
  },
});

export const createReferral = async (req, res) => {
  const { referredBy, referee, email, phone, message } = req.body;

  try {
    // Check if a referral already exists with the given email
    const existingReferral = await prisma.refer.findFirst({
      where: { email },
    });

    if (existingReferral) {
      return res.status(400).json({ error: 'Referral with this email already exists.' });
    }

    // Save the new referral to the database
    const newReferral = await prisma.refer.create({
      data: {
        referredBy,
        referee,
        email,
        phone,
        message,
      },
    });

    // Send a confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to: email, // Recipient's email address (referral's email)
      subject: 'Referral Confirmation',
      text: `
        Hello ${referee},

        You have been referred by ${referredBy}.

        Here are the details:
        - Referrer: ${referredBy}
        - Referral: ${referee}
        - Email: ${email}
        - Phone: ${phone}
        
        ${message ? `Message: ${message}` : ''}

        Thank you!
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Error sending email' });
      }
      console.log('Email sent: ' + info.response);
    });

    // Return a successful response
    res.status(200).json({ message: 'Referral created and email sent successfully!', referral: newReferral });
  } catch (error) {
    console.error('Error saving referral:', error);
    res.status(500).json({ error: 'Error saving referral' });
  }
};
