import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { 
  MdDashboard, 
  MdInventory, 
  MdCategory, 
  MdBrandingWatermark, 
  MdShoppingCart, 
  MdLogout,
  MdAddCircle,
  MdFormatListBulleted,
  MdEmail,
  MdPerson,
  MdNotificationsNone,
  MdSearch
} from 'react-icons/md';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <MdDashboard />, color: 'text-indigo-500' },
    { 
      name: 'Products', 
      path: '/admin/products', 
      icon: <MdInventory />,
      color: 'text-blue-500',
      children: [
        { name: 'All Products', path: '/admin/products', icon: <MdFormatListBulleted /> },
        { name: 'Add Product', path: '/admin/products/create', icon: <MdAddCircle /> },
      ]
    },
    { name: 'Categories', path: '/admin/categories', icon: <MdCategory />, color: 'text-emerald-500' },
    { name: 'Brands', path: '/admin/brands', icon: <MdBrandingWatermark />, color: 'text-violet-500' },
    { name: 'Orders', path: '/admin/orders', icon: <MdShoppingCart />, color: 'text-rose-500' },
    { name: 'Contacts', path: '/admin/contacts', icon: <MdEmail />, color: 'text-amber-500' },
    { name: 'Profile', path: '/admin/profile', icon: <MdPerson />, color: 'text-cyan-500' },
  ];

  const adminName = user?.name || user?.data?.name || 'Admin User';
  const adminInitial = adminName.charAt(0).toUpperCase();

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-['Plus_Jakarta_Sans']">
      {/* Sidebar */}
      <div className="w-72 bg-white text-gray-600 flex flex-col shrink-0 border-r border-gray-100 shadow-xl shadow-gray-200/50 relative z-20">
        <div className="p-8 text-2xl font-black text-gray-900 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
             O
          </div>
          <span className="tracking-tighter">OREBI <span className="text-indigo-600">PRO</span></span>
        </div>
        
        <nav className="flex-1 mt-2 px-6 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <div key={item.name} className="mb-2">
              <NavLink
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${
                    isActive 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                    : 'hover:bg-gray-50 text-gray-500 hover:text-gray-900'
                  }`
                }
              >
                <span className={`text-2xl transition-colors ${item.color}`}>
                  {item.icon}
                </span>
                <span className="font-bold text-[15px]">{item.name}</span>
                <div className={`ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 transition-all ${
                  item.path === window.location.pathname ? 'opacity-100' : 'opacity-0'
                }`}></div>
              </NavLink>
              
              {item.children && (
                <div className="ml-10 mt-2 space-y-1 border-l-2 border-gray-50 pl-4">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.name}
                      to={child.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 p-2.5 text-[13px] font-bold rounded-xl transition-all duration-300 ${
                          isActive ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                        }`
                      }
                    >
                      {child.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-50 mt-auto">
          <div className="bg-rose-50 rounded-2xl p-4 flex items-center gap-3 group cursor-pointer" onClick={handleLogout}>
             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-rose-500 shadow-sm group-hover:bg-rose-500 group-hover:text-white transition-all">
                <MdLogout size={20} />
             </div>
             <div>
                <p className="text-[13px] font-black text-rose-600">Sign Out</p>
                <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest">End Session</p>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white/80 backdrop-blur-md h-20 flex items-center justify-between px-10 shrink-0 border-b border-gray-100 relative z-10">
          <div className="flex items-center gap-4 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 max-w-md w-full">
            <MdSearch size={22} className="text-gray-400" />
            <input type="text" placeholder="Global search..." className="bg-transparent border-none outline-none text-sm font-medium w-full" />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-gray-100">
               <MdNotificationsNone size={24} />
               <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-4 pl-6 border-l border-gray-100 group cursor-pointer" onClick={() => navigate('/admin/profile')}>
              <div className="text-right">
                <p className="text-sm font-black text-gray-900 mb-0.5">{adminName}</p>
                <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md inline-block">Active Now</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-xl shadow-indigo-100 ring-4 ring-indigo-50">
                {adminInitial}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

