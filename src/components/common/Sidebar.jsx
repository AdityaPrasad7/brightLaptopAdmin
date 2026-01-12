import React from 'react';
import {
    LayoutDashboard,
    Package,
    Warehouse,
    ShoppingCart,
    Wrench,
    Users,
    MessageSquareQuote,
    FileText,
    BarChart3,
    LogOut,
    Laptop,
    AlertCircle
} from 'lucide-react';

const SidebarItem = ({ icon, label, isSidebarOpen, onClick, active }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${active
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
    >
        {icon}
        {isSidebarOpen && <span className="font-medium">{label}</span>}
    </button>
);

const Sidebar = ({ isSidebarOpen, activeTab, setActiveTab, handleLogout, setSearchTerm, setSelectedWarehouse }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'inventory', label: 'Inventory', icon: <Package size={20} /> },
        { id: 'warehouse', label: 'Warehouse', icon: <Warehouse size={20} /> },
        { id: 'orders', label: 'Orders', icon: <ShoppingCart size={20} /> },
        { id: 'refurb', label: 'Refurbishment', icon: <Wrench size={20} /> },
        { id: 'customers', label: 'Customers', icon: <Users size={20} /> },
        { id: 'complaints', label: 'Complaints', icon: <AlertCircle size={20} /> },
        { id: 'testimonials', label: 'Testimonials', icon: <MessageSquareQuote size={20} /> },
        { id: 'blogs', label: 'Blogs', icon: <FileText size={20} /> },
        { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    ];

    return (
        <aside className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col shrink-0 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
            <div className="p-6 flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg shadow-md"><Laptop className="text-white" size={24} /></div>
                {isSidebarOpen && <span className="text-xl font-bold text-blue-900 tracking-tight">Bright<span className="text-blue-500 italic">Laptop</span></span>}
            </div>
            <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        isSidebarOpen={isSidebarOpen}
                        active={activeTab === item.id}
                        onClick={() => {
                            setActiveTab(item.id);
                            if (setSearchTerm) setSearchTerm('');
                            if (setSelectedWarehouse) setSelectedWarehouse(null);
                        }}
                    />
                ))}
            </nav>
            <div className="p-4 border-t border-slate-100">
                <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all group">
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                    {isSidebarOpen && <span className="font-bold text-sm">Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
