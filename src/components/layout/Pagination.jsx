import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ProductCard from "../layout/ProductCard";
import productThree from "../../assets/p10.png";
import Paragraph from "./Paragraph";
import { Link } from "react-router-dom";

import { productInfo } from "../../Demo Data/ProductCategoryData";

const items = [...productInfo];

function Items({ currentItems, startIndex }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item, index) => (
          <div
            key={index}
            className="sm:w-[49%] lg:w-[32%] mb-4 md:mb-5 lg:mb-6 animate-[fadeIn_0.4s_ease-out]"
            style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "both" }}
          >
            <Link to={`/product/${startIndex + index}`}>
              <ProductCard
                className="w-full mb-3 hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden cursor-pointer"
                productImageLink={item.productImageSrc}
                tag={item.badgeText}
                tagVisibility={item.badge}
                productName={item.productName}
                productPrice={item.productPrice}
                productColor={item.productColor}
              />
            </Link>
          </div>
        ))}
    </>
  );
}

function Pagination({ itemsPerPage }) {
  const [itemOffset, setItemOffset] = useState(5);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;

    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="flex justify-between flex-wrap">
        <Items currentItems={currentItems} startIndex={itemOffset} className={"kaj-kortace"} />
      </div>
      <div className="mt-8 md:mt-10 lg:mt-12 lg:flex justify-between items-center">
        <ReactPaginate
          onPageChange={handlePageClick}
          containerClassName="flex gap-x-1.5 sm:gap-x-2 md:gap-x-3"
          activeLinkClassName="!bg-primary-color !text-white !border-primary-color shadow-md"
          previousLinkClassName="hidden"
          pageRangeDisplayed={4}
          breakLabel="..."
          breakLinkClassName="px-4 text-secondary-color"
          marginPagesDisplayed={2}
          nextLinkClassName="hidden"
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          pageLinkClassName="px-2.5 md:px-4 py-1.5 md:py-2.5 text-[#767676] border border-[#e0e0e0] rounded-md font-dm-sans text-sm md:text-base hover:bg-[#f5f5f5] hover:border-[#ccc] transition-all duration-200 cursor-pointer"
        />
        <Paragraph
          text={`Products from ${itemOffset + 1} to ${Math.min(endOffset, items.length)} of ${items.length}`}
          classname={
            "pt-4 md:pt-5 lg:pt-0 font-dm-sans text-secondary-color text-sm md:text-base"
          }
        />
      </div>
    </>
  );
}

export default Pagination;
