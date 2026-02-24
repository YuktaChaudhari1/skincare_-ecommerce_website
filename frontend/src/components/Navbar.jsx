import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { toggleCart, cart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] glass py-4 px-6 md:px-8 flex flex-col md:flex-row justify-between md:items-center transition-all duration-300 bg-white/60 backdrop-blur-md">
            <div className="flex justify-between items-center w-full md:w-auto">
                <Link to="/" className="text-2xl font-serif tracking-widest text-dark uppercase">
                    Aurielle
                </Link>
                <div className="flex items-center gap-4 md:hidden">
                    <button onClick={toggleCart} className="relative hover:text-rosegold transition-colors">
                        <ShoppingBag size={20} />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-rosegold text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                {cart.length}
                            </span>
                        )}
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-dark">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-6 items-start md:items-center mt-6 md:mt-0 w-full md:w-auto`}>
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-sm tracking-widest hover:text-rosegold transition-colors uppercase w-full md:w-auto py-2 md:py-0 border-b md:border-none border-gray-100">Home</Link>
                <Link to="/product" onClick={() => setIsMenuOpen(false)} className="text-sm tracking-widest hover:text-rosegold transition-colors uppercase w-full md:w-auto py-2 md:py-0 border-b md:border-none border-gray-100">Shop</Link>
                {user ? (
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="text-sm tracking-widest hover:text-rosegold transition-colors uppercase w-full md:w-auto py-2 md:py-0 border-b md:border-none border-gray-100">
                        Profile
                    </Link>
                ) : (
                    <>
                        <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-sm tracking-widest hover:text-rosegold transition-colors uppercase w-full md:w-auto py-2 md:py-0 border-b md:border-none border-gray-100">Login</Link>
                        <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-sm tracking-widest hover:text-rosegold transition-colors uppercase w-full md:w-auto py-2 md:py-0 border-b md:border-none border-gray-100">Join</Link>
                    </>
                )}

                {/* Desktop Cart Icon */}
                <button onClick={toggleCart} className="relative hover:text-rosegold transition-colors hidden md:block">
                    <ShoppingBag size={20} />
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-rosegold text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                            {cart.length}
                        </span>
                    )}
                </button>
            </div>
        </nav>
    );
};
export default Navbar;
