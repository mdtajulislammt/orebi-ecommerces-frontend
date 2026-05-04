import React, { useState } from "react";
import {
  FaCamera,
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaPhoneAlt,
  FaShoppingBag,
  FaSignOutAlt,
  FaUser,
  FaUserEdit,
} from "react-icons/fa";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../components/layout/Container";
import Heading from "../components/layout/Heading";
import List from "../components/layout/List";
import ListItem from "../components/layout/ListItem";
import Paragraph from "../components/layout/Paragraph";
import {
  useGetMeQuery,
  useGetMyOrdersQuery,
  useUpdateUserMutation,
  
} from "../features/api/apiSlice";
import { logout, setCredentials } from "../features/auth/authSlice";

const MyAccount = () => {
  const [itemOpen, setItemOpen] = useState("dashboard");
  const { token, userInfo: stateUserInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: userData, isLoading: userLoading } = useGetMeQuery(undefined, {
    skip: !token,
  });
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const { data: ordersResponse, isLoading: ordersLoading } =
    useGetMyOrdersQuery();

  const userInfo = userData?.data || stateUserInfo;
  const orders = ordersResponse?.data || [];

  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userInfo?.name || "",
    phone_number: userInfo?.phone_number || "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Update formData when userInfo changes
  React.useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || "",
        phone_number: userInfo.phone_number || "",
      });
    }
  }, [userInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone_number", formData.phone_number);
      if (imageFile) {
        data.append("image", imageFile);
      }

      const res = await updateUser(data).unwrap();
      dispatch(setCredentials({ user: res.data || res, token }));
      toast.success("Profile updated successfully");
      setIsEditing(false);
      setImageFile(null);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <section className="py-6 sm:py-8 lg:py-10 bg-[#fafafa]">
      <Container>
        {/* Premium Hero Banner */}
        <div className="relative h-32 sm:h-48 lg:h-56 rounded-[1.5rem] lg:rounded-[2.5rem] overflow-hidden mb-6 sm:mb-8 lg:mb-10 shadow-2xl group">
          <img
            src="/account_banner.png"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            alt="Account Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 lg:px-20">
            <div className="flex items-center gap-2 text-white/50 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2 sm:mb-4">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <IoIosArrowForward className="text-[10px]" />
              <span className="text-white/90">My Account</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tighter uppercase leading-none">
              Dashboard
            </h1>
            <p className="text-white/60 text-[7px] lg:text-[9px] font-black uppercase tracking-[0.4em] mt-2 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-white/20"></span>
              Exclusive Member Space
            </p>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Sidebar - Mobile: Horizontal Scroll, Desktop: Sticky Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-[1.5rem] lg:rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden lg:sticky lg:top-32">
              <div className="p-4 lg:p-6 border-b border-gray-50 bg-gray-50/30 hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-black text-white flex items-center justify-center font-black text-lg lg:text-xl shadow-lg shadow-black/20">
                    <img
                      src={userData?.data?.avatar_url}
                      alt=""
                      className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                      Customers
                    </p>
                    <p className="text-xs font-bold text-primary-color truncate max-w-[120px]">
                      {userData?.data?.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation List - Horizontal on Mobile, Vertical on Desktop */}
              <div className="overflow-x-auto no-scrollbar">
                <List className="flex lg:flex-col p-2 min-w-max lg:min-w-0">
                  {[
                    {
                      id: "dashboard",
                      label: "Dashboard",
                      icon: <LuLayoutDashboard />,
                    },
                    {
                      id: "orders",
                      label: "My Orders",
                      icon: <FaShoppingBag />,
                    },
                    {
                      id: "accountDetails",
                      label: "Account Details",
                      icon: <FaUserEdit />,
                    },
                    { id: "logout", label: "Logout", icon: <FaSignOutAlt /> },
                  ].map((item) => (
                    <ListItem
                      key={item.id}
                      onClick={() => {
                        if (item.id === "logout") {
                          handleLogout();
                        } else {
                          setItemOpen(item.id);
                        }
                      }}
                      className={`flex items-center gap-2 lg:gap-4 text-[10px] sm:text-xs md:text-sm font-dm-sans px-4 lg:px-6 py-3 lg:py-4 rounded-xl lg:rounded-2xl lg:mb-1 last:mb-0 capitalize cursor-pointer transition-all duration-300 whitespace-nowrap ${
                        itemOpen === item.id
                          ? "bg-black text-white shadow-lg shadow-black/20 lg:translate-x-2"
                          : "bg-white text-secondary-color hover:bg-gray-50 lg:hover:pl-8"
                      }`}
                    >
                      <span className="text-base lg:text-lg">{item.icon}</span>
                      <span className="font-bold">{item.label}</span>
                    </ListItem>
                  ))}
                </List>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white p-5 sm:p-8 lg:p-10 rounded-[2rem] lg:rounded-3xl shadow-sm border border-gray-100 min-h-[300px] lg:min-h-[400px]">
              {itemOpen === "dashboard" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Hero Section */}
                  <div className="relative overflow-hidden p-6 sm:p-8 lg:p-12 rounded-[1.5rem] lg:rounded-[2.5rem] bg-black text-white shadow-2xl">
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 px-3 lg:px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[8px] lg:text-xs font-black uppercase tracking-widest mb-4 lg:mb-6">
                        <HiOutlineBadgeCheck className="text-yellow-400 text-sm lg:text-lg" />
                        Verified Member
                      </div>
                      <Heading
                        tagname="h3"
                        text={`Welcome back, ${userData?.data?.name?.slice(0, 2).toUpperCase() || userData?.data?.email?.slice(0, 2).toUpperCase()}!`}
                        className="text-lg sm:text-xl lg:text-3xl font-black mb-2 lg:mb-3 leading-tight"
                      />
                      <Paragraph
                        classname="text-gray-400 text-xs lg:text-sm leading-relaxed max-w-xl"
                        text="Your personal hub for tracking orders and managing your profile. Experience the future of shopping with Orebi."
                      />
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute top-[-20%] right-[-10%] w-32 h-32 lg:w-64 lg:h-64 bg-white/5 rounded-full blur-3xl" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-6 lg:mt-10">
                    <div className="group p-6 lg:p-8 bg-white rounded-[1.5rem] lg:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
                      <div className="flex justify-between items-start mb-4 lg:mb-6">
                        <div className="p-3 lg:p-4 bg-blue-50 rounded-xl lg:rounded-2xl text-blue-600">
                          <FaShoppingBag className="text-xl lg:text-2xl" />
                        </div>
                        <span className="text-[8px] lg:text-[10px] font-black bg-blue-50 text-blue-600 px-2 lg:px-3 py-1 rounded-full uppercase tracking-tighter">
                          Updated
                        </span>
                      </div>
                      <p className="text-gray-400 font-bold text-[10px] uppercase tracking-wider mb-1">
                        Total Purchases
                      </p>
                      <h4 className="text-2xl lg:text-3xl font-black text-primary-color">
                        {orders.length}
                      </h4>
                    </div>

                    <div className="group p-6 lg:p-8 bg-white rounded-[1.5rem] lg:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
                      <div className="flex justify-between items-start mb-4 lg:mb-6">
                        <div className="p-3 lg:p-4 bg-green-50 rounded-xl lg:rounded-2xl text-green-600">
                          <HiOutlineBadgeCheck className="text-xl lg:text-2xl" />
                        </div>
                        <span className="text-[7px] lg:text-[8px] font-black bg-green-50 text-green-600 px-2 lg:px-3 py-1 rounded-full uppercase tracking-tighter">
                          Premium
                        </span>
                      </div>
                      <p className="text-gray-400 font-bold text-[10px] uppercase tracking-wider mb-1">
                        Status
                      </p>
                      <h4 className="text-2xl lg:text-3xl font-black text-primary-color">
                        Excellent
                      </h4>
                    </div>
                  </div>
                </div>
              )}

              {itemOpen === "orders" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between mb-6 lg:mb-10">
                    <div>
                      <Heading
                        tagname="h3"
                        text="Transactions"
                        className="text-2xl lg:text-3xl font-black text-primary-color"
                      />
                      <p className="text-gray-400 text-xs lg:text-sm mt-1">
                        Manage your order history
                      </p>
                    </div>
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-50 rounded-xl lg:rounded-2xl flex items-center justify-center text-gray-400">
                      <FaShoppingBag className="text-lg lg:text-xl" />
                    </div>
                  </div>

                  {ordersLoading ? (
                    <div className="flex justify-center py-20 lg:py-24">
                      <div className="relative">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 border-4 border-gray-100 rounded-full"></div>
                        <div className="w-10 h-10 lg:w-12 lg:h-12 border-4 border-t-black rounded-full animate-spin absolute top-0 left-0"></div>
                      </div>
                    </div>
                  ) : orders.length > 0 ? (
                    <>
                      {/* Table for Desktop */}
                      <div className="hidden md:block overflow-hidden rounded-[2rem] border border-gray-50 shadow-sm">
                        <table className="w-full text-left">
                          <thead className="bg-gray-50/50">
                            <tr>
                              <th className="px-8 py-5 font-black text-[10px] uppercase tracking-widest text-gray-400">
                                Reference
                              </th>
                              <th className="px-8 py-5 font-black text-[10px] uppercase tracking-widest text-gray-400">
                                Order Date
                              </th>
                              <th className="px-8 py-5 font-black text-[10px] uppercase tracking-widest text-gray-400 text-center">
                                Status
                              </th>
                              <th className="px-8 py-5 font-black text-[10px] uppercase tracking-widest text-gray-400 text-right">
                                Total Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {orders.map((order) => (
                              <tr
                                key={order.id}
                                className="hover:bg-gray-50/50 transition-colors group"
                              >
                                <td className="px-8 py-6">
                                  <span className="font-black text-sm text-primary-color">
                                    #{order.id?.slice(-8).toUpperCase()}
                                  </span>
                                </td>
                                <td className="px-8 py-6">
                                  <div className="flex flex-col">
                                    <span className="text-sm font-bold text-primary-color">
                                      {new Date(
                                        order.created_at,
                                      ).toLocaleDateString(undefined, {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                      })}
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                                      {new Date(
                                        order.created_at,
                                      ).toLocaleTimeString(undefined, {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-8 py-6 text-center">
                                  <span
                                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                      order.status === "pending"
                                        ? "bg-amber-50 text-amber-600"
                                        : order.status === "completed"
                                          ? "bg-emerald-50 text-emerald-600"
                                          : "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {order.status === "pending" ? (
                                      <FaClock className="text-[8px]" />
                                    ) : (
                                      <FaCheckCircle className="text-[8px]" />
                                    )}
                                    {order.status}
                                  </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                  <span className="text-base font-black text-primary-color">
                                    ${Number(order.total_amount).toFixed(2)}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Card Layout for Mobile */}
                      <div className="md:hidden space-y-4">
                        {orders.map((order) => (
                          <div
                            key={order.id}
                            className="p-5 rounded-2xl border border-gray-100 bg-gray-50/30"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <span className="font-black text-sm text-primary-color">
                                #{order.id?.slice(-8).toUpperCase()}
                              </span>
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                  order.status === "pending"
                                    ? "bg-amber-50 text-amber-600"
                                    : order.status === "completed"
                                      ? "bg-emerald-50 text-emerald-600"
                                      : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {order.status}
                              </span>
                            </div>
                            <div className="flex justify-between items-end">
                              <div>
                                <p className="text-xs font-bold text-primary-color">
                                  {new Date(
                                    order.createdAt,
                                  ).toLocaleDateString()}
                                </p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">
                                  {new Date(order.createdAt).toLocaleTimeString(
                                    [],
                                    { hour: "2-digit", minute: "2-digit" },
                                  )}
                                </p>
                              </div>
                              <p className="text-lg font-black text-primary-color">
                                ${Number(order.total_amount).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-16 lg:py-24 bg-gray-50/50 rounded-[2rem] lg:rounded-[2.5rem] border-2 border-dashed border-gray-100">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-2xl lg:rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6 text-gray-200">
                        <FaShoppingBag className="text-3xl lg:text-4xl" />
                      </div>
                      <p className="text-gray-500 font-bold text-base lg:text-lg mb-2">
                        No orders found
                      </p>
                      <button
                        onClick={() => navigate("/shop")}
                        className="bg-black text-white px-8 lg:px-10 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-black text-[10px] lg:text-xs uppercase tracking-widest"
                      >
                        Start Exploring
                      </button>
                    </div>
                  )}
                </div>
              )}

              {itemOpen === "accountDetails" && (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
                  {/* Header Section */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-12">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.03] border border-black/[0.05] mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                        <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] text-black/50">
                          Personal Space
                        </span>
                      </div>
                      <Heading
                        tagname="h3"
                        text="Profile Settings"
                        className="text-3xl lg:text-5xl font-black text-primary-color tracking-tight"
                      />
                      <p className="text-gray-400 text-sm lg:text-lg mt-2 font-medium">
                        Manage your digital identity
                      </p>
                    </div>
                  </div>

                  {isEditing ? (
                    <form
                      onSubmit={handleUpdateProfile}
                      className="space-y-8 lg:space-y-10"
                    >
                      <div className="space-y-8">
                        <div className="flex flex-col items-center gap-4 mb-6 lg:mb-10">
                          <div className="w-28 h-28 lg:w-40 lg:h-40 rounded-[2rem] lg:rounded-[3rem] overflow-hidden bg-gray-50 border-4 lg:border-8 border-white shadow-xl relative group">
                            {imagePreview || userInfo?.avatar_url ? (
                              <img
                                src={imagePreview || userInfo.avatar_url}
                                alt="Profile"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-200 text-3xl lg:text-5xl font-black">
                                {userInfo?.name?.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-500 backdrop-blur-sm">
                              <FaCamera className="text-white text-2xl lg:text-3xl mb-1 lg:mb-2" />
                              <span className="text-white text-[8px] lg:text-[10px] font-black uppercase">
                                Update
                              </span>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                              />
                            </label>
                          </div>
                          <div className="px-3 py-1 rounded-full bg-gray-100 text-[8px] lg:text-[10px] font-black text-gray-400 uppercase">
                            Identity Image
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
                          <div className="space-y-2 lg:space-y-3">
                            <label className="text-[10px] lg:text-xs font-black text-gray-400 uppercase tracking-widest ml-1 block">
                              Full Name
                            </label>
                            <div className="relative group">
                              <span className="absolute left-5 lg:left-6 top-1/2 -translate-y-1/2 text-gray-300">
                                <FaUser />
                              </span>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full pl-12 lg:pl-16 pr-6 lg:pr-8 py-4 lg:py-5 bg-gray-50/50 rounded-xl lg:rounded-[1.5rem] border-2 border-transparent focus:border-black focus:bg-white outline-none transition-all font-bold text-primary-color"
                                placeholder="Your Name"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2 lg:space-y-3">
                            <label className="text-[10px] lg:text-xs font-black text-gray-400 uppercase tracking-widest ml-1 block">
                              Contact Number
                            </label>
                            <div className="relative group">
                              <span className="absolute left-5 lg:left-6 top-1/2 -translate-y-1/2 text-gray-300">
                                <FaPhoneAlt />
                              </span>
                              <input
                                type="text"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                className="w-full pl-12 lg:pl-16 pr-6 lg:pr-8 py-4 lg:py-5 bg-gray-50/50 rounded-xl lg:rounded-[1.5rem] border-2 border-transparent focus:border-black focus:bg-white outline-none transition-all font-bold text-primary-color"
                                placeholder="Phone Number"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-6 lg:pt-8">
                        <button
                          type="submit"
                          disabled={isUpdating}
                          className="w-full sm:flex-[2] bg-black text-white px-8 py-4 lg:py-5 rounded-xl lg:rounded-[1.5rem] font-black text-[10px] lg:text-xs uppercase tracking-[0.2em]"
                        >
                          {isUpdating ? "Saving..." : "Commit Preferences"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setImagePreview(null);
                            setImageFile(null);
                          }}
                          className="w-full sm:flex-1 bg-white border-2 border-gray-100 text-gray-400 px-8 py-4 lg:py-5 rounded-xl lg:rounded-[1.5rem] font-black text-[10px] lg:text-xs uppercase tracking-[0.2em]"
                        >
                          Discard
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-8 lg:space-y-12">
                      {/* Main Profile Card */}
                      <div className="group relative p-1 rounded-[2rem] lg:rounded-[3rem] bg-gradient-to-br from-gray-100 via-white to-gray-50 shadow-xl shadow-gray-200/40 overflow-hidden">
                        <div className="relative z-10 bg-white rounded-[1.8rem] lg:rounded-[2.8rem] p-6 lg:p-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-10 text-center lg:text-left">
                          <div className="relative shrink-0">
                            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-[1.5rem] lg:rounded-[2.5rem] overflow-hidden bg-black text-white flex items-center justify-center text-3xl lg:text-4xl font-black shadow-xl ring-4 lg:ring-8 ring-gray-50/50">
                              {userInfo?.avatar_url ? (
                                <img
                                  src={userInfo.avatar_url}
                                  alt="Profile"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                userInfo?.name?.charAt(0).toUpperCase() ||
                                userInfo?.email?.charAt(0).toUpperCase() ||
                                "U"
                              )}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white border-2 border-white shadow-lg">
                              <FaCheckCircle className="text-xs" />
                            </div>
                          </div>

                          <div className="flex-1">
                            <p className="text-[8px] lg:text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-1 lg:mb-2">
                              Primary Identity
                            </p>
                            <h4 className="text-2xl lg:text-4xl font-black text-primary-color mb-2 lg:mb-3">
                              {userInfo?.name || "Member Name"}
                            </h4>
                            <div className="inline-flex items-center gap-2 px-3 lg:px-4 py-1 rounded-lg lg:rounded-xl bg-emerald-50 border border-emerald-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-[8px] lg:text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                                Verified Account
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => setIsEditing(true)}
                            className="hidden lg:flex p-5 bg-gray-50 rounded-[1.8rem] text-gray-400 hover:bg-black hover:text-white transition-all duration-500"
                          >
                            <FaUserEdit className="text-2xl" />
                          </button>
                        </div>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
                        <div className="p-6 lg:p-10 bg-white rounded-[1.5rem] lg:rounded-[2.5rem] border border-gray-100 shadow-sm">
                          <div className="w-10 h-10 lg:w-14 lg:h-14 bg-gray-50 rounded-xl lg:rounded-2xl flex items-center justify-center text-gray-400 mb-6 lg:mb-8">
                            <FaEnvelope className="text-lg lg:text-xl" />
                          </div>
                          <p className="text-[8px] lg:text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1 lg:mb-2">
                            Email Address
                          </p>
                          <p className="text-sm lg:text-lg font-bold text-primary-color break-all tracking-tight">
                            {userData?.data?.email}
                          </p>
                        </div>

                        <div className="p-6 lg:p-10 bg-white rounded-[1.5rem] lg:rounded-[2.5rem] border border-gray-100 shadow-sm">
                          <div className="w-10 h-10 lg:w-14 lg:h-14 bg-gray-50 rounded-xl lg:rounded-2xl flex items-center justify-center text-gray-400 mb-6 lg:mb-8">
                            <FaPhoneAlt className="text-lg lg:text-xl" />
                          </div>
                          <p className="text-[8px] lg:text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1 lg:mb-2">
                            Phone Number
                          </p>
                          <p className="text-sm lg:text-lg font-bold text-primary-color tracking-tight">
                            {userData?.data?.phone_number || "Not provided"}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 lg:pt-10 flex justify-center">
                        <button
                          onClick={() => setIsEditing(true)}
                          className="w-full lg:w-auto h-16 lg:h-20 px-8 lg:px-16 bg-black text-white rounded-2xl lg:rounded-[1.8rem] font-black text-xs uppercase tracking-[0.3em] shadow-xl"
                        >
                          Modify Account
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MyAccount;
