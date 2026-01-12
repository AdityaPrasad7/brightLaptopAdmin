import React, { useState, useMemo, useEffect } from 'react';
import './App.css';

// Data & Constants
import { STAGES } from './data/constants';
import {
  INITIAL_INVENTORY,
  INITIAL_ORDERS,
  INITIAL_REFURB,
  INITIAL_TESTIMONIALS,
  INITIAL_BLOGS,
  INITIAL_WAREHOUSES,
  INITIAL_CUSTOMERS
} from './data/mockData';

// Icons
import { TrendingUp, Warehouse, RefreshCcw, Star } from 'lucide-react';

// Components
import Layout from './components/common/Layout';
import Login from './components/auth/Login';

// Pages
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import WarehousePage from './pages/Warehouse';
import Orders from './pages/Orders';
import RefurbPipeline from './pages/RefurbPipeline';
import Customers from './pages/Customers';
import Complaints from './pages/Complaints';
import Complaints from './pages/Complaints';
import Testimonials from './pages/Testimonials';
import Blogs from './pages/Blogs';
import Analytics from './pages/Analytics';
import CustomerDetails from './pages/CustomerDetails'; // NEW PAGE

// Modals
import ShipModal from './components/modals/ShipModal';
import ProductModal from './components/modals/ProductModal';
import WarehouseModal from './components/modals/WarehouseModal';
import BlogModal from './components/modals/BlogModal';
import TestimonialModal from './components/modals/TestimonialModal';

// Hooks
// Hooks
import { useAuth } from './hooks/useAuth';
import { useProducts } from './hooks/useProducts';
import { useCustomers } from './hooks/useCustomers'; // NEW HOOK
import { useOrders } from './hooks/useOrders'; // New Hook
import { useWarehouses } from './hooks/useWarehouses'; // NEW HOOK
import SimpleToast, { toast } from './components/common/SimpleToast';

