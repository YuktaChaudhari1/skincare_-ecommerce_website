import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Star, LogOut } from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/login');
    };

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-6 py-3 font-medium transition-colors ${isActive ? 'text-gold bg-gold/5 border-r-4 border-gold' : 'text-gray-500 hover:text-gold hover:bg-gray-50'
        }`;

    return (
        <div className="w-64 bg-white h-full border-r border-gray-100 flex flex-col py-8 shadow-sm">
            <h2 className="text-2xl font-serif text-center mb-12 text-gold tracking-widest uppercase">Aurielle</h2>

            <nav className="flex-1 space-y-2">
                <NavLink to="/" className={linkClass} end>
                    <LayoutDashboard size={20} /> Dashboard
                </NavLink>
                <NavLink to="/orders" className={linkClass}>
                    <ShoppingCart size={20} /> Orders
                </NavLink>
                <NavLink to="/reviews" className={linkClass}>
                    <Star size={20} /> Reviews
                </NavLink>
            </nav>

            <div className="px-6">
                <button onClick={handleLogout} className="flex items-center gap-3 text-gray-500 hover:text-red-500 transition-colors py-3 w-full font-medium">
                    <LogOut size={20} /> Logout
                </button>
            </div>
        </div>
    );
};
export default Sidebar;
