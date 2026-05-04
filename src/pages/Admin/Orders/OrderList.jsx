import { useState } from 'react';
import { 
  MdKeyboardArrowLeft, 
  MdKeyboardArrowRight, 
  MdPrint, 
  MdSearch, 
  MdVisibility,
  MdFilterList,
  MdMoreVert,
  MdShoppingCart
} from 'react-icons/md';
import { useGetAllOrdersQuery } from '../../../features/api/apiSlice';
import { motion, AnimatePresence } from 'framer-motion';

const OrderList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data: ordersData, isLoading } = useGetAllOrdersQuery({
    page,
    limit: 10,
    search: search || undefined,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-bold animate-pulse">Syncing Orders...</p>
        </div>
      </div>
    );
  }

  const orders = ordersData?.data || [];
  const meta = ordersData?.meta || {};

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'processing': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'shipped': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="space-y-8 font-['Plus_Jakarta_Sans']">
      {/* Header & Search */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Order Management</h2>
          <p className="text-gray-500 font-medium mt-1">Track and manage customer transactions</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
          <div className="relative w-full sm:w-96 group">
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors text-xl" />
            <input 
              type="text" 
              placeholder="Search by customer name..."
              value={search}
              onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
              }}
              className="w-full pl-12 pr-6 py-4 rounded-[1.25rem] border-none bg-white shadow-sm ring-1 ring-gray-100 focus:ring-2 focus:ring-indigo-600 transition-all font-bold text-sm"
            />
          </div>
          <button className="p-4 bg-white rounded-[1.25rem] shadow-sm ring-1 ring-gray-100 hover:bg-gray-50 transition-all text-gray-600">
             <MdFilterList size={22} />
          </button>
        </div>
      </div>

      {/* Stats Quick View (Added for professional feel) */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-indigo-600 p-6 rounded-[2rem] shadow-xl shadow-indigo-100 text-white flex items-center justify-between overflow-hidden relative">
            <div className="relative z-10">
               <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest">New Orders</p>
               <h4 className="text-3xl font-black mt-1">12</h4>
            </div>
            <MdShoppingCart size={80} className="absolute -right-4 -bottom-4 text-indigo-500/50 rotate-12" />
         </div>
         <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
               <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Processing</p>
               <h4 className="text-3xl font-black text-gray-900 mt-1">08</h4>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center">
               <MdVisibility size={24} />
            </div>
         </div>
         <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
               <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Delivered</p>
               <h4 className="text-3xl font-black text-gray-900 mt-1">45</h4>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
               <MdPrint size={24} />
            </div>
         </div>
      </div> */}

      {/* Orders Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em] border-b border-gray-50">
                <th className="px-10 py-6">Order Details</th>
                <th className="px-10 py-6">Customer</th>
                <th className="px-10 py-6 text-center">Amount</th>
                <th className="px-10 py-6 text-center">Status</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {orders.map((order, idx) => (
                  <motion.tr 
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group hover:bg-gray-50/50 transition-all duration-300"
                  >
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all font-mono text-xs font-bold">
                           #{order.id.slice(-4).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-900">Order Ref</p>
                          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                            {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-black text-sm">
                          {(order.user?.name || 'U').charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-900 group-hover:text-indigo-600 transition-colors">{order.user?.name || 'Anonymous'}</p>
                          <p className="text-xs text-gray-400 font-medium">{order.user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <span className="text-base font-black text-gray-900">${order.total_amount.toLocaleString()}</span>
                    </td>
                    <td className="px-10 py-6 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all ${getStatusStyle(order.status || 'Pending')}`}>
                        {order.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-3 text-indigo-600 bg-indigo-50/50 border border-indigo-100 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm" title="View Details">
                          <MdVisibility size={20} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="py-24 text-center">
             <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-gray-200">
                <MdShoppingCart size={40} />
             </div>
             <h3 className="text-xl font-black text-gray-900">No Orders Found</h3>
             <p className="text-gray-400 font-bold mt-1">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Pagination */}
        {meta.total_pages > 1 && (
          <div className="p-10 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gray-50/20">
            <p className="text-sm text-gray-400 font-bold">
              Showing <span className="text-gray-900">{(page - 1) * meta.limit + 1} - {Math.min(page * meta.limit, meta.total_items)}</span> of {meta.total_items}
            </p>
            <div className="flex gap-3">
              <button 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-gray-100 hover:border-indigo-600 transition-all disabled:opacity-30"
              >
                <MdKeyboardArrowLeft size={24} />
              </button>
              <div className="flex items-center gap-2">
                {[...Array(meta.total_pages)].map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-12 h-12 rounded-2xl font-black text-sm transition-all ${
                      page === i + 1 
                      ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' 
                      : 'bg-white text-gray-400 border border-gray-100 hover:border-indigo-600'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button 
                disabled={page === meta.total_pages}
                onClick={() => setPage(p => p + 1)}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-gray-100 hover:border-indigo-600 transition-all disabled:opacity-30"
              >
                <MdKeyboardArrowRight size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;

