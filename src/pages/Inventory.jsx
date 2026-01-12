import React from 'react';
import { Plus, Laptop, Star, Edit2, Trash2 } from 'lucide-react';

const Inventory = ({ filteredInventory, setAddModalOpen, warehouses, deleteProduct, onEdit }) => {
    return (
        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-800">Master Inventory Control</h3>
                <button
                    onClick={() => setAddModalOpen(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center"
                >
                    <Plus size={20} className="mr-2" /> Add Asset
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[1000px]">
                    <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                        <tr>
                            <th className="px-8 py-5">Laptop Asset</th>
                            <th className="px-8 py-5 text-center">Configuration</th>
                            <th className="px-8 py-5 text-center">Warehouse</th>
                            <th className="px-8 py-5 text-center">Rating</th>
                            <th className="px-8 py-5 text-center">Stock</th>
                            <th className="px-8 py-5 text-center">Price</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredInventory.map((item) => (
                            <tr key={item.id} className="hover:bg-blue-50/20 transition-all group">
                                <td className="px-8 py-5 flex items-center">
                                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mr-4 shadow-inner border border-slate-100 group-hover:bg-white transition-all">
                                        <Laptop size={22} className="text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-800 text-base">{item.brand}</p>
                                        <p className="text-xs font-bold text-slate-400">{item.model}</p>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-center font-bold text-slate-600 text-sm">{item.ram} / {item.ssd}</td>
                                <td className="px-8 py-5 text-center">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{item.warehouseId}</span>
                                    <span className="text-xs font-bold text-slate-700">{warehouses.find(w => w.id === item.warehouseId)?.name || 'Central Hub'}</span>
                                </td>
                                <td className="px-8 py-5 text-center font-black text-yellow-500 flex items-center justify-center">
                                    <Star size={14} className="fill-current mr-1" /> {item.rating}
                                </td>
                                <td className="px-8 py-5 text-center font-black text-slate-800 text-lg">{item.count}</td>
                                <td className="px-8 py-5 text-center font-black text-slate-800">₹{item.price.toLocaleString()}</td>
                                <td className="px-8 py-5 text-right flex items-center justify-end space-x-2">
                                    <button onClick={() => onEdit(item)} className="p-2.5 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-xl"><Edit2 size={16} /></button>
                                    <button onClick={() => deleteProduct(item.id)} className="p-2.5 bg-slate-50 text-slate-400 hover:text-red-500 rounded-xl"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;
