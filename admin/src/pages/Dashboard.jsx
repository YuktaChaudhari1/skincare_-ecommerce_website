import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    // Mock Data
    const analytics = {
        totalOrders: 142,
        revenue: 2130000,
        totalReviews: 89,
    };

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Revenue (INR)',
                data: [300000, 450000, 390000, 520000, 480000, 610000, 800000],
                borderColor: '#D4AF37', // Gold
                backgroundColor: 'rgba(212, 175, 55, 0.2)',
                tension: 0.4, // smooth line
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: false },
        },
        scales: {
            y: { beginAtZero: true }
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-serif text-gray-800 mb-8 border-b border-gray-200 pb-4">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                    <p className="text-sm text-gray-500 mb-1 uppercase tracking-widest">Total Revenue</p>
                    <p className="text-3xl font-serif text-gold">₹{analytics.revenue.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                    <p className="text-sm text-gray-500 mb-1 uppercase tracking-widest">Total Orders</p>
                    <p className="text-3xl font-serif text-gray-800">{analytics.totalOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                    <p className="text-sm text-gray-500 mb-1 uppercase tracking-widest">Total Reviews</p>
                    <p className="text-3xl font-serif text-gray-800">{analytics.totalReviews}</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-10">
                <h3 className="text-xl font-medium mb-6">Revenue Trend</h3>
                <div className="h-96 w-full flex items-center justify-center">
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
