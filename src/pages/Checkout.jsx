import React, { useState } from "react";
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
import { useBuyProductMutation } from "../features/api/apiSlice";

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
  const { userInfo, token } = useSelector((state) => state.auth);
  
  const [buyProduct, { isLoading }] = useBuyProductMutation();

  const [formData, setFormData] = useState({
    first_name: userInfo?.name?.split(" ")[0] || "",
    last_name: userInfo?.name?.split(" ").slice(1).join(" ") || "",
    email: userInfo?.email || "",
    phone_number: userInfo?.phone_number || "",
    address: "",
    city: "",
    post_code: "",
    country: "Dhaka",
    notes: ""
  });

  const totalAmount = Array.isArray(cart) ? cart.reduce((total, item) => {
    const price = typeof item.productPrice === 'string' 
      ? parseFloat(item.productPrice.replace("$", "")) 
      : item.productPrice;
    return total + price * item.quantity;
  }, 0) : 0;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    if (e) e.preventDefault();
    
    if (!token) {
      toast.warn("Please login to proceed with your order.");
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Basic validation
    if (!formData.first_name || !formData.last_name || !formData.address || !formData.city || !formData.phone_number) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const orderData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number,
        address: formData.address,
        city: formData.city,
        post_code: formData.post_code,
        country: formData.country,
        notes: formData.notes,
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        }))
      };

      const response = await buyProduct(orderData).unwrap();
      
      if (response.success) {
        dispatch(clearCart());
        toast.success("Order placed successfully!");
        navigate("/order-success");
      } else {
        toast.error(response.message || "Failed to place order");
      }
    } catch (err) {
      toast.error(err?.data?.message || "An error occurred while placing your order.");
      console.error("Order error:", err);
    }
  };

  return (
    <section className="py-10 bg-[#fafafa]">
      <Container>
        <div className="mb-10">
          <BreadCrump />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Billing Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-gray-100">
              <Heading
                tagname={"h3"}
                text={"Billing Details"}
                className="font-dm-sans font-bold text-primary-color text-2xl mb-10 border-b pb-4"
              />
              
              <div className="space-y-6">
                <Flex className="gap-6 flex-col sm:flex-row">
                  <InputBox
                    className="w-full sm:w-1/2"
                    labelText="First Name *"
                    id="first_name"
                    type="text"
                    placeholder="first name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                  <InputBox
                    className="w-full sm:w-1/2"
                    labelText="Last Name *"
                    id="last_name"
                    type="text"
                    placeholder="last name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </Flex>

                <Flex className="gap-6 flex-col sm:flex-row">
                  <InputBox
                    className="w-full sm:w-1/2"
                    labelText="Email Address *"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <InputBox
                    className="w-full sm:w-1/2"
                    labelText="Phone Number *"
                    id="phone_number"
                    type="text"
                    placeholder="Phone"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                </Flex>

                <div className="flex flex-col border-b-[1px] text-secondary-color border-[#D8D8D8]">
                  <label htmlFor="country" className="font-bold font-dm-sans text-sm md:text-base capitalize">
                    Country *
                  </label>
                  <select
                    id="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="py-2.5 outline-none text-sm md:text-base bg-transparent"
                  >
                    {country.map((item) => (
                      <option key={item.id} value={item.name}>{item.name}</option>
                    ))}
                  </select>
                </div>

                <InputBox
                  className="w-full"
                  labelText="Street Address *"
                  id="address"
                  type="text"
                  placeholder="House number and street name"
                  value={formData.address}
                  onChange={handleChange}
                />

                <Flex className="gap-6 flex-col sm:flex-row">
                  <InputBox
                    className="w-full sm:w-1/2"
                    labelText="Town/City *"
                    id="city"
                    type="text"
                    placeholder="Town/City"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <InputBox
                    className="w-full sm:w-1/2"
                    labelText="Post Code *"
                    id="post_code"
                    type="text"
                    placeholder="Post Code"
                    value={formData.post_code}
                    onChange={handleChange}
                  />
                </Flex>

                <Textarea
                  labelText="Order Notes (optional)"
                  id="notes"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
              <Heading
                tagname={"h3"}
                text={"Your Order"}
                className="font-dm-sans font-bold text-primary-color text-2xl mb-8 border-b pb-4"
              />
              
              <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                {cart.map((item) => (
                  <Flex key={item.id || item.productName} className="justify-between items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden p-2 flex-shrink-0">
                        <img src={item.productImageSrc} alt={item.productName} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <p className="font-bold text-sm line-clamp-1">{item.productName}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-sm">
                      ${(parseFloat(typeof item.productPrice === 'string' ? item.productPrice.replace("$", "") : item.productPrice) * item.quantity).toFixed(2)}
                    </p>
                  </Flex>
                ))}
              </div>

              <div className="space-y-4 border-t pt-6">
                <Flex className="justify-between items-center text-gray-500">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold">${totalAmount.toFixed(2)}</span>
                </Flex>
                <Flex className="justify-between items-center text-gray-500">
                  <span className="font-medium">Shipping</span>
                  <span className="font-bold text-green-600">Free</span>
                </Flex>
                <div className="h-[1px] bg-gray-100 w-full my-2"></div>
                <Flex className="justify-between items-center text-primary-color">
                  <span className="font-black text-lg uppercase">Total</span>
                  <span className="font-black text-2xl">${totalAmount.toFixed(2)}</span>
                </Flex>
              </div>

              <CusButton 
                onClick={handlePlaceOrder}
                text={isLoading ? "Processing..." : "Place Order"} 
                className="w-full mt-10 py-5 bg-black text-white rounded-2xl hover:bg-primary-color transition-all active:scale-[0.98]" 
                disabled={isLoading}
              />
              
              <p className="text-[10px] text-center text-gray-400 mt-6 font-medium">
                By placing this order, you agree to our Terms and Conditions and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Checkout;
