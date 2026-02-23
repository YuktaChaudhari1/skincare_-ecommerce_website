import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = e => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock admin check
        if (credentials.email === 'admin@aurielle.com' && credentials.password === 'admin123') {
            localStorage.setItem('adminToken', 'mock-admin-token');
            navigate('/');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-surface flex items-center justify-center">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif text-gold mb-2">Aurielle Admin</h1>
                    <p className="text-gray-500 text-sm">Sign in to manage the luminous empire</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input name="email" type="email" required onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input name="password" type="password" required onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold" />
                    </div>
                    <button className="w-full bg-gold text-white font-medium py-3 rounded-lg hover:bg-yellow-600 transition-colors">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};
export default Login;
