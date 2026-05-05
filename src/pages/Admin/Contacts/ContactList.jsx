import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import { HiOutlineTrash } from "react-icons/hi";
import {
  MdClose,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdMail,
  MdOutlineAnalytics,
  MdSearch,
  MdVisibility,
} from "react-icons/md";
import { toast } from "react-toastify";
import {
  useDeleteContactMutation,
  useGetContactQuery,
  useGetContactsQuery,
} from "../../../features/api/apiSlice";

const InquiryDetailsModal = ({ inquiryId, isOpen, onClose }) => {
  const {
    data: inquiryData,
    isLoading,
    isError,
  } = useGetContactQuery(inquiryId, {
    skip: !inquiryId || !isOpen,
  });

  const inquiry = inquiryData?.data || inquiryData;

  if (!isOpen) return null;

  return createPortal(
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
        className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100"
      >
        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div>
            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">
              Message Analysis
            </p>
            <h3 className="text-xl font-black text-gray-900 tracking-tighter">
              Enquiry Details
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
                Accessing Intelligence...
              </p>
            </div>
          ) : inquiry ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Sender Identity
                  </p>
                  <p className="text-sm font-black text-gray-900">
                    {inquiry.first_name} {inquiry.last_name}
                  </p>
                  <p className="text-[11px] text-gray-400 font-medium">
                    {inquiry.email}
                  </p>
                  <p className="text-[10px] text-indigo-600 font-bold mt-1">
                    {inquiry.phone_number}
                  </p>
                </div>
                <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Timestamp
                  </p>
                  <p className="text-sm font-black text-gray-900">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-[11px] text-gray-400 font-medium">
                    {new Date(inquiry.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">
                  Inquiry Payload
                </p>
                <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-inner">
                  <p className="text-[13px] text-gray-600 font-medium leading-relaxed italic">
                    "{inquiry.message}"
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                    Reference ID
                  </p>
                  <p className="text-[10px] font-bold text-gray-900 mt-1 uppercase tracking-tight">
                    {inquiry.id}
                  </p>
                </div>
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shadow-inner border border-indigo-100">
                  <MdMail size={20} />
                </div>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-[10px]">
              No Intelligence Found
            </div>
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

const ContactList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedInquiryId, setSelectedInquiryId] = useState(null);

  const {
    data: contactsData,
    isLoading,
    isError,
  } = useGetContactsQuery(
    { page, limit: 10, search: search || undefined },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    },
  );

  const contacts = contactsData?.data || [];
  const meta = contactsData?.meta || {};

  const [deleteContact] = useDeleteContactMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Terminate this enquiry intelligence?")) {
      try {
        await deleteContact(id).unwrap();
        toast.success("Intelligence terminated");
      } catch (err) {
        toast.error("Termination failed");
      }
    }
  };

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
              Syncing Communications
            </p>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1 animate-pulse">
              Accessing Global Inbox...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 font-['Plus_Jakarta_Sans'] pb-20">
      <AnimatePresence>
        {selectedInquiryId && (
          <InquiryDetailsModal
            inquiryId={selectedInquiryId}
            isOpen={!!selectedInquiryId}
            onClose={() => setSelectedInquiryId(null)}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none">
            Inquiry Intelligence
          </h1>
          <p className="text-gray-400 text-[11px] font-bold mt-3 uppercase tracking-[0.3em]">
            Customer Communications Stream
          </p>
        </div>

        <div className="relative w-full lg:w-[450px] group">
          <MdSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors text-xl" />
          <input
            type="text"
            placeholder="Search inquiries, names..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-14 pr-6 py-4 rounded-3xl border-none bg-white shadow-[0_10px_40px_rgb(0,0,0,0.03)] ring-1 ring-gray-100 focus:ring-4 focus:ring-indigo-600/5 transition-all font-bold text-[13px] placeholder:text-gray-300"
          />
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            label: "Total Enquiries",
            value: meta.total_items || 0,
            icon: MdMail,
            color: "indigo",
          },
          {
            label: "Active Stream",
            value: meta.total_items || 0,
            icon: MdOutlineAnalytics,
            color: "emerald",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm group hover:shadow-2xl transition-all duration-700 relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-50/30 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-700`} />
            <div className="relative z-10 flex items-center gap-6">
              <div
                className={`w-16 h-16 bg-${stat.color}-50 rounded-2xl flex items-center justify-center text-${stat.color}-600 border border-${stat.color}-100 shadow-inner group-hover:scale-110 transition-transform duration-500`}
              >
                <stat.icon size={32} />
              </div>
              <div>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.25em] mb-1">
                  {stat.label}
                </p>
                <h4 className="text-3xl font-black text-gray-900 tracking-tighter">
                  {stat.value}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-[3rem] shadow-[0_30px_80px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#4F46E5] text-white text-[10px] font-black uppercase tracking-[0.3em]">
                <th className="px-10 py-6 first:rounded-tl-[3rem]">
                  Sender Identity
                </th>
                <th className="px-10 py-6">Communication Payload</th>
                <th className="px-10 py-6 text-center">Timestamp</th>
                <th className="px-10 py-6 text-right last:rounded-tr-[3rem]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {contacts.map((contact, idx) => (
                  <motion.tr
                    key={contact.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group hover:bg-indigo-50/20 transition-all duration-500"
                  >
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 bg-gray-900 text-white rounded-xl flex items-center justify-center font-black text-sm shadow-xl shadow-gray-200 group-hover:scale-110 transition-transform">
                          {(contact.first_name || "U").charAt(0)}
                        </div>
                        <div>
                          <p className="text-[14px] font-black text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {contact.first_name} {contact.last_name}
                          </p>
                          <p className="text-[11px] text-gray-400 font-bold mt-0.5">
                            {contact.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-7">
                      <p className="text-[13px] font-black text-gray-900 tracking-tight line-clamp-1 group-hover:text-indigo-900 transition-colors">
                        {contact.message}
                      </p>
                      <p className="text-[11px] text-gray-400 font-medium line-clamp-1 mt-1 italic">
                        {contact.phone_number}
                      </p>
                    </td>
                    <td className="px-10 py-7 text-center">
                      <p className="text-[11px] font-black text-gray-900">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                        {new Date(contact.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>
                    <td className="px-10 py-7 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => setSelectedInquiryId(contact.id)}
                          className="w-10 h-10 flex items-center justify-center text-indigo-600 bg-white border border-gray-100 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-90"
                          title="View Message"
                        >
                          <MdVisibility size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="w-10 h-10 flex items-center justify-center text-gray-400 bg-white border border-gray-100 rounded-xl hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all shadow-sm active:scale-90"
                          title="Delete"
                        >
                          <HiOutlineTrash size={20} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {contacts.length === 0 && (
          <div className="py-32 text-center bg-gray-50/30">
            <div className="w-24 h-24 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-8 text-gray-200">
              <MdMail size={48} className="opacity-10" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
              Inbox is Dormant
            </h3>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-2">
              No communications detected
            </p>
          </div>
        )}

        {/* Pagination */}
        {meta.total_pages > 1 && (
          <div className="p-10 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-8 bg-gray-50/20">
            <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.25em]">
              Synchronizing{" "}
              <span className="text-gray-900">
                {(page - 1) * meta.limit + 1} -{" "}
                {Math.min(page * meta.limit, meta.total_items)}
              </span>{" "}
              / {meta.total_items}
            </p>

            <div className="flex items-center gap-4">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-indigo-600 hover:border-indigo-600 transition-all disabled:opacity-30 shadow-sm active:scale-95"
              >
                <MdKeyboardArrowLeft size={26} />
              </button>
              <div className="flex items-center gap-2">
                {[...Array(meta.total_pages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-12 h-12 rounded-2xl font-black text-[12px] transition-all flex items-center justify-center ${
                      page === i + 1
                        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-110"
                        : "bg-white text-gray-400 border border-gray-100 hover:border-indigo-600 hover:text-indigo-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                disabled={page === meta.total_pages}
                onClick={() => setPage((p) => p + 1)}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-indigo-600 hover:border-indigo-600 transition-all disabled:opacity-30 shadow-sm active:scale-95"
              >
                <MdKeyboardArrowRight size={26} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;
