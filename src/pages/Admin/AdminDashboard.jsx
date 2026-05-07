import React, { useMemo } from 'react';
import { useGetAllOrdersQuery, useGetProductsQuery } from '../../features/api/apiSlice';
/* 
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
*/
const AreaChart = () => null;
const Area = () => null;
const XAxis = () => null;
const YAxis = () => null;
const CartesianGrid = () => null;
const Tooltip = () => null;
const ResponsiveContainer = ({ children }) => <div>{children}</div>;
const PieChart = () => null;
const Pie = () => null;
const Cell = () => null;
const Legend = () => null;
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

    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      salesByDate[label] = 0;
    }

    if (ordersData?.data) {
      ordersData.data.forEach((order) => {
        const dateStr = order.created_at || order.createdAt;
        if (!dateStr) return;
        const date = new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        if (order.status?.toLowerCase() !== 'cancelled') {
          const amount = Number(order.total_amount);
          if (!isNaN(amount)) {
            totalSales += amount;
            salesByDate[date] = (salesByDate[date] || 0) + amount;
          }
        }
        if (['pending', 'processing'].includes(order.status?.toLowerCase())) activeOrders += 1;
        const customerId = order.user?._id || order.user?.email || order.user?.id;
        if (customerId) uniqueCustomers.add(customerId);
      });
    }

    const totalProducts = productsData?.meta?.total || productsData?.meta?.total_items || productsData?.data?.length || 0;
    const totalCustomers = uniqueCustomers.size;
    const totalOrders = ordersData?.meta?.total || ordersData?.meta?.total_items || ordersData?.data?.length || 0;

    const formattedSalesData = Object.keys(salesByDate)
      .map(date => ({ name: date, sales: salesByDate[date] }))
      .sort((a, b) => new Date(a.name) - new Date(b.name))
      .slice(-7);

    const formattedPieData = [
      { name: 'Total Orders', value: totalOrders, color: '#6366f1' },
      { name: 'Total Customers', value: totalCustomers, color: '#f43f5e' }
    ];

    const latestProducts = productsData?.data ? [...productsData.data].reverse().slice(0, 5) : [];

    return {
      stats: [
        { title: 'Total Revenue', value: `$${totalSales.toLocaleString()}`, icon: <MdTrendingUp />, bg: 'bg-gradient-to-br from-indigo-500 to-indigo-700', shadow: 'shadow-indigo-100' },
        { title: 'Active Orders', value: activeOrders.toString(), icon: <MdShoppingCart />, bg: 'bg-gradient-to-br from-rose-400 to-rose-600', shadow: 'shadow-rose-100' },
        { title: 'Total Products', value: totalProducts.toString(), icon: <MdInventory />, bg: 'bg-gradient-to-br from-emerald-400 to-emerald-600', shadow: 'shadow-emerald-100' },
        { title: 'Total Customers', value: totalCustomers.toString(), icon: <MdPeople />, bg: 'bg-gradient-to-br from-amber-400 to-amber-600', shadow: 'shadow-amber-100' },
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
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-bold animate-pulse uppercase tracking-[0.2em] text-[9px]">Synchronizing Analytics...</p>
        </div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 font-['Plus_Jakarta_Sans']">
      {/* Stats Grid - Smaller Fonts, More Compact */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div 
            variants={item}
            key={stat.title} 
            className={`${stat.bg} p-6 rounded-[1.8rem] shadow-xl ${stat.shadow} relative overflow-hidden group hover:-translate-y-1 transition-all duration-300`}
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
            <div className="relative z-10 flex flex-col justify-between h-full">
               <div className="flex items-center justify-between mb-6">
                  <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-md text-white text-xl">
                    {stat.icon}
                  </div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-white/60 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                     Live
                  </div>
               </div>
               <div>
                  <p className="text-[10px] text-white/70 font-black uppercase tracking-widest leading-none">{stat.title}</p>
                  <h3 className="text-2xl font-black mt-2 text-white tracking-tight">{stat.value}</h3>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart - Cleaner, Sharper */}
        <motion.div variants={item} className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none group-hover:rotate-6 transition-transform duration-700">
             <MdTrendingUp size={150} />
          </div>
          
          <div className="flex items-center justify-between mb-10 relative z-10">
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Revenue Analytics</h3>
              <p className="text-[11px] text-gray-400 mt-1 font-bold flex items-center gap-2 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
                Performance Monitoring
              </p>
            </div>
            <div className="bg-gray-900 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-gray-200 cursor-default">
               Insights
            </div>
          </div>
          
          <div className="h-[340px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#cbd5e1', fontSize: 10, fontWeight: 700 }} dy={10} />
                <YAxis domain={[0, 'auto']} axisLine={false} tickLine={false} tick={{ fill: '#cbd5e1', fontSize: 10, fontWeight: 700 }} />
                <Tooltip 
                  cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', padding: '16px' }} 
                  itemStyle={{ fontSize: '12px', fontWeight: '800', color: '#1e293b' }}
                  labelStyle={{ fontSize: '9px', fontWeight: '800', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}
                />
                <Area 
                  type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={4} 
                  dot={{ r: 4, fill: '#fff', stroke: '#6366f1', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
                  fill="url(#colorSales)" animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Distribution Pie - Refined */}
        <motion.div variants={item} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="mb-10 w-full">
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Distribution</h3>
            <p className="text-[11px] text-gray-400 mt-1 font-bold uppercase tracking-wide">Orders vs Customers</p>
          </div>
          <div className="h-[280px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={8} dataKey="value" animationDuration={1000}>
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={4} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} />
                <Legend verticalAlign="bottom" height={30} iconType="circle" formatter={(v) => <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 p-6 bg-gray-50 rounded-[1.5rem] w-full border border-gray-100/50 group cursor-default">
             <div className="flex items-center justify-between">
                <div>
                   <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Health Index</p>
                   <p className="text-lg font-black mt-0.5 text-gray-900">Optimized</p>
                </div>
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                   <MdTrendingUp size={20} />
                </div>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Catalog Table - Sharper Fonts, Better Contrast */}
      <motion.div variants={item} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl border border-emerald-100">
                 <MdLayers size={22} />
              </div>
              <div>
                 <h3 className="text-xl font-black text-gray-900 tracking-tight">Catalog Intelligence</h3>
                 <p className="text-[10px] text-gray-400 font-bold mt-0.5 uppercase tracking-widest">Latest Inventory Overview</p>
              </div>
           </div>
           <button 
             onClick={() => navigate('/admin/products')}
             className="bg-gray-900 text-white px-6 py-3 rounded-xl transition-all hover:bg-indigo-600 font-black text-[9px] uppercase tracking-widest shadow-xl shadow-gray-200"
           >
             Manage Inventory
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-[9px] uppercase font-black tracking-widest border-b border-gray-50">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Stock Level</th>
                <th className="px-6 py-4 text-center">Price</th>
                <th className="px-6 py-4 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {recentProducts.map((p, idx) => (
                  <motion.tr key={p.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.04 }} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 group-hover:scale-105 transition-transform">
                           <img src={p.thumbnail} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                           <p className="text-[13px] font-black text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{p.name}</p>
                           <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{p.brand?.name || 'Generic'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                       <div className="flex flex-col gap-1.5">
                          <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                             <div className={`h-full ${p.stock > 10 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${Math.min(p.stock, 100)}%` }}></div>
                          </div>
                          <span className="text-[10px] text-gray-500 font-bold tracking-tight">{p.stock} Units</span>
                       </div>
                    </td>
                    <td className="px-6 py-5 text-center font-black text-gray-900 text-[14px]">
                       ${p.discount_price || p.price}
                    </td>
                    <td className="px-6 py-5 text-right">
                       <button onClick={() => navigate(`/admin/products/view/${p.id}`)} className="p-3 text-gray-400 hover:text-indigo-600 transition-all">
                          <MdArrowForward size={18} />
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
