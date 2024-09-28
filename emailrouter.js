// routes/emailRoutes.js

const express = require('express');
const router = express.Router();
const Email = require('../models/Email'); // Email model
const analyzeEmail = require('../utils/analyzeEmail'); // Function to analyze emails using OpenAI

// Route to send an email
router.post('/send', async (req, res) => {
    try {
        const { sender, recipient, subject, body } = req.body;

        // Analyze the email content to detect if it's a scam
        const isScam = await analyzeEmail(`${subject} ${body}`);

        // Create the email object
        const email = new Email({
            sender,
            recipient,
            subject,
            body,
            isScam,
            flaggedReason: isScam ? 'Scam detected by AI analysis' : ''
        });

        // Save the email to the database
        await email.save();

        // Respond with success and the saved email
        res.status(200).json({ message: 'Email sent successfully', email });
    } catch (error) {
        // Respond with an error message in case of failure
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
});

// Route to retrieve all emails (Inbox)
router.get('/inbox', async (req, res) => {
    try {
        // Fetch all emails from the database
        const emails = await Email.find({}).sort({ date: -1 }); // Sorted by date, newest first
        res.status(200).json(emails);
    } catch (error) {
        // Respond with an error message in case of failure
        console.error('Error fetching emails:', error);
        res.status(500).json({ error: 'Error fetching emails' });
    }
});

// Route to get a specific email by ID (optional if needed)
router.get('/:id', async (req, res) => {
    try {
        const email = await Email.findById(req.params.id);
        if (!email) {
            return res.status(404).json({ message: 'Email not found' });
        }
        res.status(200).json(email);
    } catch (error) {
        console.error('Error fetching email:', error);
        res.status(500).json({ error: 'Error fetching email' });
    }
});

// Route to delete an email by ID (optional if needed)
router.delete('/:id', async (req, res) => {
    try {
        const email = await Email.findByIdAndDelete(req.params.id);
        if (!email) {
            return res.status(404).json({ message: 'Email not found' });
        }
        res.status(200).json({ message: 'Email deleted successfully' });
    } catch (error) {
        console.error('Error deleting email:', error);
        res.status(500).json({ error: 'Error deleting email' });
    }
});

module.exports = router;