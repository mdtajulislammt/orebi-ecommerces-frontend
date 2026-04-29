import React, { useEffect, useRef, useState } from "react";
import Container from "../components/layout/Container";
import Flex from "../components/layout/Flex";
import BreadCrump from "../components/layout/BreadCrump";
import ShopSideBarDropDown from "../components/layout/ShopSideBarDropDown";
import { FaSearch, FaTimes, FaFilter, FaArrowLeft } from "react-icons/fa";
import { MdCancel, MdAutoAwesome } from "react-icons/md";
import { price as staticPriceData } from "../Demo Data/ProductCategoryData";
import Pagination from "../components/layout/Pagination";
import { useGetProductsQuery, useGetCategoriesQuery, useGetBrandsQuery } from "../features/api/apiSlice";

const Shop = () => {
  const [paginationItemShow, setPaginationItemShow] = useState(12);
  const [sideBarShow, setSideBarShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category_id: "",
    brand_id: "",
    color: "",
    min_price: "",
    max_price: "",
  });

  const categoryRef = useRef();
  const buttonRef = useRef();

  const { data: productsData, isLoading: isProductsLoading } = useGetProductsQuery({
    page: currentPage,
    limit: paginationItemShow,
    search: search || undefined,
    ...filters,
  });

  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: brandsData } = useGetBrandsQuery();

  useEffect(() => {
    const handleClick = (e) => {
      if (buttonRef.current && buttonRef.current.contains(e.target)) {
        setSideBarShow(true);
      } else if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setSideBarShow(false);
      }
    };
    document.body.addEventListener("click", handleClick);
    return () => document.body.removeEventListener("click", handleClick);
  }, []);

  const handleCategorySelect = (item) => {
    setFilters(prev => ({ ...prev, category_id: item.id || "" }));
    setCurrentPage(1);
    if (window.innerWidth < 640) setSideBarShow(false);
  };

  const handleBrandSelect = (item) => {
    setFilters(prev => ({ ...prev, brand_id: item.id || "" }));
    setCurrentPage(1);
    if (window.innerWidth < 640) setSideBarShow(false);
  };

  const handleColorSelect = (item) => {
    setFilters(prev => ({ ...prev, color: item.colorname || "" }));
    setCurrentPage(1);
    if (window.innerWidth < 640) setSideBarShow(false);
  };

  const handlePriceSelect = (item) => {
    const priceStr = item.name.replace(/\$/g, "");
    if (priceStr.includes("-")) {
      const parts = priceStr.split("-").map(p => p.trim());
      setFilters(prev => ({ ...prev, min_price: parts[0], max_price: parts[1] }));
    } else if (priceStr.includes("+")) {
      setFilters(prev => ({ ...prev, min_price: priceStr.replace("+", "").trim(), max_price: "" }));
    }
    setCurrentPage(1);
    if (window.innerWidth < 640) setSideBarShow(false);
  };

  const clearFilters = () => {
    setFilters({
      category_id: "",
      brand_id: "",
      color: "",
      min_price: "",
      max_price: "",
    });
    setSearch("");
    setCurrentPage(1);
  };

  const removeFilter = (key) => {
    if (key === 'price') {
      setFilters(prev => ({ ...prev, min_price: "", max_price: "" }));
    } else {
      setFilters(prev => ({ ...prev, [key]: "" }));
    }
    setCurrentPage(1);
  };

  const getActiveFilterName = (key, value) => {
    if (key === 'category_id') return categoriesData?.data?.find(c => c.id === value)?.name || "Category";
    if (key === 'brand_id') return brandsData?.data?.find(b => b.id === value)?.name || "Brand";
    if (key === 'color') return value;
    if (key === 'price') return `$${filters.min_price}${filters.max_price ? ` - $${filters.max_price}` : '+'}`;
    return value;
  };

  const colorsData = [
    { colorcode: "bg-teal-900", colorname: "Teal" },
    { colorcode: "bg-black", colorname: "Black" },
    { colorcode: "bg-gray-500", colorname: "Gray" },
    { colorcode: "bg-yellow-400", colorname: "Yellow" },
    { colorcode: "bg-green-500", colorname: "Green" },
    { colorcode: "bg-red-500", colorname: "Red" },
  ];

  const hasFilters = Object.values(filters).some(v => v !== "") || search !== "";

  return (
    <section className="py-10 bg-[#fafafa] min-h-screen font-poppins">
      <Container>
        <div className="mb-10 animate-[fadeIn_0.5s_ease-out]">
          <BreadCrump />
          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              Premium Collection
              <MdAutoAwesome className="text-primary-color animate-pulse" />
            </h1>
            <p className="text-gray-500 font-medium">
              Discover {productsData?.meta?.total_items || productsData?.meta?.total || 0} unique items crafted for you
            </p>
          </div>
        </div>
        
        <Flex className="justify-between gap-10 relative">
          {/* Sidebar - Desktop & Mobile Drawer */}
          <div
            ref={categoryRef}
            className={`${sideBarShow ? "translate-x-0" : "-translate-x-full sm:translate-x-0"} fixed sm:static top-0 left-0 h-full sm:h-auto w-full max-w-[320px] sm:w-[280px] bg-white sm:bg-transparent z-[100] sm:z-0 p-8 sm:p-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-2xl sm:shadow-none overflow-y-auto`}
          >
            <div className="flex items-center justify-between mb-10 sm:hidden">
              <button onClick={() => setSideBarShow(false)} className="flex items-center gap-2 text-gray-500 font-bold">
                <FaArrowLeft /> Back
              </button>
              <h2 className="text-xl font-black">Refine Search</h2>
            </div>

            <div className="space-y-2 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100/50">
              <ShopSideBarDropDown
              dropDownOn={true}
              dropDownTitle={"Categories"}
              data={Array.isArray(categoriesData) ? categoriesData : categoriesData?.data || categoriesData?.categories || []}
              onSelect={handleCategorySelect}
            />
            <ShopSideBarDropDown
              dropDownOn={true}
              dropDownTitle={"Brands"}
              data={Array.isArray(brandsData) ? brandsData : brandsData?.data || brandsData?.brands || []}
              onSelect={handleBrandSelect}
            />
              <ShopSideBarDropDown
                dropDownOn={true}
                dropDownTitle={"Colors"}
                data={colorsData}
                onSelect={handleColorSelect}
              />
              <ShopSideBarDropDown
                dropDownOn={true}
                dropDownTitle={"Price Range"}
                data={staticPriceData}
                onSelect={handlePriceSelect}
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Control Bar */}
            <div className="bg-white p-5 md:p-7 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/20 mb-10 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/30">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                
                {/* Search & Mobile Filter Toggle */}
                <div className="flex items-center gap-4 flex-1">
                  <button
                    ref={buttonRef}
                    className="flex sm:hidden items-center justify-center w-14 h-14 bg-black text-white rounded-2xl cursor-pointer hover:bg-gray-800 transition-all active:scale-95"
                  >
                    <FaFilter size={20} />
                  </button>
                  <div className="relative flex-1 group">
                    <input
                      type="text"
                      placeholder="What are you looking for today?"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/50 focus:bg-white focus:border-black focus:outline-none transition-all font-medium text-gray-700 group-hover:border-gray-200"
                    />
                    <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors text-xl" />
                  </div>
                </div>

                {/* Display Controls */}
                <div className="flex items-center justify-between sm:justify-end gap-8">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Show</span>
                    <select
                      value={paginationItemShow}
                      onChange={(e) => {
                        setPaginationItemShow(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-black outline-none focus:ring-2 focus:ring-black cursor-pointer transition-all hover:bg-gray-100"
                    >
                      <option value="12">12 Items</option>
                      <option value="24">24 Items</option>
                      <option value="48">48 Items</option>
                    </select>
                  </div>
                  
                  {hasFilters && (
                    <button
                      onClick={clearFilters}
                      className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2"
                    >
                      <FaTimes size={12} />
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Active Filter Indicators */}
              {hasFilters && (
                <div className="flex flex-wrap gap-3 mt-8 pt-8 border-t border-gray-50">
                  {filters.category_id && (
                    <FilterBadge label="Category" value={getActiveFilterName('category_id', filters.category_id)} onClear={() => removeFilter('category_id')} />
                  )}
                  {filters.brand_id && (
                    <FilterBadge label="Brand" value={getActiveFilterName('brand_id', filters.brand_id)} onClear={() => removeFilter('brand_id')} />
                  )}
                  {filters.color && (
                    <FilterBadge label="Color" value={filters.color} onClear={() => removeFilter('color')} />
                  )}
                  {filters.min_price && (
                    <FilterBadge label="Price" value={getActiveFilterName('price')} onClear={() => removeFilter('price')} />
                  )}
                  {search && (
                    <FilterBadge label="Search" value={`"${search}"`} onClear={() => setSearch("")} />
                  )}
                </div>
              )}
            </div>

            {/* Products Grid */}
            <div className="min-h-[600px] relative">
              {isProductsLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#fafafa]/50 backdrop-blur-[2px] z-10 rounded-[3rem]">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-black rounded-full animate-spin"></div>
                  </div>
                  <p className="mt-6 text-gray-400 font-bold tracking-widest uppercase animate-pulse">Curating products...</p>
                </div>
              ) : (
                <div className="animate-[fadeIn_0.6s_ease-out]">
                  <Pagination
                    itemsPerPage={paginationItemShow}
                    products={productsData?.data || []}
                    totalItems={productsData?.meta?.total_items || productsData?.meta?.total || 0}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>
          </div>
        </Flex>
      </Container>
    </section>
  );
};

const FilterBadge = ({ label, value, onClear }) => (
  <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 pl-4 pr-2 py-2 rounded-2xl hover:border-black transition-all group">
    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{label}</span>
    <span className="text-sm font-bold text-gray-700">{value}</span>
    <button onClick={onClear} className="w-6 h-6 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-black hover:text-white transition-all">
      <FaTimes size={10} />
    </button>
  </div>
);

export default Shop;



