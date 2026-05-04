import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery, useGetMeQuery, useGetProductsQuery } from "../../features/api/apiSlice";
import { addToCart, removeFromCart, removeFromWishlist } from "../../features/orebi/orebiSlice";
// components
import Container from "../layout/Container";
import Flex from "../layout/Flex";
// react icons
import { FaRegUser, FaSearch, FaUser } from "react-icons/fa";
import { FaCartShopping, FaHeart, FaRegHeart } from "react-icons/fa6";
import { GoTriangleDown } from "react-icons/go";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

import { NavLink } from "react-router-dom";
import orebiLogo from "../../assets/logo.png";
import { logout } from "../../features/auth/authSlice";
import Image from "../layout/Image";

const navigation = [
  { name: "home", href: "/" },
  { name: "shop", href: "/shop" },
  { name: "about-us", href: "/about-us" },
  { name: "contacts", href: "/contacts" },
  { name: "journal", href: "/journal" },
];


const Header = () => {
  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const { token, userInfo } = useSelector((state) => state.auth);
  
  // Fetch user info if we have a token
  const { data: userData } = useGetMeQuery(undefined, { skip: !token });

  // console.log('userData from query', userData.data.name);
  
  
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  let categoryRef = useRef();

  const [accountDropDownShow, setAccountDropDownShow] = useState(false);
  let accountRef = useRef();

  const [addToCartShow, setAddToCartShow] = useState(false);
  let addToCartRef = useRef();

  const [wishlistDropDownShow, setWishlistDropDownShow] = useState(false);
  let wishlistRef = useRef();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchShow, setSearchShow] = useState(false);
  let searchRef = useRef();

  const { data: searchResults, isFetching: searchLoading } = useGetProductsQuery(
    { search: searchQuery, limit: 5 },
    { skip: searchQuery.length < 2 }
  );

  const cart = useSelector((state) => state.orebi?.cart || []);
  const wishlist = useSelector((state) => state.orebi?.wishlist || []);
  const dispatch = useDispatch();

  const totalAmount = Array.isArray(cart) ? cart.reduce((total, item) => {
    const price = typeof item.productPrice === 'string' 
      ? parseFloat(item.productPrice.replace("$", "")) 
      : item.productPrice;
    return total + price * item.quantity;
  }, 0) : 0;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) setCategoryMenuOpen(false);
      if (accountRef.current && !accountRef.current.contains(e.target)) setAccountDropDownShow(false);
      if (addToCartRef.current && !addToCartRef.current.contains(e.target)) setAddToCartShow(false);
      if (wishlistRef.current && !wishlistRef.current.contains(e.target)) setWishlistDropDownShow(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchShow(false);
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setAccountDropDownShow(false);
  };

  // console.log('userInfo', userInfo);
  

  const iconsJSX = (
    <div className="flex items-center gap-x-5 md:gap-x-8">
      {/* Account */}
      <div ref={accountRef} className="relative">
        {token ? (
          <button
            onClick={() => setAccountDropDownShow(!accountDropDownShow)}
            className="flex items-center gap-x-2 text-[#262626] hover:text-black transition-all group"
          >
            <div className="flex flex-col items-start hidden sm:flex">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight leading-none">Account</span>
              <span className="text-sm font-bold truncate max-w-[120px]">{userData?.data?.name || userData?.data?.email?.split('@')[0] || "User"}</span>
            </div>
            {userData?.data?.avatar ? (
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                <img 
                  src={userData.data.avatar_url} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <FaUser className="text-lg md:text-xl" />
            )}
            <GoTriangleDown className={`text-xs transition-transform duration-300 ${accountDropDownShow ? "rotate-180" : ""}`} />
          </button>
        ) : (
          <Link to="/login" className="flex items-center gap-x-2 text-[#262626] hover:text-black transition-all group">
            <div className="flex flex-col items-start hidden sm:flex">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight leading-none">Welcome</span>
              <span className="text-sm font-bold">Login</span>
            </div>
            <FaRegUser className="text-lg md:text-xl" />
          </Link>
        )}
        
        <div className={`absolute right-0 top-[120%] w-[180px] bg-white rounded-xl shadow-2xl border border-gray-100 py-2 transition-all duration-300 origin-top-right z-[100] ${accountDropDownShow ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"}`}>
          <Link 
            to="/my-account" 
            onClick={() => setAccountDropDownShow(false)}
            className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black font-medium transition-colors border-b border-gray-50"
          >
            My Account
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full text-left px-6 py-3 text-sm text-red-500 hover:bg-red-50 font-bold transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Wishlist */}
      <div ref={wishlistRef} className="relative">
        <button
          onClick={() => setWishlistDropDownShow(!wishlistDropDownShow)}
          className="relative text-[#262626] hover:text-black transition-all"
        >
          {wishlist.length > 0 ? <FaHeart className="text-xl text-red-500" /> : <FaRegHeart className="text-xl md:text-2xl" />}
          {wishlist.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#262626] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
              {wishlist.length}
            </span>
          )}
        </button>

        <div className={`absolute right-[-60px] md:right-0 top-[120%] w-[300px] md:w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 origin-top-right z-[100] ${wishlistDropDownShow ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"}`}>
          <div className="max-h-[400px] overflow-y-auto">
            {wishlist.length > 0 ? (
              wishlist.map((item) => (
                <div key={item.id} className="flex items-center gap-x-4 p-4 hover:bg-gray-50 border-b border-gray-50 transition-colors group">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <img src={item.productImageSrc} alt={item.productName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-[#262626] line-clamp-1">{item.productName}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.productPrice}</p>
                    <button
                      onClick={() => {
                        dispatch(addToCart(item));
                        dispatch(removeFromWishlist(item.id));
                      }}
                      className="text-[11px] font-bold text-[#262626] underline mt-1.5 hover:text-black transition-colors"
                    >
                      Move to Cart
                    </button>
                  </div>
                  <button 
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <RxCross2 className="text-lg" />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-12 text-center">
                <FaRegHeart className="text-4xl text-gray-100 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Your wishlist is empty</p>
              </div>
            )}
          </div>
          <div className="p-4 bg-gray-50">
            <Link to="/wishlist" onClick={() => setWishlistDropDownShow(false)} className="block w-full py-3 bg-[#262626] text-white text-center text-sm font-bold rounded-xl hover:bg-black transition-all">
              View Full Wishlist
            </Link>
          </div>
        </div>
      </div>

      {/* Cart */}
      <div ref={addToCartRef} className="relative">
        <button
          onClick={() => setAddToCartShow(!addToCartShow)}
          className="relative text-[#262626] hover:text-black transition-all"
        >
          <FaCartShopping className="text-xl md:text-2xl" />
          {cart.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#262626] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>

        <div className={`absolute right-[-10px] md:right-0 top-[120%] w-[300px] md:w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 origin-top-right z-[100] ${addToCartShow ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"}`}>
          <div className="max-h-[400px] overflow-y-auto">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="flex items-center gap-x-4 p-4 hover:bg-gray-50 border-b border-gray-50 transition-colors group">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <img src={item.productImageSrc} alt={item.productName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-[#262626] line-clamp-1">{item.productName}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.productPrice} x {item.quantity}</p>
                  </div>
                  <button 
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <RxCross2 className="text-lg" />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-12 text-center">
                <FaCartShopping className="text-4xl text-gray-100 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Your cart is empty</p>
              </div>
            )}
          </div>
          {cart.length > 0 && (
            <div className="p-6 bg-gray-50 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">Subtotal</span>
                <span className="text-lg font-bold text-[#262626]">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex gap-x-3">
                <Link to="/cart" onClick={() => setAddToCartShow(false)} className="flex-1 py-3 border border-[#262626] text-[#262626] text-center text-sm font-bold rounded-xl hover:bg-gray-100 transition-all">
                  View Cart
                </Link>
                <Link to="/checkout" onClick={() => setAddToCartShow(false)} className="flex-1 py-3 bg-[#262626] text-white text-center text-sm font-bold rounded-xl hover:bg-black transition-all shadow-lg">
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-white border-b border-gray-100 py-3 sm:py-4 relative z-50 shadow-sm">
      {/* Side Drawer & Overlay (Global Level) */}
      <div className="lg:hidden">
        {/* Side Drawer Overlay */}
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[99998] transition-opacity duration-500 ${categoryMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
          onClick={() => setCategoryMenuOpen(false)}
        />

        {/* Sidebar Drawer */}
        <div className={`fixed left-0 top-0 h-full w-[280px] sm:w-[350px] bg-white z-[99999] shadow-2xl transition-transform duration-500 ease-in-out ${categoryMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold font-dm-sans text-[#262626]">Menu</h2>
            <button 
              onClick={() => setCategoryMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <RxCross2 className="text-2xl text-gray-500" />
            </button>
          </div>

          <div className="py-4 px-2 overflow-y-auto h-[calc(100%-80px)]">
            {/* Main Navigation */}
            <div className="mb-8 border-b border-gray-100 pb-4">
              <h3 className="px-6 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Navigation</h3>
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => setCategoryMenuOpen(false)}
                      className="block px-6 py-3.5 text-base font-dm-sans font-bold text-[#262626] hover:bg-gray-50 rounded-xl transition-all capitalize"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories Section */}
            <div>
              <h3 className="px-6 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Shop by Category</h3>
              {categoriesLoading ? (
                <div className="py-10 text-center text-gray-400 italic">Fetching categories...</div>
              ) : (
                <ul className="space-y-1">
                  {categoriesData?.data?.map((item) => (
                    <li key={item.id || item._id}>
                      <Link
                        to={`/category/${item.slug}`}
                        onClick={() => setCategoryMenuOpen(false)}
                        className="flex items-center justify-between px-6 py-3.5 rounded-xl text-gray-600 hover:text-[#262626] hover:bg-gray-50 hover:pl-8 transition-all duration-300 group"
                      >
                        <span className="font-dm-sans font-medium text-[15px] capitalize">{item.name}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <RiBarChartHorizontalLine className="rotate-90 scale-75" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 border-t border-gray-100 bg-gray-50/50">
            <p className="text-xs text-gray-400 font-dm-sans text-center italic">Discover our curated tech collections</p>
          </div>
        </div>
      </div>

      <Container>
        <Flex className="items-center justify-between gap-x-4 md:gap-x-8 lg:gap-x-12">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-x-4 lg:gap-x-0 order-1">
             {/* Hamburger for Mobile */}
             <button
                onClick={() => setCategoryMenuOpen(true)}
                className="lg:hidden p-1 text-[#262626] hover:text-black transition-colors"
              >
                <RiBarChartHorizontalLine className="text-2xl" />
              </button>

              <Link to="/" className="shrink-0">
                <Image
                  imageLink={orebiLogo}
                  altText="company-logo"
                  className="w-12 sm:w-16 md:w-20 lg:w-28"
                />
              </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-x-8 xl:gap-x-10 order-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => 
                  `text-sm xl:text-base font-dm-sans capitalize transition-all duration-300 relative py-1
                  ${isActive 
                    ? "font-bold text-black after:w-full" 
                    : "font-medium text-gray-500 hover:text-black after:w-0 hover:after:w-full"}
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black after:transition-all after:duration-300`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Search Box - Hidden on very small screens or flexible */}
          <div ref={searchRef} className="hidden sm:block flex-1 max-w-[500px] relative group order-2 lg:order-3">
            <div className="relative overflow-hidden rounded-full bg-gray-50 border border-gray-200 focus-within:border-[#262626] focus-within:bg-white focus-within:shadow-md transition-all duration-300">
              <input
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchShow(true);
                }}
                value={searchQuery}
                type="text"
                placeholder="Search products..."
                className="w-full py-2 md:py-2.5 pl-5 pr-12 bg-transparent outline-none text-sm text-[#262626] placeholder:text-gray-400 font-dm-sans"
              />
              <button className="absolute right-0 top-0 h-full px-4 text-gray-400 hover:text-[#262626] transition-colors">
                <FaSearch className="text-sm md:text-base" />
              </button>
            </div>

            {/* Desktop Search Results Dropdown */}
            {searchShow && searchQuery.length >= 2 && (
              <div className="absolute top-[110%] left-0 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="max-h-[400px] overflow-y-auto">
                  {searchLoading ? (
                    <div className="p-10 text-center text-gray-400 text-sm italic">Searching for "{searchQuery}"...</div>
                  ) : searchResults?.data?.length > 0 ? (
                    <>
                      <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Found {searchResults.meta.total} Results</span>
                      </div>
                      {searchResults.data.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.slug}`}
                          onClick={() => {
                            setSearchShow(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-x-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 group"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                            <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#262626] line-clamp-1">{product.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">${product.price}</p>
                          </div>
                        </Link>
                      ))}
                      <Link 
                        to={`/shop?search=${searchQuery}`}
                        onClick={() => {
                          setSearchShow(false);
                          setSearchQuery("");
                        }}
                        className="block w-full p-4 bg-gray-50 text-center text-xs font-bold text-[#262626] hover:bg-gray-100 transition-colors underline"
                      >
                        View all results
                      </Link>
                    </>
                  ) : (
                    <div className="p-10 text-center">
                      <p className="text-gray-400 text-sm font-medium">No results found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-x-4 md:gap-x-6 order-3 lg:order-4">
             {iconsJSX}
          </div>
        </Flex>

        {/* Mobile Only Search Bar (Row 2 for very small screens) */}
        <div className="sm:hidden mt-4 relative">
           <div className="relative overflow-hidden rounded-full bg-gray-50 border border-gray-200">
              <input
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchShow(true);
                }}
                value={searchQuery}
                type="text"
                placeholder="Search products..."
                className="w-full py-2.5 pl-6 pr-14 bg-transparent outline-none text-sm text-[#262626]"
              />
              <button className="absolute right-0 top-0 h-full px-6 text-gray-400">
                <FaSearch className="text-sm" />
              </button>
            </div>

            {/* Mobile Search Results Dropdown */}
            {searchShow && searchQuery.length >= 2 && (
              <div className="absolute top-[110%] left-0 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="max-h-[300px] overflow-y-auto">
                  {searchLoading ? (
                    <div className="p-8 text-center text-gray-400 text-sm italic">Searching...</div>
                  ) : searchResults?.data?.length > 0 ? (
                    <>
                      {searchResults.data.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.slug}`}
                          onClick={() => {
                            setSearchShow(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-x-4 p-4 hover:bg-gray-50 border-b border-gray-50 last:border-0"
                        >
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                            <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#262626] line-clamp-1">{product.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">${product.price}</p>
                          </div>
                        </Link>
                      ))}
                      <Link 
                        to={`/shop?search=${searchQuery}`}
                        onClick={() => {
                          setSearchShow(false);
                          setSearchQuery("");
                        }}
                        className="block w-full p-4 bg-gray-50 text-center text-xs font-bold text-[#262626] underline"
                      >
                        See all results
                      </Link>
                    </>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-gray-400 text-sm">No results found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
        </div>
      </Container>
    </section>

  );
};

export default Header;

