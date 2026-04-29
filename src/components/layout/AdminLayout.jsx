import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { 
  MdDashboard, 
  MdInventory, 
  MdCategory, 
  MdBrandingWatermark, 
  MdShoppingCart, 
  MdLogout,
  MdAddCircle,
  MdFormatListBulleted
} from 'react-icons/md';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <MdDashboard /> },
    { 
      name: 'Products', 
      path: '/admin/products', 
      icon: <MdInventory />,
      children: [
        { name: 'All Products', path: '/admin/products', icon: <MdFormatListBulleted /> },
        { name: 'Add Product', path: '/admin/products/create', icon: <MdAddCircle /> },
      ]
    },
    { name: 'Categories', path: '/admin/categories', icon: <MdCategory /> },
    { name: 'Brands', path: '/admin/brands', icon: <MdBrandingWatermark /> },
    { name: 'Orders', path: '/admin/orders', icon: <MdShoppingCart /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-['Inter']">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-800">
          OREBI ADMIN
        </div>
        
        <nav className="flex-1 mt-6 px-4">
          {navItems.map((item) => (
            <div key={item.name} className="mb-2">
              <NavLink
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    isActive ? 'bg-white text-black' : 'hover:bg-gray-800 text-gray-400'
                  }`
                }
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </NavLink>
              
              {item.children && (
                <div className="ml-8 mt-2 space-y-1 border-l border-gray-800 pl-2">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.name}
                      to={child.path}
                      className={({ isActive }) =>
                        `flex items-center gap-2 p-2 text-sm rounded-md transition-all duration-300 ${
                          isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                        }`
                      }
                    >
                      {child.icon}
                      {child.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 text-red-400 hover:bg-gray-800 rounded-lg transition-all"
          >
            <MdLogout />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-gray-800 capitalize">
            Admin Management
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Admin User</span>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
