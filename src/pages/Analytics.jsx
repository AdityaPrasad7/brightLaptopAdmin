import React from 'react';
import { PieChart as PieIcon, ArrowUpRight, ShieldCheck, ShoppingCart, Briefcase, User } from 'lucide-react';

const Analytics = ({ analyticsData, reportTimeframe, setReportTimeframe, filteredOrdersByTime }) => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Factor</p>
                    <h3 className="text-3xl font-black text-slate-800 mt-2">{analyticsData.growth}</h3>
                    <div className="mt-4 flex items-center text-green-600 text-xs font-black uppercase">
                        <ArrowUpRight size={16} className="mr-1" /> VS LAST {reportTimeframe}
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg Order Value</p>
                    <h3 className="text-3xl font-black text-slate-800 mt-2">
                        ₹{(analyticsData.totalValue / (filteredOrdersByTime.length || 1)).toLocaleString()}
                    </h3>
                    <div className="mt-4 flex items-center text-indigo-600 text-xs font-black uppercase">
                        <ShieldCheck size={16} className="mr-1" /> OPTIMIZED MARGINS
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Volume Sold</p>
                    <h3 className="text-3xl font-black text-slate-800 mt-2">{filteredOrdersByTime.length} Laptops</h3>
                    <div className="mt-4 flex items-center text-pink-500 text-xs font-black uppercase">
                        <ShoppingCart size={16} className="mr-1" /> {reportTimeframe} FLOW
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-10">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h3 className="text-2xl font-black text-slate-800 flex items-center">
                            <PieIcon className="mr-3 text-indigo-500" size={28} /> Market Distribution
                        </h3>
                        <p className="text-xs text-slate-400 font-bold mt-2 uppercase tracking-[0.2em]">Segmentation Analysis (B2B vs B2C)</p>
                    </div>
                    <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-2xl">
                        <button
                            onClick={() => setReportTimeframe('weekly')}
                            className={`px-6 py-2.5 text-[10px] font-black uppercase rounded-xl transition-all ${reportTimeframe === 'weekly' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Weekly
                        </button>
                        <button
                            onClick={() => setReportTimeframe('monthly')}
                            className={`px-6 py-2.5 text-[10px] font-black uppercase rounded-xl transition-all ${reportTimeframe === 'monthly' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Monthly
                        </button>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-around gap-12">
                    <div className="relative w-64 h-64">
                        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 drop-shadow-xl">
                            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ec4899" strokeWidth="4.5" strokeDasharray={`${analyticsData.b2c.percentage} ${100 - analyticsData.b2c.percentage}`} className="transition-all duration-700 ease-in-out" />
                            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#6366f1" strokeWidth="4.5" strokeDasharray={`${analyticsData.b2b.percentage} ${100 - analyticsData.b2b.percentage}`} strokeDashoffset={`-${analyticsData.b2c.percentage}`} className="transition-all duration-700 ease-in-out" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Net Val</span>
                            <span className="text-2xl font-black text-slate-800 leading-tight">₹{analyticsData.totalValue.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="flex-1 max-w-md space-y-6">
                        <div className="flex items-center justify-between p-4 bg-indigo-50/30 rounded-3xl border border-indigo-50/50">
                            <div className="flex items-center space-x-4">
                                <Briefcase className="text-indigo-600" size={24} />
                                <div>
                                    <p className="font-black text-slate-800">Enterprise B2B</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bulk Corporate Logistics</p>
                                </div>
                            </div>
                            <p className="text-2xl font-black text-indigo-600">{analyticsData.b2b.percentage}%</p>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-pink-50/30 rounded-3xl border border-pink-50/50">
                            <div className="flex items-center space-x-4">
                                <User className="text-pink-600" size={24} />
                                <div>
                                    <p className="font-black text-slate-800">Retail B2C</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Direct Consumer Delivery</p>
                                </div>
                            </div>
                            <p className="text-2xl font-black text-pink-600">{analyticsData.b2c.percentage}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
