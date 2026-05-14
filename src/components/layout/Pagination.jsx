import React from "react";
import ReactPaginate from "react-paginate";
import ProductCard from "../layout/ProductCard";
import Paragraph from "./Paragraph";
import { Link } from "react-router-dom";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

function Items({ currentItems }) {
  if (!currentItems || currentItems.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 animate-[fadeIn_0.5s_ease-out]">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <MdOutlineProductionQuantityLimits size={40} className="text-gray-300" />
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-2 font-poppins">No matches found</h3>
        <p className="text-gray-400 font-medium font-poppins">Try adjusting your filters or search terms</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {currentItems.map((item, index) => (
        <div
          key={item.id || index}
          className="animate-[fadeIn_0.4s_ease-out]"
          style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "both" }}
        >
          <Link to={`/product/${item.slug || item.id}`}>
            <ProductCard
              className="w-full"
              productImageLink={item.thumbnail || item.productImageSrc}
              tag={item.discount_price > 0 ? `${Math.round(((Number(item.price) - Number(item.discount_price)) / Number(item.price)) * 100)}% OFF` : null}
              productName={item.name || item.productName}
              productPrice={`৳${item.discount_price > 0 ? item.discount_price : item.price}`}
              productColor={item.colors?.[0] || item.productColor}
              id={item.id}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

function Pagination({ itemsPerPage, products, totalItems, onPageChange, currentPage }) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  
  const handlePageClick = (event) => {
    onPageChange(event.selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startIdx = (currentPage - 1) * itemsPerPage + 1;
  const endIdx = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <>
      <Items currentItems={products} />
      
      {totalItems > itemsPerPage && (
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-8 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50">
          <ReactPaginate
            nextLabel="Next"
            previousLabel="Prev"
            onPageChange={handlePageClick}
            forcePage={currentPage - 1}
            containerClassName="flex items-center gap-2"
            activeLinkClassName="!bg-black !text-white !border-black shadow-lg"
            pageRangeDisplayed={3}
            breakLabel="..."
            breakLinkClassName="w-10 h-10 flex items-center justify-center text-gray-400 font-bold"
            marginPagesDisplayed={1}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            pageLinkClassName="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-transparent text-gray-500 font-bold hover:bg-gray-50 hover:border-gray-100 transition-all duration-300"
            previousLinkClassName="px-4 py-2 rounded-xl font-bold text-sm text-gray-400 hover:text-black transition-colors"
            nextLinkClassName="px-4 py-2 rounded-xl font-bold text-sm text-gray-400 hover:text-black transition-colors"
          />
          <p className="font-poppins font-bold text-gray-400 text-sm tracking-wide">
            Showing <span className="text-black">{startIdx}-{endIdx}</span> of <span className="text-black">{totalItems}</span> amazing products
          </p>
        </div>
      )}
    </>
  );
}

export default Pagination;


