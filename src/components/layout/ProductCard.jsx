import React from "react";
import Image from "../layout/Image";
import Heading from "../layout/Heading";
import Paragraph from "../layout/Paragraph";
import Flex from "../layout/Flex";
import Button from "../layout/Button";
import { FaRegHeart, FaShoppingCart, FaExchangeAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../../features/orebi/orebiSlice";

const ProductCard = ({
  className,
  tag,
  productImageLink,
  productName,
  productPrice,
  productColor,
  id,
}) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        id: id || productName,
        productName,
        productPrice,
        productColor,
        productImageSrc: productImageLink,
      })
    );
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToWishlist({
        id: id || productName,
        productName,
        productPrice,
        productColor,
        productImageSrc: productImageLink,
      })
    );
  };

  return (
    <div className={`${className} group relative bg-white rounded-xl transition-all duration-500 hover:shadow-2xl border border-transparent hover:border-gray-100 overflow-hidden`}>
      <div className="relative overflow-hidden aspect-[4/5] bg-gray-50 flex items-center justify-center">
        <div className="w-full h-full transition-transform duration-700 group-hover:scale-110">
          <Image
            imageLink={productImageLink}
            altText={productName}
            className="w-full h-full object-cover"
          />
        </div>
        
        {tag && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-black text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
              {tag}
            </span>
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
          <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl space-y-3">
            <button
              onClick={handleAddToWishlist}
              className="w-full flex items-center justify-between text-gray-500 hover:text-black transition-colors font-dm-sans text-sm font-bold group/btn"
            >
              Add to Wishlist
              <FaRegHeart className="group-hover/btn:scale-125 transition-transform" />
            </button>
            <div className="h-[1px] bg-gray-100 w-full" />
            {/* <button
              className="w-full flex items-center justify-between text-gray-500 hover:text-black transition-colors font-dm-sans text-sm font-bold group/btn"
            >
              Compare
              <FaExchangeAlt className="group-hover/btn:scale-125 transition-transform" />
            </button> */}
            <div className="h-[1px] bg-gray-100 w-full" />
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-between text-black hover:text-primary-color transition-colors font-dm-sans text-sm font-black group/btn"
            >
              Add to Cart
              <FaShoppingCart className="group-hover/btn:scale-125 transition-transform text-primary-color" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm md:text-base lg:text-lg font-bold font-dm-sans line-clamp-1 group-hover:text-primary-color transition-colors">
            {productName}
          </h3>
          <span className="text-sm md:text-base font-black text-gray-900 font-dm-sans">
            {productPrice}
          </span>
        </div>
        
        {productColor && (
          <p className="text-xs md:text-sm text-gray-400 font-medium font-dm-sans capitalize">
            {productColor}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

