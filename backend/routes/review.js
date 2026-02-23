const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// Get all reviews
router.get('/', async (req, res) => {
    // const { data: reviews, error } = await supabase
    //     .from('reviews')
    //     .select(`
    //         id, rating, comment, created_at,
    //         users (name)
    //     `)
    //     .order('created_at', { ascending: false });

    // if (error) return res.status(500).json({ error: error.message });

    res.json([]);
});

// Add a review
router.post('/', authenticateToken, async (req, res) => {
    const { rating, comment } = req.body;

    // const { data, error } = await supabase
    //     .from('reviews')
    //     .insert([{ user_id: req.user.id, rating, comment }])
    //     .select()
    //     .single();

    // if (error) return res.status(500).json({ error: error.message });

    res.status(201).json({ message: "Mock review added" });
});

// Admin: Delete a review
router.delete('/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });

    const { id } = req.params;

    const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });

    res.json({ success: true, message: 'Review deleted successfully' });
});

module.exports = router;
