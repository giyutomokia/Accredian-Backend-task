import nodemailer from 'nodemailer';

// Create a Nodemailer transporter using Gmail App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Your Gmail email address
    pass: process.env.EMAIL_PASS,  // The 16-character Gmail App Password
  },
});

// Send referral email
export const sendReferralEmail = async (referral) => {
  try {
    const { referredBy, referee, email, phone, message } = referral;

    const mailOptions = {
      from: process.env.EMAIL_USER,  // Your email
      to: email,  // Recipient email (friend's email)
      subject: `Referral from ${referredBy}`,
      text: `Hello ${referee},\n\nYou've been referred by ${referredBy}. Here are the details:\n\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}\n\nThank you for using our referral system!`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Referral email sent!');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending referral email');
  }
};
