// models/Email.js
const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    sender: String,
    recipient: String,
    subject: String,
    body: String,
    isScam: { type: Boolean, default: false },
    flaggedReason: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Email', EmailSchema);
