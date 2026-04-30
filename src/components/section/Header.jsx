import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, removeFromWishlist } from "../../features/orebi/orebiSlice";
import { useGetCategoriesQuery } from "../../features/api/apiSlice";
// components
import Container from "../layout/Container";
import Flex from "../layout/Flex";
import Paragraph from "../layout/Paragraph";
import Input from "../layout/Input";
import Button from "../layout/Button";
import Image from "../layout/Image";
import Heading from "../layout/Heading";
import List from "../layout/List";
import ListItem from "../layout/ListItem";
// react icons
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { FaSearch, FaUser } from "react-icons/fa";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { FaCartShopping, FaRegHeart } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
// image
import headphoneImage from "../../assets/headphone.png";
import capImage from "../../assets/cap.png";

import { logout } from "../../features/auth/authSlice";

const Header = () => {
  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery();
  
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  let categoryRef = useRef();

  const [accountDropDownShow, setAccountDropDownShow] = useState(false);
  let accountRef = useRef();

  const [addToCartShow, setAddToCartShow] = useState(false);
  let addToCartRef = useRef();

  const [wishlistDropDownShow, setWishlistDropDownShow] = useState(false);
  let wishlistRef = useRef();

  const cart = useSelector((state) => state.orebi?.cart || []);
  const wishlist = useSelector((state) => state.orebi?.wishlist || []);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const totalAmount = Array.isArray(cart) ? cart.reduce((total, item) => {
    const price = typeof item.productPrice === 'string' 
      ? parseFloat(item.productPrice.replace("$", "")) 
      : item.productPrice;
    return total + price * item.quantity;
  }, 0) : 0;

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setCategoryMenuOpen(false);
      }

      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountDropDownShow(false);
      }

      if (addToCartRef.current && !addToCartRef.current.contains(e.target)) {
        setAddToCartShow(false);
      }

      if (wishlistRef.current && !wishlistRef.current.contains(e.target)) {
        setWishlistDropDownShow(false);
      }
    });
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setAccountDropDownShow(false);
  };

  return (
    <section className="bg-[#f5f5f3] py-2 sm:py-3 lg:py-4 ">
      <Container>
        <Flex className="items-center justify-between">
          <div ref={categoryRef} className="relative">
            <Button
              onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
              className="flex items-center gap-x-1 md:gap-x-2.5 font-dm-sans text-sm capitalize"
              text={
                <span className="hidden sm:inline-block text-sm md:text-[15px] lg:text-lg font-bold">
                  Shop by Category
                </span>
              }
              iconAlighnment={"left"}
              icon={
                <RiBarChartHorizontalLine className="sm:text-sm md:text-base lg:text-lg" />
              }
            />
            <List
              className={`[&>*:nth-last-child(1)]:border-none w-[150px] sm:w-[200px] md:w-[240px] lg:w-[260px] font-dm-sans capitalize bg-primary-color text-white !z-20 absolute left-0 top-[27px] md:top-[32px] lg:top-[42px] duration-200 ease-linear shadow-xl rounded-b-md ${categoryMenuOpen ? " translate-y-0 opacity-100 visible" : " translate-y-5 opacity-0 invisible"}`}
            >
              {categoriesLoading ? (
                <ListItem className="py-4 px-5 text-sm text-gray-400">Loading...</ListItem>
              ) : (
                categoriesData?.data?.map((item) => (
                  <ListItem
                    key={item._id}
                    onClick={() => setCategoryMenuOpen(false)}
                  >
                    <Link
                      to={`/category/${item.slug}`}
                      className={
                        " py-3 md:py-4 px-5 text-[15px] border-b-[1px] border-gray-600/50 ease-in duration-200 opacity-80 hover:opacity-100 hover:text-white hover:pl-8 capitalize block text-xs sm:text-sm md:base lg:text-base font-medium"
                      }
                    >
                      {item.name}
                    </Link>
                  </ListItem>
                ))
              )}
            </List>
          </div>

          <div className="search-box w-[180px] sm:w-[320px] md:w-[400px] lg:w-[500px] xl:w-[600px] bg-white rounded relative">
            <Input
              type={"text"}
              placeholder={"search products"}
              className={
                "w-full py-1 sm:py-2.5 md:py-2 lg:py-3 pl-2.5 md:pl-4 pr-[28px] md:pr-[53px] lg:pr-[54px] placeholder:text-xs md:placeholder:text-[13px] lg:placeholder:text-base md:text-base text-xs placeholder:text-[#C4C4C4] font-dm-sans capitalize"
              }
            />
            <Button
              text={<FaSearch className="text-xs md:text-sm lg:text-lg" />}
              className={
                " absolute right-0 top-0 py-2 sm:py-3 px-2 md:py-4 lg:py-[16px] md:px-4 lg:px-[18px]"
              }
            />
          </div>

          <div className="account-and-cart-icons relative">
            <Flex
              className={"flex items-center gap-x-3 md:gap-x-4 lg:gap-x-10"}
            >
              <div ref={accountRef} className={"relative z-10"}>
                {token ? (
                  <>
                    <Button
                      onClick={() => setAccountDropDownShow(!accountDropDownShow)}
                      className={"flex justify-center gap-x-[2px] sm:gap-x-1"}
                      text={<FaUser className="text-sm md:text-base lg:text-lg" />}
                      icon={
                        <GoTriangleDown
                          className={`xl:text-xl text-sm md:text-base  lg:text-lg transition duration-[.4s] ${accountDropDownShow ? "-rotate-180" : "rotate-0"}`}
                        />
                      }
                      iconAlighnment={"right"}
                    />

                    <List
                      className={`w-[100px] sm:w-[130px] md:w-[160px] lg:w-[200px] group font-dm-sans capitalize text-center bg-white border text-[#ada8a8] absolute top-[27px] md:top-[32px] lg:top-[37px] right-0 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] [&>*:last-child]:border-none duration-200 ease-linear ${accountDropDownShow ? " translate-y-0 opacity-100 visible" : " -translate-y-3 opacity-0 invisible"}`}
                    >
                      <ListItem
                        onClick={() => setAccountDropDownShow(false)}
                        className={
                          " py-2.5 md:py-4 text-xs sm:text-sm lg:text-base md:px-5 border-b-[1px] ease-in duration-200 text-primary-color hover:bg-primary-color hover:text-white"
                        }
                      >
                        <Link to={"/my-account"}>my account</Link>
                      </ListItem>
                      <ListItem
                        onClick={handleLogout}
                        className={
                          " py-2.5 md:py-4 text-xs sm:text-sm lg:text-base md:px-5 border-b-[1px] ease-in duration-200 text-primary-color hover:bg-primary-color hover:text-white cursor-pointer"
                        }
                      >
                        log out
                      </ListItem>
                    </List>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="font-dm-sans font-bold text-sm md:text-base lg:text-lg text-primary-color hover:text-secondary-color transition duration-300"
                  >
                    Login
                  </Link>
                )}
              </div>
              <div ref={wishlistRef} className={"relative z-10"}>
                <Button
                  onClick={() => setWishlistDropDownShow(!wishlistDropDownShow)}
                  className={"flex items-center relative"}
                  iconAlighnment={"right"}
                  icon={
                    <>
                      <FaRegHeart className="xl:text-xl text-sm md:text-base lg:text-lg" />
                      {wishlist.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary-color text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                          {wishlist.length}
                        </span>
                      )}
                    </>
                  }
                />
                <div
                  className={`wishlist-box w-[280px] sm:w-[360px] [&>*:nth-last-child(1)]:border-none bg-white border border-white absolute top-[27px] md:top-[32px] lg:top-[37px] right-0 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] duration-200 ease-linear ${wishlistDropDownShow ? " translate-y-0 xl:translate-x-0 opacity-100 visible" : "-translate-y-5 xl:translate-y-0 xl:translate-x-10 opacity-0 invisible"}`}
                >
                  {wishlist.length > 0 ? (
                    wishlist.map((item) => (
                      <div key={item.id || item.productName} className="w-full flex justify-between bg-[#f5f5f5] border-b-2 border-white p-5">
                        <div className="flex items-center w-10/12 item-information gap-x-2 sm:gap-x-5">
                          <div className="item-images">
                            <Image
                              imageLink={item.productImageSrc}
                              altText={"wishlist-item"}
                              className={"w-14 sm:w-20"}
                            />
                          </div>
                          <div className="text-sm font-bold font-dm-sans">
                            <Heading
                              tagname="h3"
                              text={item.productName}
                              className="mb-1 sm:mb-2 text-xs sm:text-[14px] leading-5"
                            />
                            <Paragraph
                              text={item.productPrice}
                              classname={"text-xs sm:text-[14px] leading-5"}
                            />
                            <button
                              onClick={() => {
                                dispatch(addToCart(item));
                                dispatch(removeFromWishlist(item.id || item.productName));
                              }}
                              className="text-[10px] sm:text-xs text-primary-color underline mt-1 font-bold"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                        <Button 
                          onClick={() => dispatch(removeFromWishlist(item.id || item.productName))}
                          text={<RxCross2 className="sm:text-2xl" />} 
                        />
                      </div>
                    ))
                  ) : (
                    <div className="p-10 text-center font-dm-sans text-secondary-color">
                      Your wishlist is empty.
                    </div>
                  )}
                  <div className="px-5 pt-4 pb-5">
                    <Link
                      onClick={() => setWishlistDropDownShow(false)}
                      to={"/wishlist"}
                      className="py-2 sm:py-3 px-5 sm:px-9 mt-3 border border-[#2B2B2B] bg-black text-white font-dm-sans text-sm sm:text-base sm:leading-6 font-bold capitalize block text-center"
                    >
                      view wishlist
                    </Link>
                  </div>
                </div>
              </div>
              <div ref={addToCartRef} className={"relative z-10"}>
                <Button
                  onClick={() => setAddToCartShow(!addToCartShow)}
                  className={"flex items-center relative"}
                  iconAlighnment={"right"}
                  icon={
                    <>
                      <FaCartShopping className="xl:text-xl text-sm md:text-base lg:text-lg" />
                      {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary-color text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                          {cart.length}
                        </span>
                      )}
                    </>
                  }
                />
                <div
                  className={`cart-box w-[280px] sm:w-[360px] [&>*:nth-last-child(1)]:border-none bg-white border border-white absolute top-[27px] md:top-[32px] lg:top-[37px] right-0 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] duration-200 ease-linear ${addToCartShow ? " translate-y-0 xl:translate-x-0 opacity-100 visible" : "-translate-y-5 xl:translate-y-0 xl:translate-x-10 opacity-0 invisible"}`}
                >
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <div key={item.id || item.productName} className="w-full flex justify-between bg-[#f5f5f5] border-b-2 border-white p-5">
                        <div className="flex items-center w-10/12 item-information gap-x-2 sm:gap-x-5">
                          <div className="item-images">
                            <Image
                              imageLink={item.productImageSrc}
                              altText={"cart-item"}
                              className={"w-14 sm:w-20"}
                            />
                          </div>
                          <div className="text-sm font-bold font-dm-sans">
                            <Heading
                              tagname="h3"
                              text={item.productName}
                              className="mb-1 sm:mb-2 text-xs sm:text-[14px] leading-5"
                            />
                            <Paragraph
                              text={`${item.productPrice} x ${item.quantity}`}
                              classname={"text-xs sm:text-[14px] leading-5"}
                            />
                          </div>
                        </div>
                        <Button 
                          onClick={() => dispatch(removeFromCart(item.id || item.productName))}
                          text={<RxCross2 className="sm:text-2xl" />} 
                        />
                      </div>
                    ))
                  ) : (
                    <div className="p-10 text-center font-dm-sans text-secondary-color">
                      Your cart is empty.
                    </div>
                  )}
                  <div className="px-5 pt-4 pb-5 total-price">
                    <Heading
                      tagname="h4"
                      text={[
                        <span className="text-[#767676]">Subtotal:</span>,
                        ` $${totalAmount.toFixed(2)}`,
                      ]}
                      className=" font-dm-sans font-bold text-xs sm:text-[16px]"
                    />
                    <div className="flex justify-between buttons">
                      <Link
                        onClick={() => setAddToCartShow(false)}
                        to={"/cart"}
                        className="py-2 sm:py-3 px-5 sm:px-9 mt-3 border border-[#2B2B2B] text-black font-dm-sans text-sm sm:text-base sm:leading-6 font-bold capitalize"
                      >
                        view cart
                      </Link>
                      <Link
                        onClick={() => setAddToCartShow(false)}
                        to={"/checkout"}
                        className="py-2 sm:py-3 px-5 sm:px-9 mt-3 border border-[#2B2B2B] bg-black text-white font-dm-sans text-sm sm:text-base sm:leading-6 font-bold capitalize"
                      >
                        checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Flex>
          </div>
        </Flex>
      </Container>
    </section>
  );
};

export default Header;
