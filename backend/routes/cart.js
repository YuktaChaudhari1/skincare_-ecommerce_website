const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { authenticateToken } = require('../middleware/auth');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_secret_placeholder',
});

// Create Razorpay order
router.post('/checkout', authenticateToken, async (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: amount * 100, // convert to subunits for INR
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verify payment and save to DB
router.post('/verify', authenticateToken, async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, items } = req.body;

    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'rzp_secret_placeholder');
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature !== razorpay_signature) {
        return res.status(400).json({ error: 'Payment verification failed' });
    }

    // Save order to Supabase placeholder or commented out
    // const { data: orderData, error: orderError } = await supabase
    //     .from('orders')
    //     ...
    //     .single();
    // if (orderError) return res.status(500).json({ error: orderError.message });

    // // Save order items
    // ...
    // const { error: itemsError } = await supabase
    //     .from('order_items')
    //     .insert(orderItemsToInsert);
    // if (itemsError) return res.status(500).json({ error: itemsError.message });

    res.json({ success: true, order: { id: 'mock-order-id-for-now' } });
});

module.exports = router;
