import React, { useState } from "react";
import Container from "../components/layout/Container";
import BreadCrump from "../components/layout/BreadCrump";
import Flex from "../components/layout/Flex";
import ListItem from "../components/layout/ListItem";
import Paragraph from "../components/layout/Paragraph";
import List from "../components/layout/List";
import Heading from "../components/layout/Heading";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useGetMyOrdersQuery } from "../features/api/apiSlice";
import { toast } from "react-toastify";

const MyAccount = () => {
  const [itemOpen, setItemOpen] = useState("dashboard");
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: ordersResponse, isLoading } = useGetMyOrdersQuery();
  const orders = ordersResponse?.data || [];

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <section className="py-10 bg-[#fafafa] min-h-screen">
      <Container>
        <BreadCrump />
        <Flex className={"mt-10 sm:mt-12 md:mt-14 lg:mt-16 xl:mt-18 2xl:mt-20 gap-x-4 sm:gap-x-10"}>
          {/* Sidebar */}
          <div className="w-1/3 sm:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <List>
                {[
                  { id: "dashboard", label: "Dashboard" },
                  { id: "orders", label: "My Orders" },
                  { id: "accountDetails", label: "Account Details" },
                  { id: "logout", label: "Logout" },
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
                    className={`text-sm md:text-base font-dm-sans px-4 md:px-6 py-4 border-b border-gray-50 last:border-0 capitalize cursor-pointer transition-all ${
                      itemOpen === item.id
                        ? "bg-black text-white"
                        : "bg-white text-secondary-color hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </ListItem>
                ))}
              </List>
            </div>
          </div>

          {/* Content Area */}
          <div className="w-2/3 sm:w-3/4">
            <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-gray-100 min-h-[500px]">
              {itemOpen === "dashboard" && (
                <div className="space-y-6">
                  <Heading
                    tagname="h3"
                    text={`Welcome back, ${userInfo?.name || "User"}!`}
                    className="text-2xl font-black text-primary-color"
                  />
                  <Paragraph
                    classname="text-secondary-color leading-relaxed max-w-2xl"
                    text="From your account dashboard, you can easily manage your orders, update your personal information, and track your shopping journey with Orebi."
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                      <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">Total Orders</p>
                      <h4 className="text-3xl font-black text-blue-900">{orders.length}</h4>
                    </div>
                    <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                      <p className="text-green-600 font-bold text-sm uppercase tracking-wider mb-2">Account Status</p>
                      <h4 className="text-3xl font-black text-green-900">Active</h4>
                    </div>
                  </div>
                </div>
              )}

              {itemOpen === "orders" && (
                <div>
                  <Heading
                    tagname="h3"
                    text="Your Order History"
                    className="text-2xl font-black text-primary-color mb-8"
                  />
                  
                  {isLoading ? (
                    <div className="flex justify-center py-20">
                      <div className="w-10 h-10 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b-2 border-gray-50">
                            <th className="py-4 font-black text-sm uppercase text-gray-400">Order ID</th>
                            <th className="py-4 font-black text-sm uppercase text-gray-400">Date</th>
                            <th className="py-4 font-black text-sm uppercase text-gray-400">Status</th>
                            <th className="py-4 font-black text-sm uppercase text-gray-400 text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                              <td className="py-5 font-bold text-sm">#{order.id?.slice(-8).toUpperCase()}</td>
                              <td className="py-5 text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-5">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                  order.status === 'pending' ? 'bg-orange-100 text-orange-600' : 
                                  order.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-5 font-black text-sm text-right">
                                ${Number(order.total_amount).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl">
                      <p className="text-gray-400 font-bold mb-4">You haven't placed any orders yet.</p>
                      <button 
                        onClick={() => navigate("/shop")}
                        className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:opacity-80 transition-all"
                      >
                        Start Shopping
                      </button>
                    </div>
                  )}
                </div>
              )}

              {itemOpen === "accountDetails" && (
                <div className="max-w-xl">
                  <Heading
                    tagname="h3"
                    text="Account Information"
                    className="text-2xl font-black text-primary-color mb-10"
                  />
                  
                  <div className="space-y-8">
                    <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl">
                      <div className="w-16 h-16 bg-black text-white flex items-center justify-center rounded-2xl text-2xl font-black">
                        {userInfo?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Full Name</p>
                        <p className="text-xl font-bold text-primary-color">{userInfo?.name}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gray-50 rounded-2xl">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Email Address</p>
                        <p className="font-bold text-primary-color break-all">{userInfo?.email}</p>
                      </div>
                      <div className="p-6 bg-gray-50 rounded-2xl">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Phone Number</p>
                        <p className="font-bold text-primary-color">{userInfo?.phone_number || "Not provided"}</p>
                      </div>
                    </div>

                    <div className="pt-10 border-t border-gray-100">
                      <button className="bg-white border-2 border-black px-10 py-4 rounded-2xl font-black text-sm hover:bg-black hover:text-white transition-all shadow-sm">
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Flex>
      </Container>
    </section>
  );
};

export default MyAccount;
