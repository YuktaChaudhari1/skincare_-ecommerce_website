import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { toggleCart, cart } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] glass py-4 px-8 flex justify-between items-center transition-all duration-300 bg-white/40">
            <Link to="/" className="text-2xl font-serif tracking-widest text-dark uppercase">
                Aurielle
            </Link>
            <div className="flex gap-6 items-center">
                <Link to="/" className="text-sm tracking-widest hover:text-rosegold transition-colors uppercase">Home</Link>
                <Link to="/product" className="text-sm tracking-widest hover:text-rosegold transition-colors uppercase">Shop</Link>
                {user ? (
                    <Link to="/profile" className="text-sm tracking-widest hover:text-rosegold transition-colors uppercase">
                        Profile
                    </Link>
                ) : (
                    <>
                        <Link to="/login" className="text-sm tracking-widest hover:text-rosegold transition-colors uppercase">Login</Link>
                        <Link to="/signup" className="text-sm tracking-widest hover:text-rosegold transition-colors uppercase">Join</Link>
                    </>
                )}
                <button onClick={toggleCart} className="relative hover:text-rosegold transition-colors">
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
