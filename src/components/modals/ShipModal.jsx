import React from 'react';
import { X, Truck } from 'lucide-react';
import { COURIER_PARTNERS } from '../../data/constants';

const ShipModal = ({ isOpen, setShipModalOpen, assignCourier }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 backdrop-blur-sm bg-slate-900/50 animate-in fade-in duration-300">
            <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-sm overflow-hidden animate-in slide-in-from-bottom-4">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                    <h3 className="text-lg font-black text-slate-800">Dispatch Order</h3>
                    <button onClick={() => setShipModalOpen(false)} className="p-2 hover:bg-white rounded-xl text-slate-400"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        {COURIER_PARTNERS.map((partner) => {
                            const Icon = partner.icon;
                            return (
                                <button
                                    key={partner.id}
                                    onClick={() => assignCourier(partner.name)}
                                    className="p-4 rounded-2xl border border-slate-100 hover:border-blue-500 transition-all flex flex-col items-center group"
                                >
                                    <div className={`w-10 h-10 ${partner.bg} ${partner.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                        <Icon size={18} />
                                    </div>
                                    <p className="text-xs font-black text-slate-800">{partner.name}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShipModal;
