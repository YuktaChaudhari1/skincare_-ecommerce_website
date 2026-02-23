import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = e => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (response.ok) {
                login(data.token, data.user);
                navigate('/profile');
            } else {
                setError(data.error || 'Failed to login');
            }
        } catch (err) {
            setError('Server connection error. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen bg-surface flex items-center justify-center pt-24 pb-12 px-8">
            <div className="bg-white p-10 shadow-2xl w-full max-w-md border border-blush">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif text-dark mb-2">Welcome Back</h1>
                    <p className="text-gray-500 text-sm">Sign in to your Aurielle account</p>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-3 text-sm mb-6 border border-red-200">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-widest text-xs">Email</label>
                        <input name="email" type="email" required onChange={handleChange} className="w-full p-4 border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-surface transition-colors" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-widest text-xs">Password</label>
                        <input name="password" type="password" required onChange={handleChange} className="w-full p-4 border border-gray-200 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-surface transition-colors" />
                    </div>
                    <button type="submit" className="w-full bg-dark text-white uppercase tracking-widest text-sm font-medium py-4 hover:bg-gold transition-colors duration-300">
                        Sign In
                    </button>
                    <div className="text-center mt-6">
                        <Link to="/signup" className="text-sm text-gray-500 hover:text-gold transition-colors">Don't have an account? <span className="uppercase tracking-widest text-xs border-b border-gray-300">Register</span></Link>
                    </div>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <Link to="/" className="text-xs uppercase tracking-widest text-gray-400 hover:text-dark transition-colors flex items-center justify-center gap-2">
                        ← Return to Boutique
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
