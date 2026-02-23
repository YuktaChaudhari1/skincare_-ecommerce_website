import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-12 px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <h3 className="text-2xl font-serif text-gold mb-4">Aurielle</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        The essence of luxury skincare, designed to illuminate your natural aura.
                    </p>
                </div>
                <div>
                    <h4 className="uppercase tracking-[0.2em] text-sm text-gold mb-4">Explore</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                        <li><a href="/product" className="hover:text-white transition-colors">The Serum</a></li>
                        <li><a href="/profile" className="hover:text-white transition-colors">My Account</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="uppercase tracking-[0.2em] text-sm text-gold mb-4">Connect</h4>
                    <p className="text-gray-400 text-sm mb-4">Follow us for daily rituals and aesthetic inspiration.</p>
                    <a href="https://instagram.com/aurielle_abs" target="_blank" rel="noreferrer" className="inline-flex items-center text-gold hover:text-white transition-colors">
                        @aurielle_abs                   </a>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs uppercase tracking-widest">
                &copy; {new Date().getFullYear()} Aurielle. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
