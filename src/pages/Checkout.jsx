import React from "react";
import Container from "../components/layout/Container";
import BreadCrump from "../components/layout/BreadCrump";
import Heading from "../components/layout/Heading";
import InputBox from "../components/layout/InputBox";
import Textarea from "../components/layout/Textarea";
import CusButton from "../components/layout/CusButton";
import Flex from "../components/layout/Flex";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/orebi/orebiSlice";
import { toast } from "react-toastify";

const country = [
  { id: 0, name: "please select" },
  { id: 1, name: "Barishal" },
  { id: 2, name: "Chattogram" },
  { id: 3, name: "Dhaka" },
  { id: 4, name: "Khulna" },
  { id: 5, name: "Mymensingh" },
  { id: 6, name: "Rajshahi" },
  { id: 7, name: "Rangpur" },
  { id: 8, name: "Sylhet" },
  
];

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.orebi?.cart || []);
  const totalAmount = Array.isArray(cart) ? cart.reduce((total, item) => {
    const price = parseFloat(item.productPrice.replace("$", ""));
    return total + price * item.quantity;
  }, 0) : 0;

  const { token } = useSelector((state) => state.auth);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    if (!token) {
      toast.warn("Please login to proceed with your order.");
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    
    dispatch(clearCart());
    toast.success("Order placed successfully!");
    navigate("/order-success");
  };

  return (
    <section>
      <Container>
        <BreadCrump />
        <form
          action=""
          className=" mt-4 sm:mt-7 md:mt-10 lg:mt-13 xl:mt-16 w-full sm:w-3/4 mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16"
        >
          <Heading
            tagname={"h3"}
            text={"Billing Details"}
            className=" font-dm-sans font-bold text-primary-color text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] 2xl:text-[40px] mb-7"
          />
          <Flex className={"gap-x-10"}>
            <InputBox
              className={"mb-5 sm:mb-6 md:mb-7 lg:mb-8 w-2/4"}
              labelText="First Name *"
              id={"firstname"}
              type="text"
              placeholder="first name"
            />
            <InputBox
              className={"mb-5 sm:mb-6 md:mb-7 lg:mb-8 w-2/4"}
              labelText="last name *"
              id={"lastname"}
              type="text"
              placeholder="last name"
            />
          </Flex>
          <InputBox
            className={"mb-5 sm:mb-6 md:mb-7 lg:mb-8 w-full"}
            labelText="Company Name (optional)"
            id={"comapny"}
            type="text"
            placeholder="Company Name"
          />
          <Flex
            className={
              "flex-col mb-5 sm:mb-6 md:mb-7 lg:mb-8 w-full border-b-[1px] text-secondary-color border-[#D8D8D8]"
            }
          >
            <label
              htmlFor="country"
              className="font-bold text-secondary-color font-dm-sans text-sm sm:text-[15px] md:text-base capitalize"
            >
              country*
            </label>
            <select
              name="country"
              id="country"
              className="py-2.5 outline-none text-sm sm:text-[15px] md:text-base"
            >
              {country.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
          </Flex>
          <InputBox
            className={"mb-5 sm:mb-6 md:mb-7 lg:mb-8 w-full"}
            labelText="street address *"
            id={"street"}
            type="text"
            placeholder="House number and street name"
          />
          <InputBox
            className={"mb-5 sm:mb-6 md:mb-7 lg:mb-8 w-full"}
            labelText="Town/City *"
            id={"city"}
            type="text"
            placeholder="Town/City"
          />
          <InputBox
            className={"mb-5 sm:mb-6 md:mb-7 lg:mb-8 w-full"}
            labelText="Post Code *"
            id={"postcode"}
            type="text"
            placeholder="Post Code"
          />
          <InputBox
            className={"mb-5 sm:mb-6 md:mb-7 lg:mb-8 w-full"}
            labelText="Phone"
            id={"Phone"}
            type="text"
            placeholder="Phone"
          />
          <InputBox
            className={"mb-5 sm:mb-6 md:mb-7 lg:mb-8 w-full"}
            labelText="Email Address"
            id={"email"}
            type="text"
            placeholder="Email"
          />
        </form>
        <form
          action=""
          className=" mt-4 sm:mt-7 md:mt-10 lg:mt-13 xl:mt-16 w-full sm:w-3/4 mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16"
        >
          <Heading
            tagname={"h3"}
            text={"Additional Information"}
            className=" font-dm-sans font-bold text-primary-color text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] 2xl:text-[40px] mb-7"
          />
          <Textarea
            className={"mb-5 sm:mb-6 md:mb-7 lg:mb-8"}
            labelText="Other Notes (optional)"
            id={"messege"}
            placeholder={
              "Notes about your order, e.g. special notes for delivery."
            }
          />

          <Heading
            tagname={"h3"}
            text={"Your Order"}
            className="font-dm-sans font-bold text-primary-color text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] 2xl:text-[40px] mb-7 mt-10"
          />
          <div className="w-full sm:w-2/3">
            <table className="w-full border-[2px] border-[#f0f0f0] text-start mb-8">
              <thead>
                <tr>
                  <th className="text-start border-[2px] border-[#f0f0f0] py-4 px-5 font-bold uppercase">Image</th>
                  <th className="text-start border-[2px] border-[#f0f0f0] py-4 px-5 font-bold uppercase">Product</th>
                  <th className="text-start border-[2px] border-[#f0f0f0] py-4 px-5 font-bold uppercase">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id || item.productName}>
                    <td className="border-[2px] border-[#f0f0f0] py-4 px-5">
                      <div className="w-16 sm:w-20 bg-[#F5F5F3]">
                        <img src={item.productImageSrc} alt={item.productName} className="w-full h-auto" />
                      </div>
                    </td>
                    <td className="border-[2px] border-[#f0f0f0] py-4 px-5 font-dm-sans">
                      <p className="font-bold">{item.productName}</p>
                      <span className="text-secondary-color text-xs">Qty: {item.quantity}</span>
                    </td>
                    <td className="border-[2px] border-[#f0f0f0] py-4 px-5 font-dm-sans font-bold">
                      ${(parseFloat(item.productPrice.replace("$", "")) * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2" className="border-[2px] border-[#f0f0f0] py-4 px-5 font-bold uppercase bg-[#F5F5F3]">Subtotal</td>
                  <td className="border-[2px] border-[#f0f0f0] py-4 px-5 font-bold">${totalAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="2" className="border-[2px] border-[#f0f0f0] py-4 px-5 font-bold uppercase bg-[#F5F5F3]">Total</td>
                  <td className="border-[2px] border-[#f0f0f0] py-4 px-5 font-bold text-xl">${totalAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <CusButton 
                onClick={handlePlaceOrder}
                text={"Proceed to order"} 
                className="w-full" 
            />
          </div>
        </form>
      </Container>
    </section>
  );
};

export default Checkout;
