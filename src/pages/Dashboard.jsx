import React from 'react';
import { Activity, Truck, Wrench } from 'lucide-react';
import StatCard from '../components/common/StatCard';

const Dashboard = ({ stats, setActiveTab }) => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} />
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[32px] shadow-sm border border-slate-100 p-8">
                    <h3 className="font-black text-slate-800 text-lg mb-6 flex items-center">
                        <Activity size={20} className="mr-2 text-blue-600" /> Recent Operations Log
                    </h3>
                    <div className="space-y-4">
                        {[
                            { msg: "BlueDart pickup scheduled for ORD-7721", time: "5 mins ago", type: "success" },
                            { msg: "Refurbished ThinkPad T480 moved to Certified", time: "1 hour ago", type: "info" },
                            { msg: "Low stock alert: Dell Latitude 5420", time: "2 hours ago", type: "warning" }
                        ].map((log, i) => (
                            <div key={i} className="flex items-center space-x-4 p-4 hover:bg-slate-50 rounded-2xl transition-all">
                                <div className={`w-2 h-2 rounded-full ${log.type === 'success' ? 'bg-green-500' : log.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                                <p className="text-sm font-bold text-slate-700 flex-1">{log.msg}</p>
                                <span className="text-[10px] font-black text-slate-300 uppercase">{log.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8 h-fit">
                    <h3 className="font-black text-slate-800 text-lg mb-6">Quick Navigation</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setActiveTab('orders')} className="p-6 bg-orange-50/50 rounded-3xl border-2 border-orange-100 hover:border-orange-500 transition-all flex flex-col items-center">
                            <Truck className="text-orange-600 mb-2" size={24} />
                            <span className="text-[10px] font-black uppercase text-orange-900">Shipments</span>
                        </button>
                        <button onClick={() => setActiveTab('refurb')} className="p-6 bg-indigo-50/50 rounded-3xl border-2 border-indigo-100 hover:border-indigo-500 transition-all flex flex-col items-center">
                            <Wrench className="text-indigo-600 mb-2" size={24} />
                            <span className="text-[10px] font-black uppercase text-indigo-900">Workforce</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