const App = () => {
  // --- Authentication State ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // --- Dashboard Navigation & UI State ---
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [reportTimeframe, setReportTimeframe] = useState('monthly');
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  // --- Data State ---
  const [inventory, setInventory] = useState([]); // Start empty for live data
  // const [orders, setOrders] = useState(INITIAL_ORDERS); // Replaced by useOrders hook
  const [refurbPipeline, setRefurbPipeline] = useState(INITIAL_REFURB);
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);

  // const [warehouses, setWarehouses] = useState(INITIAL_WAREHOUSES); // Replaced by hook
  const [customers, setCustomers] = useState([]); // Start empty for live data

  // --- Modals State ---
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isWHModalOpen, setWHModalOpen] = useState(false);
  const [isShipModalOpen, setShipModalOpen] = useState(false);
  const [isTestimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [isBlogModalOpen, setBlogModalOpen] = useState(false);

  // --- Target States for Actions ---
  const [shippingTargetOrder, setShippingTargetOrder] = useState(null);
  const [blogToEdit, setBlogToEdit] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);



  // --- Form States ---
  const [newWarehouse, setNewWarehouse] = useState({ name: '', address: '', location: '', manager: '', contact: '', stock: 0 });
  const [newTestimonial, setNewTestimonial] = useState({ customer: '', laptopId: '', rating: 5, comment: '' });
  const [blogForm, setBlogForm] = useState({ title: '', excerpt: '', content: '', author: '', status: 'Draft' });

  // --- Auth Hook ---
  const { handleLogin: apiLogin, handleLogout: apiLogout } = useAuth();

  // --- Product Hook ---
  const { fetchAll: fetchProducts, remove: removeProduct } = useProducts();
  const { fetchCustomers } = useCustomers();

  const { orders, fetchOrders } = useOrders(); // Init hook
  const { warehouses, fetchWarehouses, addWarehouse } = useWarehouses(); // Init Warehouse Hook

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          setIsLoggedIn(true);
          setAuthUser(user);
          setBlogForm(prev => ({ ...prev, author: user.name || user.email }));
        } catch (err) {
          console.error('Error parsing user data:', err);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    };

    checkAuth();
  }, []);

  // Fetch Inventory and Customers on Login
  useEffect(() => {
    if (isLoggedIn) {
      loadInventory();
      loadCustomers();

      loadOrders(); // Fetch orders
      loadWarehouses(); // Fetch warehouses
    }
  }, [isLoggedIn]);

  const loadInventory = async () => {
    const result = await fetchProducts();
    if (result.success) {
      // Extract products from nested API response
      // Structure seems to be: result.data (axios response body) -> data -> products
      let extractedProducts = [];
      if (result.data && result.data.data && Array.isArray(result.data.data.products)) {
        extractedProducts = result.data.data.products;
      } else if (result.data && Array.isArray(result.data.products)) {
        extractedProducts = result.data.products;
      } else if (result.data && Array.isArray(result.data)) {
        extractedProducts = result.data;
      }

      const products = extractedProducts;
      console.log("products array", products);

      // Map to match UI expected format if necessary
      const mappedInventory = products.map(p => ({
        id: p._id || p.id,
        brand: p.brand,
        model: p.name, // Mapping 'name' to 'model' for UI consistency
        ram: p.specifications?.ram || 'N/A',
        ssd: p.specifications?.storage || 'N/A',
        warehouseId: p.warehouseId,
        rating: p.rating || 0,
        count: p.stock || 0,
        price: p.basePrice || 0,
        originalData: p // Keep original for editing
      }));
      setInventory(mappedInventory);
    }
  };

  const loadOrders = async () => {
    await fetchOrders();
  };



  const loadWarehouses = async () => {
    await fetchWarehouses();
  };

  const loadCustomers = async () => {
    const result = await fetchCustomers();
    if (result.success) {
      // Map to UI format if needed
      const mappedCustomers = result.data.map(c => ({
        id: c._id,
        name: c.name,
        email: c.email,
        type: c.role === 'B2B_BUYER' ? 'B2B' : 'B2C',
        role: c.role, // Keep original role
        totalSpent: c.totalSpent || 0, // Use actual totalSpent from backend
        status: c.isVerified ? 'Verified' : 'Active', // Use verification status
        joinDate: c.createdAt,
        addresses: c.addresses || [],
        companyName: c.companyName,
        gstNumber: c.gstNumber,
        businessAddress: c.businessAddress,
        isVerified: c.isVerified,
        phone: c.addresses && c.addresses.length > 0 ? c.addresses[0].phone : null
      }));
      setCustomers(mappedCustomers);
    }
  };

  // --- Auth Handlers ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');

    const result = await apiLogin(loginForm.email, loginForm.password);

    if (result.success) {
      setIsLoggedIn(true);
      setAuthUser(result.data.user);
      setBlogForm(prev => ({ ...prev, author: result.data.user.name || result.data.user.email }));
      setLoginForm({ email: '', password: '' });
    } else {
      setAuthError(result.error || 'Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    apiLogout();
    setIsLoggedIn(false);
    setAuthUser(null);
    setActiveTab('dashboard');
    setLoginForm({ email: '', password: '' });
  };

  // --- Global Logic Helpers ---
  const MOCK_TODAY = new Date('2023-12-19');

  const filteredOrdersByTime = useMemo(() => {
    const dayLimit = reportTimeframe === 'weekly' ? 7 : 30;
    return orders.filter(order => {
      const orderDate = new Date(order.date);
      const diffTime = Math.abs(MOCK_TODAY - orderDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= dayLimit;
    });
  }, [orders, reportTimeframe]);

  const stats = useMemo(() => [
    { label: 'Total Revenue', value: `₹${orders.reduce((acc, curr) => acc + curr.total, 0).toLocaleString()}`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Active Warehouses', value: warehouses.length, icon: Warehouse, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'In Refurbish', value: `${refurbPipeline.length} Units`, icon: RefreshCcw, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Avg Rating', value: (testimonials.reduce((a, b) => a + b.rating, 0) / (testimonials.length || 1)).toFixed(1), icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  ], [orders, warehouses, refurbPipeline, testimonials]);

  const analyticsData = useMemo(() => {
    const b2bOrders = filteredOrdersByTime.filter(o => o.type === 'B2B');
    const b2cOrders = filteredOrdersByTime.filter(o => o.type === 'B2C');
    const totalVal = filteredOrdersByTime.reduce((acc, curr) => acc + curr.total, 0);
    const b2bVal = b2bOrders.reduce((acc, curr) => acc + curr.total, 0);
    const b2cVal = b2cOrders.reduce((acc, curr) => acc + curr.total, 0);
    return {
      b2b: { percentage: totalVal ? Math.round((b2bVal / totalVal) * 100) : 0, avg: b2bOrders.length ? Math.round(b2bVal / b2bOrders.length) : 0 },
      b2c: { percentage: totalVal ? Math.round((b2cVal / totalVal) * 100) : 0, avg: b2cOrders.length ? Math.round(b2cVal / b2cOrders.length) : 0 },
      totalValue: totalVal,
      growth: reportTimeframe === 'weekly' ? '+8.2%' : '+24.8%'
    };
  }, [filteredOrdersByTime, reportTimeframe]);

  // --- Handlers ---
  const handleProductCreated = async () => {
    await loadInventory(); // Refresh list
    setProductToEdit(null); // Reset edit state if used
  };

  const handleEditProduct = (item) => {
    // Convert mapped item back or pass originalData if available
    setProductToEdit(item.originalData || item);
    setAddModalOpen(true);
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const result = await removeProduct(id);
      if (result.success) {
        setInventory(prev => prev.filter(item => item.id !== id));
        alert('Product deleted successfully'); // Replace with Toast if available
      } else {
        alert('Failed to delete product: ' + result.error);
      }
    }
  };

  const handleAddWarehouse = async (e) => {
    e.preventDefault();
    const success = await addWarehouse(newWarehouse);
    if (success) {
      setWHModalOpen(false);
      setNewWarehouse({ name: '', address: '', location: '', manager: '', contact: '', stock: 0 });
    }
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    if (blogToEdit) {
      setBlogs(blogs.map(b => b.id === blogToEdit.id ? { ...blogForm, id: b.id, date: b.date } : b));
    } else {
      setBlogs([...blogs, { ...blogForm, id: `B-00${blogs.length + 1}`, date: new Date().toISOString().split('T')[0] }]);
    }
    setBlogModalOpen(false);
    setBlogToEdit(null);
  };

  const handleAddTestimonial = (e) => {
    e.preventDefault();
    setTestimonials([...testimonials, { ...newTestimonial, id: `T-00${testimonials.length + 1}`, laptopId: Number(newTestimonial.laptopId), date: new Date().toISOString().split('T')[0] }]);
    setTestimonialModalOpen(false);
  };

  const assignCourier = (courierName) => {
    // This logic needs to be updated to use the useOrders hook's update function if available
    // For now, it directly modifies the local 'orders' state which is managed by the hook.
    // A proper implementation would involve an `updateOrder` function from `useOrders`.
    // setOrders(prev => prev.map(order => order.id === shippingTargetOrder.id ? { ...order, courier: courierName, status: 'Shipped', tracking: `SR${Math.floor(Math.random() * 10000000)}` } : order));
    console.warn("Assign courier logic needs to be integrated with useOrders hook's update functionality.");
    setShipModalOpen(false);
  };

  const updateRefurbStage = (id) => {
    setRefurbPipeline(prev => prev.map(item => {
      if (item.id === id) {
        const currentIndex = STAGES.indexOf(item.stage);
        return { ...item, stage: STAGES[(currentIndex + 1) % STAGES.length] };
      }
      return item;
    }));
  };

  // --- Filtering ---
  const filteredInventory = inventory.filter(i =>
    (i.model && i.model.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (i.brand && i.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredCustomers = customers.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()));

  if (!isLoggedIn) {
    return (
      <Login
        handleLogin={handleLogin}
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        authError={authError}
      />
    );
  }

  // Handle Modal Close to reset edit state
  const handleModalClose = (isOpen) => {
    setAddModalOpen(isOpen);
    if (!isOpen) setProductToEdit(null);
  };

  return (
    <Layout
      isSidebarOpen={isSidebarOpen}
      setSidebarOpen={setSidebarOpen}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      handleLogout={handleLogout}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      authUser={authUser}
      setSelectedWarehouse={setSelectedWarehouse}
    >
      {activeTab === 'dashboard' && <Dashboard stats={stats} setActiveTab={setActiveTab} />}
      {activeTab === 'inventory' &&
        <Inventory
          filteredInventory={filteredInventory}
          setAddModalOpen={(val) => { setProductToEdit(null); setAddModalOpen(val); }}
          warehouses={warehouses}
          deleteProduct={deleteProduct}
          onEdit={handleEditProduct}
        />}
      {activeTab === 'warehouse' && <WarehousePage warehouses={warehouses} selectedWarehouse={selectedWarehouse} setSelectedWarehouse={setSelectedWarehouse} inventory={inventory} setWHModalOpen={setWHModalOpen} />}
      {activeTab === 'orders' && <Orders orders={orders} setShippingTargetOrder={setShippingTargetOrder} setShipModalOpen={setShipModalOpen} />}
      {activeTab === 'refurb' && <RefurbPipeline refurbPipeline={refurbPipeline} updateRefurbStage={updateRefurbStage} />}
      {activeTab === 'customers' &&
        <Customers
          filteredCustomers={filteredCustomers}
          onView={(customer) => {
            setSelectedCustomer(customer);
            setActiveTab('customer_details');
          }}
        />
      }
      {activeTab === 'customer_details' &&
        <CustomerDetails
          customer={selectedCustomer}
          onBack={() => setActiveTab('customers')}
        />
      }
      {activeTab === 'testimonials' && <Testimonials testimonials={testimonials} setTestimonialModalOpen={setTestimonialModalOpen} />}
      {activeTab === 'blogs' && <Blogs blogs={blogs} authUser={authUser} setBlogToEdit={setBlogToEdit} setBlogForm={setBlogForm} setBlogModalOpen={setBlogModalOpen} setBlogs={setBlogs} />}
      {activeTab === 'analytics' && <Analytics analyticsData={analyticsData} reportTimeframe={reportTimeframe} setReportTimeframe={setReportTimeframe} filteredOrdersByTime={filteredOrdersByTime} />}

      <SimpleToast />
      <ShipModal
        isOpen={isShipModalOpen}
        setShipModalOpen={setShipModalOpen}
        order={shippingTargetOrder}
        onSuccess={loadOrders}
      />
      <ProductModal
        isOpen={isAddModalOpen}
        setAddModalOpen={handleModalClose}
        onProductCreated={handleProductCreated}
        productToEdit={productToEdit} // NEW PROP
        warehouses={warehouses} // Pass warehouses
      />
      <WarehouseModal isOpen={isWHModalOpen} setWHModalOpen={setWHModalOpen} handleAddWarehouse={handleAddWarehouse} newWarehouse={newWarehouse} setNewWarehouse={setNewWarehouse} />
      <BlogModal isOpen={isBlogModalOpen} setBlogModalOpen={setBlogModalOpen} handleBlogSubmit={handleBlogSubmit} blogToEdit={blogToEdit} blogForm={blogForm} setBlogForm={setBlogForm} />
      <TestimonialModal isOpen={isTestimonialModalOpen} setTestimonialModalOpen={setTestimonialModalOpen} handleAddTestimonial={handleAddTestimonial} newTestimonial={newTestimonial} setNewTestimonial={setNewTestimonial} inventory={inventory} />
    </Layout>
  );
};

export default App;