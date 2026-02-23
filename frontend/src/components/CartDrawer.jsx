import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
    const { isCartOpen, toggleCart, cart, updateQuantity, removeFromCart, getCartTotal } = useContext(CartContext);
    const navigate = useNavigate();

    const handleCheckout = () => {
        toggleCart();
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 cursor-pointer"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-blush z-50 shadow-2xl p-6 flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="font-serif text-2xl">Your Cart</h2>
                            <button onClick={toggleCart} className="hover:text-rosegold transition-colors"><X /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-6">
                            {cart.length === 0 ? (
                                <p className="text-center text-gray-500 mt-10">Your cart is beautifully empty.</p>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="flex gap-4 items-center bg-white/50 p-4 rounded-xl">
                                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                            <div className="w-full h-full bg-rosegold/20" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-serif">{item.name}</h3>
                                            <p className="text-sm text-gray-600">₹{item.price}</p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-rosegold"><Minus size={14} /></button>
                                                <span className="text-sm">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-rosegold"><Plus size={14} /></button>
                                            </div>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                                            <X size={18} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="mt-6 pt-6 border-t border-gray-300">
                                <div className="flex justify-between mb-4">
                                    <span className="uppercase tracking-widest text-sm">Subtotal</span>
                                    <span className="font-serif">₹{getCartTotal()}</span>
                                </div>
                                <button onClick={handleCheckout} className="w-full bg-dark text-white py-4 uppercase tracking-widest text-sm hover:bg-rosegold transition-colors">
                                    Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
export default CartDrawer;
