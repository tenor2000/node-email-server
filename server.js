import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import emailjs from '@emailjs/nodejs'; // v4.1.0 not working, currently using v2.2.0
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const serviceId = process.env.EMAILJS_SERVICE_ID;
const templateId = process.env.EMAILJS_TEMPLATE_ID;
const publicKey = process.env.EMAILJS_PUBLIC_KEY;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
    };

    emailjs.init({ publicKey: publicKey});

    emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then(response => {
            res.json({ success: true, message: 'Email sent successfully!' });
        })
        .catch(err => {
            console.error('Email sending error:', err);
            res.status(500).json({ success: false, message: 'Failed to send email' });
        });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
