import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  MdArrowBack,
  MdCameraAlt,
  MdCheckCircle,
  MdEdit,
  MdEmail,
  MdOutlineAnalytics,
  MdOutlineVerifiedUser,
  MdPerson,
  MdPhone,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetAllOrdersQuery,
  useGetMeQuery,
  useUpdateUserMutation,
} from "../../../features/api/apiSlice";
import { setCredentials } from "../../../features/auth/authSlice";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { userInfo, token } = useSelector((state) => state.auth);
  const { data: userData, refetch } = useGetMeQuery();
  const { data: ordersData } = useGetAllOrdersQuery({ limit: 1 });
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const user = userData?.data || userInfo;
  const displayName = user?.name || user?.email?.split("@")[0] || "Admin";
  const totalOrders = ordersData?.meta?.total || 0;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    avatar: null,
  });
  const [preview, setPreview] = useState("");

  const getFullImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http") || url.startsWith("data:")) return url;
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";
    return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone_number: user.phone_number || "",
        avatar: null,
      });
      const imgUrl = user.avatar_url || user.avatar || "";
      setPreview(getFullImageUrl(imgUrl));
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
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone_number", formData.phone_number);
      if (formData.avatar) {
        data.append("image", formData.avatar);
      }

      const res = await updateUser(data).unwrap();
      const updatedUser = res.data || res;
      dispatch(
        setCredentials({
          user: { ...userInfo, ...updatedUser },
          token,
        }),
      );
      toast.success("Profile updated successfully");
      setIsEditing(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto space-y-10 font-['Plus_Jakarta_Sans']"
    >
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-3">
            <span className="w-1 h-1 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600">
              Administrative Identity
            </span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tighter leading-none capitalize">
            {displayName}
          </h1>
          <p className="text-gray-400 text-xs lg:text-base mt-3 font-bold flex items-center gap-2">
            System Access Level:{" "}
            <span className="text-indigo-600 uppercase tracking-widest">
              {user?.type || "ADMIN"}
            </span>
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2.5 bg-gray-900 text-white px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl hover:shadow-indigo-100 active:scale-95"
          >
            <MdEdit size={16} />
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Identity & Status */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div
            variants={item}
            className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-600 to-violet-700 opacity-5"></div>

            <div className="relative z-10 flex flex-col items-center pt-4">
              <div className="relative group/avatar">
                <div className="w-40 h-40 rounded-[2.5rem] bg-indigo-50 border-8 border-white shadow-2xl overflow-hidden ring-1 ring-gray-100 relative">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/avatar:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl font-black text-indigo-300">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <label
                    className={`absolute inset-0 bg-black/60 flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-sm cursor-pointer ${isEditing ? "opacity-100" : "opacity-0 group-hover/avatar:opacity-100"}`}
                  >
                    <MdCameraAlt className="text-white text-2xl mb-1.5" />
                    <span className="text-white text-[9px] font-black uppercase tracking-widest">
                      {isEditing ? "Change Photo" : "Edit Identity"}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        if (!isEditing) setIsEditing(true);
                        handleImageChange(e);
                      }}
                    />
                  </label>
                </div>
                <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white border-4 border-white shadow-lg ring-1 ring-emerald-100">
                  <MdOutlineVerifiedUser size={20} />
                </div>
              </div>

              <div className="mt-8 text-center w-full">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">
                  Registered Email
                </p>
                <div className="bg-gray-50 py-3 px-5 rounded-xl border border-gray-100 text-gray-600 font-bold text-xs flex items-center justify-center gap-3">
                  <MdEmail className="text-indigo-400" />
                  {user?.email}
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-gray-50">
                <div className="text-center p-4 bg-gray-50/50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-500 group/stat">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover/stat:text-indigo-600 transition-colors">
                    Total Orders
                  </p>
                  <p className="text-xl font-black text-gray-900 leading-none">
                    {totalOrders}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50/50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-500 group/stat">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover/stat:text-indigo-600 transition-colors">
                    Since
                  </p>
                  <p className="text-xs font-black text-gray-900 mt-0.5 uppercase tracking-tighter">
                    {new Date(
                      user?.created_at || Date.now(),
                    ).toLocaleDateString(undefined, {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Information & Forms */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {!isEditing ? (
              <motion.div
                key="view"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-gray-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-gray-100">
                      <MdOutlineAnalytics />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                        Intelligence Overview
                      </h3>
                      <p className="text-[11px] text-gray-400 font-bold mt-0.5 uppercase tracking-[0.2em]">
                        Detailed Administrative Profiling
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 group hover:bg-white hover:shadow-2xl transition-all duration-700">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3">
                        Official Identification
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-white rounded-xl text-indigo-600 shadow-sm">
                          <MdPerson size={20} />
                        </div>
                        <p className="text-xl font-black text-gray-900 tracking-tighter">
                          {user?.name || "Unconfigured"}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 group hover:bg-white hover:shadow-2xl transition-all duration-700">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3">
                        Communication Line
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-white rounded-xl text-indigo-600 shadow-sm">
                          <MdPhone size={20} />
                        </div>
                        <p className="text-xl font-black text-gray-900 tracking-tighter">
                          {user?.phone_number || "Unconfigured"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 p-6 bg-indigo-600 rounded-[2rem] text-white flex items-center justify-between relative overflow-hidden group">
                    <div className="absolute right-0 bottom-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-16 -mb-16"></div>
                    <div className="relative z-10">
                      <p className="text-[9px] font-black text-indigo-200 uppercase tracking-[0.3em] mb-1.5">
                        Email Address
                      </p>
                      <p className="text-xl font-black tracking-tighter truncate max-w-[280px]">
                        {user?.email}
                      </p>
                    </div>
                    <div className="relative z-10 w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20">
                      <MdCheckCircle size={20} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="edit"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 h-full"
              >
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="w-12 h-12 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-inner border border-gray-100 active:scale-95"
                    >
                      <MdArrowBack size={20} />
                    </button>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                        Identity Modification
                      </h3>
                      <p className="text-[11px] text-gray-400 font-bold mt-0.5 uppercase tracking-[0.2em]">
                        Updating Core Administrative Data
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2 block">
                        Full Legal Identity
                      </label>
                      <div className="relative group">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-600 transition-colors">
                          <MdPerson size={20} />
                        </span>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Ex: John Doe"
                          className="w-full pl-14 pr-6 py-4.5 bg-gray-50 border-none rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-600/5 transition-all text-base font-bold placeholder:text-gray-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2 block">
                        Direct Communication
                      </label>
                      <div className="relative group">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-600 transition-colors">
                          <MdPhone size={20} />
                        </span>
                        <input
                          type="text"
                          value={formData.phone_number}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phone_number: e.target.value,
                            })
                          }
                          placeholder="+880 1XXX XXXXXX"
                          className="w-full pl-14 pr-6 py-4.5 bg-gray-50 border-none rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-600/5 transition-all text-base font-bold placeholder:text-gray-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2 block">
                      Administrative Email (Read Only)
                    </label>
                    <div className="relative opacity-60">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300">
                        <MdEmail size={20} />
                      </span>
                      <input
                        type="email"
                        value={user?.email}
                        readOnly
                        className="w-full pl-14 pr-6 py-4.5 bg-gray-50 border-none rounded-xl cursor-not-allowed text-base font-bold"
                      />
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-50 flex items-center justify-end gap-5">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-gray-900 transition-all active:scale-95"
                    >
                      Discard Changes
                    </button>
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="bg-gray-900 text-white px-12 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-indigo-600 transition-all shadow-2xl hover:shadow-indigo-100 active:scale-95 disabled:opacity-50"
                    >
                      {isUpdating ? "Processing..." : "Commit Update"}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminProfile;
