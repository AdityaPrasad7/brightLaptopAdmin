import { Mail, Eye, Download } from 'lucide-react';
import { exportToExcel, exportToCSV } from '../utils/excelExport';

const Customers = ({ filteredCustomers, onView }) => {
    const handleExport = (type) => {
        const data = filteredCustomers.map(c => ({
            'Customer Name': c.name,
            'Email Address': c.email,
            'Type': c.type,
            'Total Spent': c.totalSpent,
            'Status': c.status
        }));

        if (type === 'excel') {
            exportToExcel(data, 'customers_report');
        } else {
            exportToCSV(data, 'customers_report');
        }
    };

    return (
        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden animate-in fade-in">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-800">Customer Intelligence CRM</h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleExport('excel')}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all font-bold text-xs uppercase tracking-wider"
                    >
                        <Download size={14} /> Excel
                    </button>
                    <button
                        onClick={() => handleExport('csv')}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all font-bold text-xs uppercase tracking-wider"
                    >
                        <Download size={14} /> CSV
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                        <tr>
                            <th className="px-8 py-5">Profile</th>
                            <th className="px-8 py-5 text-center">Type</th>
                            <th className="px-8 py-5 text-center">LTV</th>
                            <th className="px-8 py-5 text-center">Status</th>
                            <th className="px-8 py-5 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredCustomers.map(customer => (
                            <tr key={customer.id} className="hover:bg-slate-50/50">
                                <td className="px-8 py-5 flex items-center">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-md ${customer.type === 'B2B' ? 'bg-indigo-500' : 'bg-pink-500'}`}>
                                        {customer.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-black text-slate-800">{customer.name}</p>
                                        <p className="text-xs text-slate-400 font-bold">{customer.email}</p>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-center">
                                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${customer.type === 'B2B' ? 'bg-indigo-50 text-indigo-600' : 'bg-pink-50 text-pink-600'}`}>
                                        {customer.type}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-center font-black text-slate-800 text-base">₹{customer.totalSpent.toLocaleString()}</td>
                                <td className="px-8 py-5 text-center">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${customer.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                                        {customer.status}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <button onClick={() => onView(customer)} className="p-2.5 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-xl"><Eye size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Customers;
