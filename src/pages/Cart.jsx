import React from "react";
import Container from "../components/layout/Container";
import Flex from "../components/layout/Flex";
import BreadCrump from "../components/layout/BreadCrump";
import Paragraph from "../components/layout/Paragraph";
import Button from "../components/layout/Button";
import Image from "../components/layout/Image";
import Input from "../components/layout/Input";
import CusButton from "../components/layout/CusButton";
import { RxCross2 } from "react-icons/rx";
import { FaMinus, FaPlus } from "react-icons/fa6";
import Heading from "../components/layout/Heading";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../features/orebi/orebiSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.orebi?.cart || []);

  const totalAmount = Array.isArray(cart) ? cart.reduce((total, item) => {
    const price = parseFloat(item.productPrice.replace("৳", "").replace("$", ""));
    return total + price * item.quantity;
  }, 0) : 0;

  return (
    <section>
      <Container>
        <BreadCrump />
        {cart.length > 0 ? (
          <>
            <Flex
              className={`bg-[#f5f5f3] justify-between items-center py-8 px-2.5 mt-16 capitalize text-sm md:text-base`}
            >
              <Paragraph classname={"sm:w-[40%]"} text="product" />
              <Paragraph classname={"sm:w-[15%]"} text="price" />
              <Paragraph classname={"sm:w-[15%]"} text="size" />
              <Paragraph classname={"sm:w-[15%]"} text="quantity" />
              <Paragraph classname={"sm:w-[15%]"} text="Total" />
            </Flex>
            {cart.map((item) => (
              <Flex
                key={item.id || item.productName}
                className={
                  "Product-item items-center py-7 px-3 border-t-0 bg-white border-[2px] border-[#f0f0f0]"
                }
              >
                <div className="w-[40%]">
                  <Flex className={"items-center gap-x-2.5"}>
                    <picture>
                      <Image
                        imageLink={item.productImageSrc}
                        altText={"cart image"}
                        className={"w-[80px] md:w-[100px]"}
                      />
                    </picture>
                    <Paragraph
                      text={item.productName}
                      classname={"font-dm-sans text-[13px] md:text-lg font-bold"}
                    />
                  </Flex>
                </div>
                <div className="w-[15%]">
                  <Paragraph
                    text={item.productPrice}
                    classname={"font-dm-sans"}
                  />
                </div>
                <div className="w-[15%]">
                  <select
                    name=""
                    id=""
                    className="capitalize md:w-[100px] border px-2.5 py-1 outline-none"
                  >
                    <option value="m">m</option>
                    <option value="s">s</option>
                    <option value="l">l</option>
                    <option value="xl">xl</option>
                    <option value="2xl">2xl</option>
                  </select>
                </div>
                <div className="sm:w-[16%] md:w-[15%]">
                  <Flex className="justify-between items-center w-[100px] md:w-[140px] text-secondary-color border-[2px] border-[#F0F0F0] outline-none">
                    <Button
                      onClick={() => dispatch(decrementQuantity(item.id || item.productName))}
                      icon={<FaMinus />}
                      iconAlighnment={"left"}
                      className={"px-3 py-[7px] sm:py-[4x] md:py-[9px]"}
                    />
                    {item.quantity}
                    <Button
                      onClick={() => dispatch(incrementQuantity(item.id || item.productName))}
                      icon={<FaPlus />}
                      iconAlighnment={"left"}
                      className={"px-3 py-[7px] sm:py-[4x] md:py-[9px]"}
                    />
                  </Flex>
                </div>
                <div className="sm:w-[14%] md:w-[15%]">
                  <Flex className="items-center justify-between">
                    <Paragraph
                      text={`৳${(parseFloat(item.productPrice.replace("৳", "").replace("$", "")) * item.quantity).toFixed(2)}`}
                      classname={"sm:text-sm md:text-base font-bold"}
                    />
                    <RxCross2
                      onClick={() => dispatch(removeFromCart(item.id || item.productName))}
                      className="lg:text-[25px] cursor-pointer hover:text-red-500 transition-colors"
                    />
                  </Flex>
                </div>
              </Flex>
            ))}

            <Flex
              className={
                "justify-between items-center px-3 py-5 border-t-0 border-[2px] border-[#f0f0f0]"
              }
            >
              <Input
                type={"text"}
                placeholder={"Apply coupon here.."}
                className={
                  "outline-none placeholder:text-primary-color sm:placeholder:text-sm md:placeholder:text-lg"
                }
              />
              <Button
                text={"update cart"}
                className={"capitalize sm:text-sm md:text-base"}
              />
            </Flex>
            <Flex className={"justify-end"}>
              <div className="text-end w-full sm:w-[350px] md:w-[400px] lg:w-[500px] xl:w-[600px]">
                <Heading
                  tagname="h5"
                  text="Cart Totals"
                  className="text-base sm:text-lg md:text-[20px] font-bold mb-6 mt-12"
                />
                <table className="w-full border-[2px] border-[#f0f0f0] text-start">
                  <tbody>
                    <tr>
                      <td className="w-2/4 border-[2px] border-[#f0f0f0] py-4 px-5 font-bold">
                        Subtotal
                      </td>
                      <td className="w-2/4 border-[2px] border-[#f0f0f0] py-4 px-5">
                        ৳{totalAmount.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-2/4 border-[2px] border-[#f0f0f0] py-4 px-5 font-bold">
                        Discount
                      </td>
                      <td className="w-2/4 border-[2px] border-[#f0f0f0] py-4 px-5">
                        0%
                      </td>
                    </tr>
                    <tr>
                      <td className="w-2/4 border-[2px] border-[#f0f0f0] py-4 px-5 font-bold">
                        Total
                      </td>
                      <td className="w-2/4 border-[2px] border-[#f0f0f0] py-4 px-5 text-xl font-bold">
                        ৳{totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Link to={"/checkout"}>
                  <CusButton text={"Proceed to Checkout"} className={"mt-8 w-full"} />
                </Link>
              </div>
            </Flex>
          </>
        ) : (
          <div className="text-center py-20">
            <Heading text="Your cart is lonely." className="text-3xl font-bold mb-4" />
            <Paragraph text="Add some amazing items to make it happy!" classname="mb-10 text-secondary-color" />
            <Link to="/shop">
              <CusButton text="Continue Shopping" />
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Cart;
