import React, { useState } from 'react';

const Orders = () => {
    // Mock orders
    const [orders, setOrders] = useState([
        { id: 'ORD-001', customer: 'Eleanor H.', total: 15000, date: 'Oct 24, 2026', status: 'Pending' },
        { id: 'ORD-002', customer: 'Sophia L.', total: 30000, date: 'Oct 23, 2026', status: 'Shipped' },
        { id: 'ORD-003', customer: 'Liam M.', total: 15000, date: 'Oct 21, 2026', status: 'Delivered' },
        { id: 'ORD-004', customer: 'Ava K.', total: 45000, date: 'Oct 20, 2026', status: 'Pending' },
    ]);

    const handleStatusChange = (id, newStatus) => {
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Shipped': return 'bg-blue-100 text-blue-800';
            case 'Delivered': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-serif text-gray-800 mb-8 border-b border-gray-200 pb-4">Orders Management</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="p-4 font-medium text-gray-600 uppercase tracking-wider text-sm">Order ID</th>
                            <th className="p-4 font-medium text-gray-600 uppercase tracking-wider text-sm">Customer</th>
                            <th className="p-4 font-medium text-gray-600 uppercase tracking-wider text-sm">Date</th>
                            <th className="p-4 font-medium text-gray-600 uppercase tracking-wider text-sm">Total</th>
                            <th className="p-4 font-medium text-gray-600 uppercase tracking-wider text-sm">Status</th>
                            <th className="p-4 font-medium text-gray-600 uppercase tracking-wider text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                <td className="p-4 font-medium text-gray-800">{order.id}</td>
                                <td className="p-4 text-gray-600">{order.customer}</td>
                                <td className="p-4 text-gray-600">{order.date}</td>
                                <td className="p-4 font-medium text-gold">₹{order.total.toLocaleString()}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className="bg-white border border-gray-200 text-sm rounded focus:ring-1 focus:ring-gold focus:border-gold p-2 outline-none"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Orders;
