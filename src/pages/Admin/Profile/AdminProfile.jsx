import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetMeQuery, useUpdateUserMutation } from '../../../features/api/apiSlice';
import { setCredentials } from '../../../features/auth/authSlice';
import { motion } from 'framer-motion';
import { MdPerson, MdEmail, MdPhone, MdCameraAlt, MdCheckCircle, MdSecurity, MdHistory } from 'react-icons/md';
import { toast } from 'react-toastify';

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: userData, refetch } = useGetMeQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const user = userData?.data || userInfo;

  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    avatar: null
  });
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone_number: user.phone_number || '',
        avatar: null
      });
      setPreview(user.avatar_url || '');
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone_number', formData.phone_number);
    if (formData.avatar) {
      data.append('avatar', formData.avatar);
    }

    try {
      const res = await updateUser(data).unwrap();
      dispatch(setCredentials({ ...res.data }));
      toast.success('Profile updated successfully');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update profile');
    }
  };

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
      className="space-y-10 font-['Plus_Jakarta_Sans']"
    >
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Profile Card */}
        <motion.div variants={item} className="w-full lg:w-1/3 space-y-8">
           <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 flex flex-col items-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-600 to-violet-700 opacity-10 group-hover:opacity-20 transition-all duration-700"></div>
              
              <div className="relative z-10 mt-10">
                <div className="w-40 h-40 rounded-[3rem] bg-indigo-50 border-8 border-white shadow-2xl relative overflow-hidden group/img">
                   {preview ? (
                     <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-4xl font-black text-indigo-300">
                        {user?.name?.charAt(0).toUpperCase()}
                     </div>
                   )}
                   <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/img:opacity-100 cursor-pointer transition-all duration-300 backdrop-blur-sm">
                      <MdCameraAlt className="text-white text-3xl" />
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                   </label>
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white border-4 border-white shadow-lg">
                   <MdCheckCircle size={20} />
                </div>
              </div>

              <div className="mt-10 text-center relative z-10 w-full">
                 <h2 className="text-3xl font-black text-gray-900 tracking-tight">{user?.name}</h2>
                 <div className="mt-2 flex items-center justify-center gap-2">
                    <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100 shadow-sm">
                       Administrator
                    </span>
                 </div>
                 <p className="text-gray-400 font-bold mt-6 flex items-center justify-center gap-2 text-sm bg-gray-50 py-3 px-6 rounded-2xl border border-gray-100">
                    <MdEmail size={18} className="text-indigo-400" />
                    {user?.email}
                 </p>
              </div>

              <div className="w-full grid grid-cols-2 gap-4 mt-10 relative z-10 border-t border-gray-100 pt-8">
                 <div className="text-center p-4 bg-gray-50/50 rounded-2xl hover:bg-white hover:shadow-md transition-all">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Orders</p>
                    <p className="text-xl font-black text-gray-900 mt-1">128</p>
                 </div>
                 <div className="text-center p-4 bg-gray-50/50 rounded-2xl hover:bg-white hover:shadow-md transition-all">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Joined</p>
                    <p className="text-sm font-black text-gray-900 mt-1.5">{new Date(user?.created_at || Date.now()).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</p>
                 </div>
              </div>
           </div>

           <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-indigo-100">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
              <div className="relative z-10">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                       <MdSecurity size={24} className="text-indigo-400" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Security Status</p>
                       <p className="text-lg font-black">Level High</p>
                    </div>
                 </div>
                 <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-full animate-pulse"></div>
                 </div>
              </div>
           </div>
        </motion.div>

        {/* Form Section */}
        <motion.div variants={item} className="flex-1">
           <div className="bg-white rounded-[3.5rem] p-12 shadow-sm border border-gray-100">
              <div className="flex items-center gap-5 mb-12">
                 <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-indigo-100">
                    <MdPerson />
                 </div>
                 <div>
                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">Account Intelligence</h3>
                    <p className="text-sm text-gray-400 font-bold mt-1 uppercase tracking-widest">Update your administrative credentials</p>
                 </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Full Identity</label>
                       <div className="relative group">
                          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                             <MdPerson size={20} />
                          </span>
                          <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your full name"
                            className="w-full pl-16 pr-8 py-5 bg-gray-50 border-none rounded-[1.5rem] focus:bg-white focus:ring-4 focus:ring-indigo-600/5 transition-all text-lg font-bold placeholder:text-gray-300"
                          />
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Contact Channel</label>
                       <div className="relative group">
                          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                             <MdPhone size={20} />
                          </span>
                          <input 
                            type="text" 
                            value={formData.phone_number}
                            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                            placeholder="Contact number"
                            className="w-full pl-16 pr-8 py-5 bg-gray-50 border-none rounded-[1.5rem] focus:bg-white focus:ring-4 focus:ring-indigo-600/5 transition-all text-lg font-bold placeholder:text-gray-300"
                          />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Registered Email (Read Only)</label>
                    <div className="relative opacity-60">
                       <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                          <MdEmail size={20} />
                       </span>
                       <input 
                         type="email" 
                         value={user?.email} 
                         readOnly
                         className="w-full pl-16 pr-8 py-5 bg-gray-50 border-none rounded-[1.5rem] cursor-not-allowed text-lg font-bold"
                       />
                    </div>
                 </div>

                 <div className="pt-10 border-t border-gray-50 flex items-center justify-between gap-6">
                    <div className="hidden md:flex items-center gap-3 text-gray-400">
                       <MdHistory size={20} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Last updated: 2 days ago</span>
                    </div>
                    <button 
                      type="submit"
                      disabled={isUpdating}
                      className="w-full md:w-auto bg-gray-900 text-white px-12 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-2xl hover:shadow-indigo-200 active:scale-95 disabled:opacity-50"
                    >
                      {isUpdating ? 'Synchronizing...' : 'Save Changes'}
                    </button>
                 </div>
              </form>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminProfile;
