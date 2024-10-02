const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { service_id, template_id, user_id, template_params } = req.body;

    const emailjs = require('emailjs-com');
    emailjs.send(service_id, template_id, template_params, user_id)
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
