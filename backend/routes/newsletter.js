const express = require('express');
const router = express.Router();
// const supabase = require('../supabaseClient');

router.post('/', async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: 'Email is required' });

    // Check if already subscribed
    const { data: existing } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .eq('email', email)
        .single();

    if (existing) {
        return res.json({ success: true, message: 'Already subscribed' });
    }

    const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

    if (error) return res.status(500).json({ error: error.message });

    res.json({ success: true, message: 'Subscribed successfully' });
});

module.exports = router;
