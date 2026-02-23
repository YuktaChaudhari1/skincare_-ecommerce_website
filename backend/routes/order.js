const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// Get user orders
router.get('/', authenticateToken, async (req, res) => {
    // const { data: orders, error } = await supabase
    //     .from('orders')
    //     .select(`
    //         *,
    //         order_items (*)
    //     `)
    //     .eq('user_id', req.user.id)
    //     .order('created_at', { ascending: false });

    // if (error) return res.status(500).json({ error: error.message });

    // Return empty array for now since we're migrating DB
    res.json([]);
});

// Get single order with items
router.get('/:id', authenticateToken, async (req, res) => {
    // const { id } = req.params;
    // const { data: order, error } = await supabase
    //     .from('orders')
    //     .select(`
    //         *,
    //         order_items (*)
    //     `)
    //     .eq('id', id)
    //     .eq('user_id', req.user.id)
    //     .single();

    // if (error) return res.status(500).json({ error: error.message });
    // if (!order) return res.status(404).json({ error: 'Order not found' });

    res.json(null);
});

// Admin: Get all orders
router.get('/all', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });

    const { data: orders, error } = await supabase
        .from('orders')
        .select(`
            *,
            users (name, email),
            order_items (*)
        `)
        .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });

    res.json(orders);
});

// Admin: Update order status
router.put('/:id/status', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });

    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
});

module.exports = router;
