import React, { useState } from 'react';
import { 
  useGetContactsQuery, 
  useDeleteContactMutation,
  useUpdateContactMutation 
} from '../../../features/api/apiSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMail, HiOutlineTrash, HiOutlineUser, HiOutlineCalendar, HiOutlineBadgeCheck } from 'react-icons/hi';
import { toast } from 'react-toastify';

const ContactList = () => {
  const [page, setPage] = useState(1);
  const { data: contactsData, isLoading } = useGetContactsQuery({ page, limit: 10 });
  const [deleteContact] = useDeleteContactMutation();
  const [updateContact] = useUpdateContactMutation();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteContact(id).unwrap();
        toast.success('Message deleted');
      } catch (err) {
        toast.error('Failed to delete message');
      }
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateContact({ id, status }).unwrap();
      toast.success(`Marked as ${status}`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-['Plus_Jakarta_Sans']">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Customer Enquiries</h2>
          <p className="text-gray-500 font-medium mt-1">Manage and respond to user communications</p>
        </div>
        <div className="bg-white px-8 py-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
           <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
           <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Total: {contactsData?.meta?.total_items || 0}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <AnimatePresence>
          {contactsData?.data?.length > 0 ? (
            contactsData.data.map((contact, index) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/30 transition-all duration-500 relative group overflow-hidden"
              >
                {/* Status Indicator */}
                <div className={`absolute top-0 left-0 w-2 h-full ${contact.status === 'resolved' ? 'bg-emerald-500' : 'bg-amber-500'}`} />

                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl text-xs font-black text-gray-600 border border-gray-100">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-indigo-600 shadow-sm">
                           <HiOutlineUser size={18} />
                        </div>
                        {contact.name}
                      </div>
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl text-xs font-black text-gray-600 border border-gray-100">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-rose-500 shadow-sm">
                           <HiOutlineMail size={18} />
                        </div>
                        {contact.email}
                      </div>
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl text-xs font-black text-gray-600 border border-gray-100 lg:ml-auto">
                        <HiOutlineCalendar size={18} className="text-gray-400" />
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">
                      {contact.subject || 'Inquiry Message'}
                    </h3>
                    <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-50 italic relative group">
                       <span className="text-4xl text-gray-100 absolute -top-4 -left-2 font-serif">"</span>
                       <p className="text-gray-600 font-medium leading-relaxed relative z-10 pl-2">
                        {contact.message}
                       </p>
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col items-center justify-end gap-4 shrink-0">
                    <button
                      onClick={() => handleStatusUpdate(contact._id, contact.status === 'resolved' ? 'pending' : 'resolved')}
                      className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-sm ${
                        contact.status === 'resolved' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                        : 'bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-100'
                      }`}
                    >
                      <HiOutlineBadgeCheck className="text-xl" />
                      {contact.status === 'resolved' ? 'Resolved' : 'Mark Resolved'}
                    </button>
                    
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="p-4 bg-rose-50 text-rose-500 rounded-2xl border border-rose-100 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                      title="Delete enquiry"
                    >
                      <HiOutlineTrash className="text-xl" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-200">
               <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-gray-200">
                  <HiOutlineMail size={48} />
               </div>
               <h3 className="text-2xl font-black text-gray-900">Inbox is empty</h3>
               <p className="text-gray-400 font-bold mt-2">No customer inquiries found at the moment</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {contactsData?.meta?.total_pages > 1 && (
        <div className="flex justify-center gap-3 mt-12">
           {[...Array(contactsData.meta.total_pages)].map((_, i) => (
             <button
               key={i}
               onClick={() => setPage(i + 1)}
               className={`w-14 h-14 rounded-2xl font-black text-sm transition-all ${
                 page === i + 1 
                 ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' 
                 : 'bg-white text-gray-400 hover:bg-gray-50 border border-gray-100'
               }`}
             >
               {i + 1}
             </button>
           ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
