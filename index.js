const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer');
const itemsRouter = require('./routes/items.routes')
const kassaRouter = require('./routes/kassa.routes')
const PORT = 53314

const app = express()
app.use(cors({
    origin: '*',
    credentials: true
}))

app.use(express.json())
app.use('/api', itemsRouter)
app.use('/api', kassaRouter)



const transporter = nodemailer.createTransport({
  service: 'hotmail',
  host: "smtp.office365.com",
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587,
  auth: {
    user: 'applestorerf@outlook.com', // Your Outlook.com email address
    pass: 'ApSTOReRF2024', // Your Outlook.com email password
  },
  debug: true,
  tls: {
        ciphers:'SSLv3',
        rejectUnauthorized: false
    }
});

// API endpoint to handle email sending
app.post('/api/send-email', (req, res) => {
  const { recipient, subject, text } = req.body;

  const mailOptions = {
    from: 'applestorerf@outlook.com',
    to: recipient,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email.' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully.' });
    }
  });
});



app.listen(PORT, () => console.log(`server started on port ${PORT}`))
