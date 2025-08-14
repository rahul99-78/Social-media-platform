import nodemailer from 'nodemailer';

// Send verification email
const sendVerificationEmail = async (user) => {
  // Ensure token is generated before email sending
  const token = user.generateAuthToken(); // Make sure this method exists and works

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"Your App Name" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: 'Email Verification',
    text: `Hello ${user.name},\n\nPlease verify your email by clicking the link below:\n\nhttp://yourapp.com/verify-email?token=${token}\n\nThank you!`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Verification email sent to:', user.email);
  } catch (error) {
    console.error('❌ Error sending verification email:', error.message);
  }
};

export { sendVerificationEmail };
