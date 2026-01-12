import React, { useState } from 'react';
import { Truck, CheckCircle, Clock, Package } from 'lucide-react';
import { COURIER_PARTNERS } from '../data/constants';

const Orders = ({ orders, setShippingTargetOrder, setShipModalOpen }) => {
    const [activeTab, setActiveTab] = useState('B2C'); // Default tab

    // Filter orders based on active tab
    const filteredOrders = orders.filter(order => {
        // Handle both mock structure (if any remnants) and real API structure
        // API returns orderType as 'B2B' or 'B2C'
        return order.orderType === activeTab;
    });
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-black text-slate-800">Dispatch Ledger</h3>
                        <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest mt-1 italic">Shiprocket Partner Integration Active</p>
                    </div>
                    {/* Tabs */}
                    <div className="flex bg-slate-50 p-1.5 rounded-xl">
                        <button
                            onClick={() => setActiveTab('B2C')}
                            className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${activeTab === 'B2C' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            B2C Orders
                        </button>
                        <button
                            onClick={() => setActiveTab('B2B')}
                            className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${activeTab === 'B2B' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            B2B Orders
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                            <tr>
                                <th className="px-8 py-5">Order ID</th>
                                <th className="px-8 py-5">Customer</th>
                                <th className="px-8 py-5 text-center">Value</th>
                                <th className="px-8 py-5 text-center">Courier Partner</th>
                                <th className="px-8 py-5 text-right">Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map(order => (
                                    <tr key={order._id} className="hover:bg-slate-50/50">
                                        <td className="px-8 py-5 font-black text-blue-600 text-xs uppercase tracking-tighter">#{order._id.slice(-6)}</td>
                                        <td className="px-8 py-5">
                                            <p className="font-black text-slate-800">{order.userId?.name || 'Unknown User'}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">
                                                {order.products?.length} Items • {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="px-8 py-5 text-center font-black text-slate-800 text-base">₹{order.totalAmount?.toLocaleString()}</td>
                                        <td className="px-8 py-5 text-center">
                                            {order.status === 'SHIPPED' ? (
                                                <div className="flex flex-col items-center">
                                                    <div className="flex items-center space-x-1.5 text-blue-600">
                                                        <Truck size={14} />
                                                        <span className="text-xs font-black uppercase tracking-widest">Shipped</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className={`text-[10px] font-black uppercase italic ${order.status === 'CANCELLED' ? 'text-red-400' : 'text-slate-300'}`}>
                                                    {order.status === 'PENDING' ? 'Pending Assignment' : order.status}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            {order.status === 'PENDING' || order.status === 'APPROVED' ? (
                                                <button
                                                    onClick={() => { setShippingTargetOrder(order); setShipModalOpen(true); }}
                                                    className="px-5 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg hover:bg-blue-700 transition-all"
                                                >
                                                    Dispatch Shiprocket
                                                </button>
                                            ) : (
                                                <span className="px-4 py-2 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-green-100 flex items-center justify-center w-fit ml-auto">
                                                    <CheckCircle size={12} className="mr-1.5" /> {order.status}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-300">
                                            <Package size={48} className="mb-4 opacity-50" />
                                            <p className="font-bold text-sm">No {activeTab} Orders Found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
