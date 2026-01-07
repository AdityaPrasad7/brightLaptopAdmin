import React from 'react';
import { Truck, CheckCircle } from 'lucide-react';
import { COURIER_PARTNERS } from '../data/constants';

const Orders = ({ orders, setShippingTargetOrder, setShipModalOpen }) => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <div><h3 className="text-lg font-black text-slate-800">Dispatch Ledger</h3><p className="text-blue-500 text-[10px] font-black uppercase tracking-widest mt-1 italic">Shiprocket Partner Integration Active</p></div>
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
                            {orders.map(order => (
                                <tr key={order.id} className="hover:bg-slate-50/50">
                                    <td className="px-8 py-5 font-black text-blue-600 text-xs uppercase tracking-tighter">{order.id}</td>
                                    <td className="px-8 py-5"><p className="font-black text-slate-800">{order.customer}</p><p className="text-[10px] font-bold text-slate-400 uppercase">{order.item}</p></td>
                                    <td className="px-8 py-5 text-center font-black text-slate-800 text-base">₹{order.total.toLocaleString()}</td>
                                    <td className="px-8 py-5 text-center">
                                        {order.courier ? (
                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center space-x-1.5 text-blue-600">
                                                    {React.createElement(COURIER_PARTNERS.find(p => p.name === order.courier)?.icon || Truck, { size: 14 })}
                                                    <span className="text-xs font-black uppercase tracking-widest">{order.courier}</span>
                                                </div>
                                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-tighter mt-0.5">AWB: {order.tracking}</p>
                                            </div>
                                        ) : (
                                            <span className="text-[10px] font-black text-slate-300 uppercase italic">Pending Assignment</span>
                                        )}
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        {!order.courier ? (
                                            <button
                                                onClick={() => { setShippingTargetOrder(order); setShipModalOpen(true); }}
                                                className="px-5 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg hover:bg-blue-700 transition-all"
                                            >
                                                Dispatch Shiprocket
                                            </button>
                                        ) : (
                                            <span className="px-4 py-2 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-green-100 flex items-center justify-center w-fit ml-auto"><CheckCircle size={12} className="mr-1.5" /> Shipped</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
