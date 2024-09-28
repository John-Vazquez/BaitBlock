// routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const Email = require('../models/Email');

// Send email (Create)
router.post('/send', async (req, res) => {
    try {
        const { sender, recipient, subject, body } = req.body;
        const email = new Email({ sender, recipient, subject, body });
        await email.save();
        res.status(200).json({ message: 'Email sent successfully', email });
    } catch (error) {
        res.status(500).json({ error: 'Error sending email' });
    }
});

// Get all emails (Read)
router.get('/inbox', async (req, res) => {
    try {
        const emails = await Email.find({});
        res.status(200).json(emails);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching emails' });
    }
});

module.exports = router;