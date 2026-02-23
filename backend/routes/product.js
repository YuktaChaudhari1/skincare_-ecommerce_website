const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        id: 1,
        name: 'Radiance Serum - Her Glowing Aura',
        price: 150.00,
        description: 'A luxurious soft blush feminine glowing gold serum.',
        features: ['Hydrating', 'Anti-aging', 'Brightening', '24k Gold Flakes'],
        stock: 100,
    });
});

module.exports = router;
