import React, { useState } from 'react';
import { MdVisibility, MdPrint, MdSearch, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useGetAllOrdersQuery } from '../../../features/api/apiSlice';
import moment from 'moment';

const OrderList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data: ordersData, isLoading, isError } = useGetAllOrdersQuery({
    page,
    limit: 10,
    search: search || undefined,
  });

  if (isLoading) return <div className="p-10 text-center">Loading orders...</div>;

  const orders = ordersData?.data || [];
  const meta = ordersData?.meta || {};

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Order Management</h2>
          <p className="text-sm text-gray-500 mt-1">Monitor and manage all customer orders</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative max-w-md w-full">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input 
            type="text" 
            placeholder="Search by customer name..."
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // Reset to first page on search
            }}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:border-black focus:outline-none transition-all bg-white shadow-inner"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-gray-100">
              <th className="px-8 py-5 font-bold">Order ID</th>
              <th className="px-8 py-5 font-bold">Customer</th>
              <th className="px-8 py-5 font-bold">Date</th>
              <th className="px-8 py-5 font-bold">Total</th>
              <th className="px-8 py-5 font-bold">Status</th>
              <th className="px-8 py-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order.id} className="group hover:bg-gray-50 transition-all duration-300">
                <td className="px-8 py-5">
                  <span className="font-mono text-sm font-black text-gray-400 group-hover:text-black">
                    #{order.id.slice(-8).toUpperCase()}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-800">{order.user?.name || 'Unknown'}</span>
                    <span className="text-xs text-gray-400">{order.user?.email}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-gray-600 text-sm font-medium">
                  {moment(order.created_at).format('MMM DD, YYYY')}
                </td>
                <td className="px-8 py-5">
                  <span className="font-black text-gray-900">${order.total_amount.toFixed(2)}</span>
                </td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${getStatusColor(order.status || 'Pending')}`}>
                    {order.status || 'Pending'}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100" title="View Details">
                      <MdVisibility size={20} />
                    </button>
                    <button className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-all border border-transparent hover:border-gray-200" title="Print Invoice">
                      <MdPrint size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="6" className="px-8 py-20 text-center text-gray-400 font-medium italic">
                  {search ? 'No orders match your search.' : 'No orders found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta.total_pages > 1 && (
        <div className="p-8 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
          <p className="text-sm text-gray-500 font-medium">
            Showing <span className="text-black font-bold">{(page - 1) * meta.limit + 1}</span> to <span className="text-black font-bold">{Math.min(page * meta.limit, meta.total_items)}</span> of <span className="text-black font-bold">{meta.total_items}</span> results
          </p>
          <div className="flex gap-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="p-2 rounded-xl border border-gray-200 hover:bg-white hover:border-black transition-all disabled:opacity-30 disabled:hover:border-gray-200"
            >
              <MdKeyboardArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-1">
              {[...Array(meta.total_pages)].map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-xl font-bold transition-all ${page === i + 1 ? 'bg-black text-white shadow-lg shadow-black/20' : 'hover:bg-white border border-transparent hover:border-gray-200 text-gray-500'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              disabled={page === meta.total_pages}
              onClick={() => setPage(p => p + 1)}
              className="p-2 rounded-xl border border-gray-200 hover:bg-white hover:border-black transition-all disabled:opacity-30 disabled:hover:border-gray-200"
            >
              <MdKeyboardArrowRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
