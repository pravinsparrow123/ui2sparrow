const nodemailer =require('nodemailer');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Create a transporter (using SMTP or any service like Gmail, SendGrid, etc.)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email service (Gmail, SendGrid, etc.)
  auth: {
    user: 'fbkumar323@gmail.com', // Your email address
    pass: 'qywb hlsn kkwp dada', // Your email password or App-specific password
  },
});

app.post("/send-email", (req, res) => {
  const { to_name, to_email, message } = req.body;
    console.log("Body : ",req.body);
  if (!to_name || !to_email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const mailOptions = {
    from: 'fbkumar323@gmail.com', // Sender address
    to: to_email, // Recipient address
    subject: `Message from ${to_name}`, // Subject line
    text: message, // Plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to send email", details: error });
    }
    console.log('Email sent: ' + info.response);
    res.status(200).json({ message: "Email sent successfully", info: info });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
