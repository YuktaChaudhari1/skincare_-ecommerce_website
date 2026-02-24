const express = require('express');
const router = express.Router();
// const supabase = require('../supabaseClient');

router.post('/', async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: 'Email is required' });

    // TODO: Implement newsletter subscription using MongoDB (Mongoose)

    res.json({ success: true, message: 'Subscribed successfully (Mocked)' });
});

module.exports = router;
