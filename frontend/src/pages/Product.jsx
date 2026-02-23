import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Minus, Plus } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Product = () => {
    const { addToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);

    // Mock Product Data
    const product = {
        id: 1,
        name: 'Radiance Serum',
        price: 15000, // 15,000 INR
        description: 'Immerse your skin in the ultimate luxury. Our signature Radiance Serum is infused with 24k gold flakes and rare botanical extracts. Each drop absorbs instantly to deliver deep hydration, visibly plump fine lines, and impart an unparalleled, luminous glow.',
        features: [
            '24k Gold Flakes for instant luminosity',
            'Hyaluronic Acid for deep hydration',
            'Vitamin C to brighten dull skin',
            'Vegan and Cruelty-Free'
        ],
        reviews: [
            { id: 1, name: 'Eleanor H.', rating: 5, comment: 'Simply divine. My skin has never looked better.' },
            { id: 2, name: 'Sophia L.', rating: 5, comment: 'The glow it gives is unmatched. Worth every penny.' }
        ]
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <div className="pt-28 pb-20 px-8 min-h-screen max-w-7xl mx-auto flex flex-col md:flex-row gap-16 item-start">
            {/* Product Image Gallery */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2"
            >
                <div className="bg-white/50 w-full aspect-[4/5] rounded-t-full shadow-lg relative overflow-hidden flex items-center justify-center p-8">
                    {/* The gold glow backdrop behind product */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 to-rosegold/10 z-0"></div>
                    <img src="/serum_video/00092.png" alt="Radiance Serum" className="z-10 w-full h-auto object-contain drop-shadow-2xl gold-glow rounded-3xl" />
                </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-1/2 flex flex-col justify-center"
            >
                {/* Breadcrumb Navigation */}
                <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-gray-400 mb-6">
                    <Link to="/" className="hover:text-dark transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/product" className="hover:text-dark transition-colors">Shop</Link>
                    <span>/</span>
                    <span className="text-dark">{product.name}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-serif text-dark mb-4">{product.name}</h1>
                <p className="text-2xl font-sans font-light text-rosegold mb-8 max-w-max">₹{product.price.toLocaleString()}</p>

                <p className="text-gray-600 leading-relaxed mb-8">
                    {product.description}
                </p>

                <ul className="mb-10 space-y-3">
                    {product.features.map((feature, i) => (
                        <li key={i} className="flex gap-3 items-center text-sm text-gray-700">
                            <Star size={14} className="text-gold" /> {feature}
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center border border-gray-300">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-gray-100"><Minus size={16} /></button>
                        <span className="px-6 py-3 font-medium">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-gray-100"><Plus size={16} /></button>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button onClick={handleAddToCart} className="flex-1 bg-dark text-white uppercase tracking-widest py-4 hover:bg-rosegold transition-colors">
                        Add to Cart
                    </button>
                    <button className="border border-dark p-4 hover:bg-red-50 hover:text-red-500 hover:border-red-500 transition-colors">
                        <Heart size={24} />
                    </button>
                </div>

                {/* Reviews Section */}
                <div className="mt-16 border-t border-gray-200 pt-8">
                    <h3 className="font-serif text-2xl mb-6">Customer Reviews</h3>
                    <div className="space-y-6">
                        {product.reviews.map(review => (
                            <div key={review.id} className="bg-white/40 p-6 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} className="text-gold fill-gold" />)}
                                </div>
                                <h4 className="font-medium text-sm mb-1">{review.name}</h4>
                                <p className="text-gray-600 text-sm italic">"{review.comment}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
export default Product;
