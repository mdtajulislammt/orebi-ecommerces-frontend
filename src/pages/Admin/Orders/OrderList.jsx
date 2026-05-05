import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  MdClose,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineAnalytics,
  MdOutlinePayments,
  MdOutlineShoppingBag,
  MdSearch,
  MdVisibility,
} from "react-icons/md";
import {
  useGetAllOrdersQuery,
  useGetOrderQuery,
} from "../../../features/api/apiSlice";

const OrderDetailsModal = ({ orderId, isOpen, onClose }) => {
  const { data: orderData, isLoading } = useGetOrderQuery(orderId, {
    skip: !orderId,
  });
  const order = orderData?.data;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
          <div>
            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">
              Transaction Details
            </p>
            <h3 className="text-xl font-black text-gray-900 tracking-tighter">
              Order #{orderId?.slice(-6).toUpperCase()}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white text-gray-400 rounded-xl flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-all shadow-sm border border-gray-100 active:scale-95"
          >
            <MdClose size={20} />
          </button>
        </div>

        <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Loading Intelligence...
              </p>
            </div>
          ) : order ? (
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Customer
                  </p>
                  <p className="text-sm font-black text-gray-900">
                    {order.user?.name}
                  </p>
                  <p className="text-[11px] text-gray-400 font-medium">
                    {order.user?.email}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Order Status
                  </p>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                    <span className="w-1 h-1 rounded-full bg-white animate-pulse"></span>
                    {order.status}
                  </span>
                  <p className="text-[10px] text-gray-400 font-medium mt-1">
                    Placed on {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">
                  Itemized Manifest
                </p>
                <div className="space-y-3">
                  {order.items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:shadow-gray-100 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 group-hover:scale-105 transition-transform">
                          <img
                            src={item.product?.thumbnail}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-black text-gray-900 tracking-tight">
                            {item.product?.name}
                          </p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                            Qty: {item.quantity} × ${item.unit_price}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-black text-gray-900 tracking-tighter">
                        ${(item.quantity * item.unit_price).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                    Total Amount
                  </p>
                  <p className="text-2xl font-black text-gray-900 tracking-tighter">
                    ${Number(order.total_amount).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                      Payment
                    </p>
                    <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">
                      Confirmed
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center shadow-inner border border-emerald-100">
                    <MdOutlinePayments size={20} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-[10px]">
              No Order Data Found
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const OrderList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const { data: ordersData, isLoading } = useGetAllOrdersQuery({
    page,
    limit: 10,
    search: search || undefined,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-indigo-100 rounded-full"></div>
            <div className="absolute top-0 left-0 w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-center">
            <p className="text-gray-900 font-black text-lg tracking-tighter">
              Synchronizing Intelligence
            </p>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1 animate-pulse">
              Accessing Global Order Stream...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const orders = ordersData?.data || [];
  const meta = ordersData?.meta || {};
  const totalRevenue = orders.reduce(
    (acc, curr) => acc + (Number(curr.total_amount) || 0),
    0,
  );

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-emerald-50 text-emerald-600 border-emerald-100 ring-emerald-500/10";
      case "pending":
        return "bg-amber-50 text-amber-600 border-amber-100 ring-amber-500/10";
      case "processing":
        return "bg-blue-50 text-blue-600 border-blue-100 ring-blue-500/10";
      case "cancelled":
        return "bg-rose-50 text-rose-600 border-rose-100 ring-rose-500/10";
      case "shipped":
        return "bg-indigo-50 text-indigo-600 border-indigo-100 ring-indigo-500/10";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100 ring-gray-500/10";
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 font-['Plus_Jakarta_Sans'] pb-20">
      <AnimatePresence>
        {selectedOrderId && (
          <OrderDetailsModal
            orderId={selectedOrderId}
            isOpen={!!selectedOrderId}
            onClose={() => setSelectedOrderId(null)}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-none">
            Order Intelligence
          </h1>
          <p className="text-gray-400 text-[11px] font-bold mt-2 uppercase tracking-widest">
            Logistics & Stream Analysis
          </p>
        </div>

        <div className="relative w-full lg:w-96 group">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors text-lg" />
          <input
            type="text"
            placeholder="Search orders, customers..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-11 pr-5 py-3 rounded-2xl border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-100 focus:ring-4 focus:ring-indigo-600/5 transition-all font-bold text-xs placeholder:text-gray-300"
          />
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Revenue",
            value: `$${totalRevenue.toLocaleString()}`,
            icon: MdOutlinePayments,
            color: "indigo",
          },
          {
            label: "Orders Count",
            value: meta.total_items || "0",
            icon: MdOutlineShoppingBag,
            color: "rose",
          },
          {
            label: "Unique Reach",
            value: orders.length,
            icon: MdOutlineAnalytics,
            color: "emerald",
          },
          {
            label: "Success Rate",
            value: "98.4%",
            icon: MdOutlineAnalytics,
            color: "amber",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm group hover:shadow-xl transition-all duration-500 relative overflow-hidden"
          >
            <div className="relative z-10">
              <div
                className={`w-9 h-9 bg-${stat.color}-50 rounded-xl flex items-center justify-center text-${stat.color}-600 mb-3 border border-${stat.color}-100 shadow-inner`}
              >
                <stat.icon size={18} />
              </div>
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-0.5">
                {stat.label}
              </p>
              <h4 className="text-lg font-black text-gray-900 tracking-tighter">
                {stat.value}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white text-[12px] font-black uppercase tracking-[0.3em]">
                <th className="px-8 py-5 first:rounded-tl-[2.5rem]">
                  Reference ID
                </th>
                <th className="px-8 py-5">Customer Identity</th>
                <th className="px-8 py-5 text-center">Amount</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right last:rounded-tr-[2.5rem]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {orders.map((order, idx) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 5 }}
                    transition={{ delay: idx * 0.03 }}
                    className="group hover:bg-indigo-50/10 transition-all duration-300"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-indigo-600 transition-all shadow-inner border border-gray-100 font-mono text-[9px] font-black group-hover:shadow-lg group-hover:border-indigo-100">
                          #{order.id.slice(-4).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-[12px] font-black text-gray-900 tracking-tight">
                            Identity Ref
                          </p>
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 bg-gray-900 text-white rounded-lg flex items-center justify-center font-black text-xs shadow-lg shadow-gray-200">
                          {(order.user?.name || "U").charAt(0)}
                        </div>
                        <div>
                          <p className="text-[12px] font-black text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {order.user?.name || "Anonymous"}
                          </p>
                          <p className="text-[10px] text-gray-400 font-bold">
                            {order.user?.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-base font-black text-gray-900 tracking-tighter">
                        ${Number(order.total_amount).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.15em] border ring-4 transition-all ${getStatusStyle(order.status || "Pending")}`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={() => setSelectedOrderId(order.id)}
                        className="p-2.5 text-indigo-600 bg-white border border-gray-100 rounded-xl hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm active:scale-95 group/btn"
                      >
                        <MdVisibility size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {orders.length === 0 && (
          <div className="py-24 text-center bg-gray-50/20">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-6 text-gray-200">
              <MdOutlineShoppingBag size={40} className="opacity-10" />
            </div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">
              No Streams Detected
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
              Check your current filters
            </p>
          </div>
        )}

        {/* Pagination */}
        {meta.total_pages > 1 && (
          <div className="p-8 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gray-50/10">
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">
              Showing{" "}
              <span className="text-gray-900">
                {(page - 1) * meta.limit + 1} -{" "}
                {Math.min(page * meta.limit, meta.total_items)}
              </span>{" "}
              / {meta.total_items}
            </p>

            <div className="flex items-center gap-3">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-indigo-600 transition-all disabled:opacity-30 shadow-sm"
              >
                <MdKeyboardArrowLeft size={22} />
              </button>
              <div className="flex items-center gap-1.5">
                {[...Array(meta.total_pages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-xl font-black text-[10px] transition-all flex items-center justify-center ${
                      page === i + 1
                        ? "bg-gray-900 text-white shadow-xl scale-105"
                        : "bg-white text-gray-400 border border-gray-100 hover:border-indigo-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                disabled={page === meta.total_pages}
                onClick={() => setPage((p) => p + 1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-400 hover:text-indigo-600 transition-all disabled:opacity-30 shadow-sm"
              >
                <MdKeyboardArrowRight size={22} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
