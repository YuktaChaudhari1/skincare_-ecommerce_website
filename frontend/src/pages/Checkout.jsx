import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, getCartTotal, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        address: '',
        city: '',
        zip: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        const res = await loadRazorpayScript();

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        // Mock backend call
        const options = {
            key: "rzp_test_placeholder", // Replace with real key in .env or via your backend API
            amount: getCartTotal() * 100,
            currency: "INR",
            name: "Aurielle - Her Glowing Aura",
            description: "Radiance Serum Purchase",
            handler: function (response) {
                // Here we would verify with backend
                alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                clearCart();
                navigate('/profile');
            },
            prefill: {
                name: formData.name,
                email: formData.email,
            },
            theme: {
                color: "#D4AF37" // Gold
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    if (cart.length === 0) {
        return (
            <div className="pt-32 px-8 min-h-screen max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-serif mb-4">Your Cart is Empty</h2>
                <button onClick={() => navigate('/product')} className="border border-dark py-3 px-8 hover:bg-dark hover:text-white transition-colors">
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 px-8 min-h-screen max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
            <div className="w-full md:w-2/3">
                <h2 className="text-3xl font-serif mb-8 border-b border-gray-200 pb-4">Shipping Information</h2>
                <form onSubmit={handlePayment} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm text-gray-600 mb-2">Full Name</label>
                            <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/50 border border-gray-300 p-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm text-gray-600 mb-2">Email Address</label>
                            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white/50 border border-gray-300 p-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm text-gray-600 mb-2">Address</label>
                            <input required name="address" value={formData.address} onChange={handleChange} className="w-full bg-white/50 border border-gray-300 p-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-2">City</label>
                            <input required name="city" value={formData.city} onChange={handleChange} className="w-full bg-white/50 border border-gray-300 p-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-2">ZIP Code</label>
                            <input required name="zip" value={formData.zip} onChange={handleChange} className="w-full bg-white/50 border border-gray-300 p-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" />
                        </div>
                    </div>
                </form>
            </div>

            <div className="w-full md:w-1/3 bg-white/40 p-8 rounded-xl h-fit border border-white/50 shadow-sm">
                <h3 className="font-serif text-2xl mb-6">Order Summary</h3>
                <div className="space-y-4 mb-8">
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">{item.name} x {item.quantity}</span>
                            <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-200 pt-4 mb-8 flex justify-between items-center text-lg">
                    <span className="font-serif">Total</span>
                    <span className="font-serif font-medium text-rosegold">₹{getCartTotal().toLocaleString()}</span>
                </div>
                <button
                    onClick={handlePayment}
                    className="w-full bg-dark text-white py-4 uppercase tracking-widest text-sm hover:bg-rosegold transition-colors"
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};
export default Checkout;
