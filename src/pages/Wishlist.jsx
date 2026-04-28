import React from "react";
import Container from "../components/layout/Container";
import Flex from "../components/layout/Flex";
import BreadCrump from "../components/layout/BreadCrump";
import Paragraph from "../components/layout/Paragraph";
import Button from "../components/layout/Button";
import Image from "../components/layout/Image";
import Heading from "../components/layout/Heading";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromWishlist } from "../features/orebi/orebiSlice";
import { RxCross2 } from "react-icons/rx";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.orebi?.wishlist || []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product.id || product.productName));
  };

  return (
    <section className="mb-20">
      <Container>
        <BreadCrump />
        <Heading
          text="My Wishlist"
          className="text-3xl font-bold font-dm-sans mt-10 mb-8"
        />
        {wishlist.length > 0 ? (
          <div className="border border-[#F0F0F0]">
            <Flex className="bg-[#F5F5F3] py-4 px-6 font-bold uppercase text-sm md:text-base border-b border-[#F0F0F0]">
              <div className="w-[45%]">Product</div>
              <div className="w-[20%] text-center">Unit Price</div>
              <div className="w-[15%] text-center">Stock Status</div>
              <div className="w-[20%] text-center">Action</div>
            </Flex>
            {wishlist.map((item) => (
              <Flex
                key={item.id || item.productName}
                className="items-center py-6 px-6 border-b border-[#F0F0F0] last:border-none"
              >
                <div className="w-[45%] flex items-center gap-x-5">
                  <RxCross2
                    onClick={() => dispatch(removeFromWishlist(item.id || item.productName))}
                    className="cursor-pointer hover:text-red-500 transition-colors text-xl"
                  />
                  <Image
                    imageLink={item.productImageSrc}
                    className="w-20 md:w-24 bg-[#F5F5F3]"
                  />
                  <Paragraph
                    text={item.productName}
                    classname="font-bold text-sm md:text-base"
                  />
                </div>
                <div className="w-[20%] text-center font-dm-sans font-bold">
                  {item.productPrice}
                </div>
                <div className="w-[15%] text-center text-green-600 font-bold text-sm">
                  In Stock
                </div>
                <div className="w-[20%] text-center">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-primary-color text-white py-2 px-4 md:px-6 text-sm font-bold font-dm-sans hover:bg-[#3a3a3a] transition-all rounded-sm uppercase"
                  >
                    Add to Cart
                  </button>
                </div>
              </Flex>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4">
            <div className="mb-6">
              <span className="text-6xl text-gray-200">❤️</span>
            </div>
            <Heading
              text="Your Wishlist is empty."
              className="text-2xl font-bold mb-4"
            />
            <Paragraph
              text="Add your favorite items to your wishlist and they will appear here."
              classname="mb-10 text-secondary-color"
            />
            <Link to="/shop">
              <button className="bg-primary-color text-white py-3 px-10 font-bold hover:bg-[#3a3a3a] transition-all uppercase rounded-sm">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Wishlist;
