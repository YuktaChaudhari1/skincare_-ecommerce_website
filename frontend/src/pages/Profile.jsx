import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Package, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    // Mock order history
    const orders = [
        { id: 'OD12345', date: 'Oct 24, 2026', total: 15000, status: 'Delivered', items: [{ name: 'Radiance Serum', quantity: 1 }] },
        { id: 'OD12344', date: 'Sep 12, 2026', total: 30000, status: 'Shipped', items: [{ name: 'Radiance Serum', quantity: 2 }] }
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (loading) {
        return (
            <div className="pt-32 px-8 min-h-screen flex flex-col items-center justify-center bg-surface">
                <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 tracking-widest uppercase text-xs">Authenticating...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="pt-32 px-8 min-h-screen bg-surface flex items-center justify-center">
                <div className="text-center bg-white p-12 border border-blush shadow-xl max-w-lg w-full">
                    <h2 className="text-3xl font-serif mb-4 text-dark">Account Access</h2>
                    <p className="mb-8 text-gray-600 text-sm leading-relaxed">Please sign in to view your luminous profile and order history.</p>
                    <button onClick={() => navigate('/login')} className="bg-dark text-white px-8 py-4 tracking-widest uppercase text-xs hover:bg-gold transition-colors duration-300 w-full">
                        Sign In / Register
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 px-8 min-h-screen max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
            <div className="w-full md:w-1/4">
                <div className="bg-white/50 p-6 rounded-xl border border-white/50 mb-6">
                    <div className="w-20 h-20 bg-blush rounded-full flex items-center justify-center text-3xl font-serif text-rosegold mb-4">
                        {user.name ? user.name.charAt(0) : 'U'}
                    </div>
                    <h2 className="text-xl font-serif mb-1">{user.name || 'Lovely User'}</h2>
                    <p className="text-sm text-gray-500 mb-6">{user.email}</p>

                    <button className="flex items-center gap-3 text-sm text-dark hover:text-rosegold w-full mb-4">
                        <Package size={18} /> Order History
                    </button>
                    <button onClick={handleLogout} className="flex items-center gap-3 text-sm text-red-500 hover:text-red-700 w-full">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            <div className="w-full md:w-3/4">
                <h2 className="text-3xl font-serif mb-8 border-b border-gray-200 pb-4">Order History</h2>
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order.id} className="bg-white/50 p-6 rounded-xl border border-white/50">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="text-xs tracking-widest uppercase text-gray-500 block mb-1">Order #{order.id}</span>
                                    <span className="text-sm">{order.date}</span>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs tracking-widest uppercase px-3 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {order.status}
                                    </span>
                                    <span className="block mt-2 font-medium">₹{order.total.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 pt-4 mt-4">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-center">
                                        <div className="w-12 h-12 bg-rosegold/20 rounded-md"></div>
                                        <span className="text-sm text-gray-700">{item.name} x {item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Profile;
