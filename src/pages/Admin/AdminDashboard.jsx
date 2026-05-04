import React, { useMemo } from 'react';
import { useGetAllOrdersQuery, useGetProductsQuery } from '../../features/api/apiSlice';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { MdTrendingUp, MdShoppingCart, MdInventory, MdPeople, MdArrowForward, MdLayers } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data: ordersData, isLoading: isOrdersLoading } = useGetAllOrdersQuery({ limit: 1000 });
  const { data: productsData, isLoading: isProductsLoading } = useGetProductsQuery({ limit: 1000 });

  const { stats, chartData, pieData, recentProducts } = useMemo(() => {
    let totalSales = 0;
    let activeOrders = 0;
    const uniqueCustomers = new Set();
    const salesByDate = {};

    // Initialize last 7 days with 0 to ensure the graph looks beautiful
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      salesByDate[label] = 0;
    }

    if (ordersData?.data) {
      ordersData.data.forEach((order) => {
        // Fix: API uses created_at not createdAt
        const dateStr = order.created_at || order.createdAt;
        if (!dateStr) return;

        const date = new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        if (order.status?.toLowerCase() !== 'cancelled') {
          const amount = Number(order.total_amount);
          if (!isNaN(amount)) {
            totalSales += amount;
            // Only add to chart if it's within our initialized range or just add it anyway
            salesByDate[date] = (salesByDate[date] || 0) + amount;
          }
        }

        const status = order.status?.toLowerCase() || '';
        if (['pending', 'processing'].includes(status)) {
          activeOrders += 1;
        }

        const customerId = order.user?._id || order.user?.email || order.user?.id;
        if (customerId) {
          uniqueCustomers.add(customerId);
        }
      });
    }

    const totalProducts = productsData?.meta?.total || productsData?.meta?.total_items || productsData?.data?.length || 0;
    const totalCustomers = uniqueCustomers.size;
    const totalOrders = ordersData?.meta?.total || ordersData?.meta?.total_items || ordersData?.data?.length || 0;

    // Convert salesByDate object to sorted array for Recharts
    const formattedSalesData = Object.keys(salesByDate)
      .map(date => ({ name: date, sales: salesByDate[date] }))
      .sort((a, b) => new Date(a.name) - new Date(b.name))
      .slice(-7); // Keep last 7 days

    const formattedPieData = [
      { name: 'Total Orders', value: totalOrders, color: '#6366f1' },
      { name: 'Total Customers', value: totalCustomers, color: '#f43f5e' }
    ];

    const latestProducts = productsData?.data ? [...productsData.data].reverse().slice(0, 5) : [];

    return {
      stats: [
        { title: 'Total Revenue', value: `$${totalSales.toLocaleString()}`, icon: <MdTrendingUp />, color: 'text-white', bg: 'bg-gradient-to-br from-indigo-600 to-violet-700', shadow: 'shadow-indigo-200' },
        { title: 'Active Orders', value: activeOrders.toString(), icon: <MdShoppingCart />, color: 'text-white', bg: 'bg-gradient-to-br from-rose-500 to-pink-600', shadow: 'shadow-rose-200' },
        { title: 'Total Products', value: totalProducts.toString(), icon: <MdInventory />, color: 'text-white', bg: 'bg-gradient-to-br from-emerald-500 to-teal-600', shadow: 'shadow-emerald-200' },
        { title: 'Total Customers', value: totalCustomers.toString(), icon: <MdPeople />, color: 'text-white', bg: 'bg-gradient-to-br from-amber-500 to-orange-600', shadow: 'shadow-amber-200' },
      ],
      chartData: formattedSalesData,
      pieData: formattedPieData,
      recentProducts: latestProducts
    };
  }, [ordersData, productsData]);

  if (isOrdersLoading || isProductsLoading) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-black animate-pulse uppercase tracking-[0.2em] text-[10px]">Assembling Business Intelligence...</p>
        </div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-12 font-['Plus_Jakarta_Sans']"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <motion.div 
            variants={item}
            key={stat.title} 
            className={`${stat.bg} p-8 rounded-[2.5rem] shadow-2xl ${stat.shadow} relative overflow-hidden group hover:-translate-y-2 transition-all duration-500`}
          >
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
               <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md text-white text-2xl">
                    {stat.icon}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/60 bg-white/10 px-3 py-1 rounded-full">
                     Live
                  </div>
               </div>
               <p className="text-sm text-white/70 font-bold uppercase tracking-wider">{stat.title}</p>
               <h3 className="text-3xl font-black mt-1 text-white tracking-tighter">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <motion.div variants={item} className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-50/50 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none transition-all group-hover:rotate-12 duration-700">
             <MdTrendingUp size={180} />
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 relative z-10 gap-6">
            <div>
              <h3 className="text-3xl font-black text-gray-900 tracking-tight">Revenue Analytics</h3>
              <p className="text-sm text-gray-400 mt-1 font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
                Real-time performance monitoring
              </p>
            </div>
            <div className="flex items-center gap-3 bg-gray-900 px-6 py-3 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-xl shadow-gray-200">
               Market Trends
            </div>
          </div>
          
          <div className="h-[400px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 800 }}
                  dy={15}
                />
                <YAxis 
                  domain={[0, 'auto']}
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 800 }}
                />
                <Tooltip 
                  cursor={{ stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '4 4' }}
                  contentStyle={{ 
                    borderRadius: '24px', 
                    border: 'none', 
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)',
                    padding: '24px',
                    backgroundColor: '#fff'
                  }} 
                  itemStyle={{ fontSize: '14px', fontWeight: '900', color: '#111827' }}
                  labelStyle={{ fontSize: '10px', fontWeight: '900', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#6366f1" 
                  strokeWidth={5}
                  dot={{ r: 6, fill: '#fff', stroke: '#6366f1', strokeWidth: 3 }}
                  activeDot={{ r: 8, fill: '#6366f1', stroke: '#fff', strokeWidth: 3 }}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
             <MdPeople size={150} />
          </div>
          <div className="mb-12 w-full text-left">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Orders vs Customers</h3>
            <p className="text-sm text-gray-400 mt-1 font-bold">Distribution overview</p>
          </div>
          <div className="h-[350px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    padding: '15px'
                  }} 
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                  formatter={(value) => <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-2">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-10 p-8 bg-indigo-50 rounded-[2.5rem] w-full relative overflow-hidden border border-indigo-100 group cursor-pointer hover:bg-indigo-600 transition-colors duration-500">
             <div className="relative z-10 flex items-center justify-between">
                <div>
                   <p className="text-[10px] font-black text-indigo-400 group-hover:text-indigo-200 uppercase tracking-widest transition-colors">Business Health</p>
                   <p className="text-2xl font-black mt-1 text-indigo-900 group-hover:text-white transition-colors">Scale Mode</p>
                </div>
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-xl shadow-indigo-100 group-hover:scale-110 transition-transform">
                   <MdTrendingUp size={24} />
                </div>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Products Section */}
      <motion.div variants={item} className="bg-white rounded-[3.5rem] p-12 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
           <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-inner border border-emerald-100">
                 <MdLayers />
              </div>
              <div>
                 <h3 className="text-3xl font-black text-gray-900 tracking-tight">Catalog Intelligence</h3>
                 <p className="text-sm text-gray-400 font-bold mt-1 uppercase tracking-[0.15em]">Showing latest 5 of {stats[2].value} products</p>
              </div>
           </div>
           <button 
             onClick={() => navigate('/admin/products')}
             className="flex items-center gap-3 bg-gray-50 hover:bg-gray-900 hover:text-white px-8 py-4 rounded-2xl transition-all duration-300 font-black text-xs uppercase tracking-widest border border-gray-100 hover:shadow-xl hover:shadow-gray-200"
           >
             Full Inventory <MdArrowForward size={18} />
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-[10px] uppercase font-black tracking-[0.2em] border-b border-gray-50">
                <th className="px-6 py-4">Product Info</th>
                <th className="px-6 py-4">Stock Status</th>
                <th className="px-6 py-4 text-center">Pricing</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {recentProducts.map((product, idx) => (
                  <motion.tr 
                    key={product.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group hover:bg-gray-50/50 transition-all duration-300"
                  >
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gray-100 shadow-sm group-hover:scale-105 transition-transform">
                           <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                           <p className="text-base font-black text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{product.name}</p>
                           <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{product.brand?.name || 'Generic'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                       <div className="flex flex-col gap-1">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${product.stock > 10 ? 'text-emerald-500' : 'text-rose-500'}`}>
                             {product.stock > 10 ? 'In Stock' : 'Low Stock'}
                          </span>
                          <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                             <div className={`h-full ${product.stock > 10 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${Math.min(product.stock, 100)}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-400 font-bold">{product.stock} Units Available</span>
                       </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                       <div className="flex flex-col">
                          <span className="text-lg font-black text-gray-900">${product.discount_price || product.price}</span>
                          {product.discount_price && <span className="text-[10px] text-gray-400 line-through font-bold">${product.price}</span>}
                       </div>
                    </td>
                    <td className="px-6 py-6 text-right">
                       <button 
                         onClick={() => navigate(`/admin/products/view/${product.id}`)}
                         className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm group-hover:shadow-indigo-100"
                       >
                          <MdArrowForward size={20} />
                       </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
