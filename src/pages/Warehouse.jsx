import React from 'react';
import { Plus, Warehouse as WarehouseIcon, ArrowLeft } from 'lucide-react';

const Warehouse = ({ warehouses, selectedWarehouse, setSelectedWarehouse, inventory, setWHModalOpen }) => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            {!selectedWarehouse ? (
                <>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-black text-slate-800 leading-none">Global Logistic Nodes</h3>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Manage Multi-Warehousing Distribution</p>
                        </div>
                        <button
                            onClick={() => setWHModalOpen(true)}
                            className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-black shadow-lg shadow-blue-100 flex items-center"
                        >
                            <Plus size={20} className="mr-2" /> Expansion
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {warehouses.map(wh => {
                            const whStock = inventory.filter(i => i.warehouseId === wh.id).reduce((a, c) => a + c.count, 0);
                            return (
                                <div
                                    key={wh.id}
                                    onClick={() => setSelectedWarehouse(wh)}
                                    className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all"><WarehouseIcon size={28} /></div>
                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{wh.id}</span>
                                    </div>
                                    <h4 className="text-xl font-black text-slate-800 mt-6 tracking-tight">{wh.name}</h4>
                                    <div className="mt-8 grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-slate-50 rounded-2xl text-center">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Stock</p>
                                            <p className="text-lg font-black text-slate-800">{whStock} Units</p>
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-2xl text-center">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Utilization</p>
                                            <p className="text-lg font-black text-blue-600">{wh.capacity}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                <div className="animate-in fade-in slide-in-from-right-4">
                    <button onClick={() => setSelectedWarehouse(null)} className="mb-8 flex items-center font-black text-blue-600 text-xs uppercase hover:underline">
                        <ArrowLeft size={16} className="mr-2" /> Global Warehouse Network
                    </button>
                    <h3 className="text-3xl font-black text-slate-800 mb-8">{selectedWarehouse.name} Inventory</h3>
                    <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <tr>
                                    <th className="px-8 py-5">Laptop Asset</th>
                                    <th className="px-8 py-5 text-center">Config</th>
                                    <th className="px-8 py-5 text-center">Stock</th>
                                    <th className="px-8 py-5 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {inventory.filter(i => i.warehouseId === selectedWarehouse.id).map(item => (
                                    <tr key={item.id} className="hover:bg-blue-50/20">
                                        <td className="px-8 py-5 font-black text-slate-800 text-base">{item.brand} {item.model}</td>
                                        <td className="px-8 py-5 text-center font-bold text-slate-600">{item.ram} / {item.ssd}</td>
                                        <td className="px-8 py-5 text-center font-black text-slate-800 text-lg">{item.count}</td>
                                        <td className="px-8 py-5 text-right">
                                            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-black uppercase tracking-widest">{item.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Warehouse;
