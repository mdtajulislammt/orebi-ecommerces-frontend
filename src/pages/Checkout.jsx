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
  
  const [paymentMethod, setPaymentMethod] = useState("cod");
  
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
      ? parseFloat(item.productPrice.replace("৳", "").replace("$", "")) 
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

    // Simulate payment processing for digital methods
    if (paymentMethod !== "cod") {
      try {
        // Small artificial delay to mimic payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (err) {
        console.error("Payment simulation failed");
      }
    }

    try {
      const orderData = {
        ...formData,
        payment_method: paymentMethod,
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
                      ৳{(parseFloat(typeof item.productPrice === 'string' ? item.productPrice.replace("৳", "").replace("$", "") : item.productPrice) * item.quantity).toFixed(2)}
                    </p>
                  </Flex>
                ))}
              </div>

              <div className="space-y-4 border-t pt-6">
                <Flex className="justify-between items-center text-gray-500">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold">৳{totalAmount.toFixed(2)}</span>
                </Flex>
                <Flex className="justify-between items-center text-gray-500">
                  <span className="font-medium">Shipping</span>
                  <span className="font-bold text-green-600">Free</span>
                </Flex>
                <div className="h-[1px] bg-gray-100 w-full my-2"></div>
                <Flex className="justify-between items-center text-primary-color">
                  <span className="font-black text-lg uppercase">Total</span>
                  <span className="font-black text-2xl">৳{totalAmount.toFixed(2)}</span>
                </Flex>
              </div>
              {/* Payment Methods Selection */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <Heading
                  tagname={"h4"}
                  text={"Payment Method"}
                  className="font-dm-sans font-bold text-primary-color text-lg mb-6"
                />
                
                <div className="space-y-3">
                  {/* Stripe Option */}
                  <label 
                    onClick={() => setPaymentMethod("stripe")}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'stripe' ? 'border-black bg-gray-50' : 'border-gray-100'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'stripe' ? 'border-black' : 'border-gray-300'}`}>
                        {paymentMethod === 'stripe' && <div className="w-2 h-2 bg-black rounded-full" />}
                      </div>
                      <span className="font-bold text-sm">Credit / Debit Card</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-8 h-5 bg-white rounded border border-gray-100 flex items-center justify-center text-[8px] font-bold text-blue-800 italic">VISA</div>
                      <div className="w-8 h-5 bg-white rounded border border-gray-200 flex items-center justify-center text-[8px] font-bold text-red-600 italic">MC</div>
                    </div>
                  </label>

                  {/* Stripe Card Mockup (Only visible if stripe selected) */}
                  {paymentMethod === 'stripe' && (
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="space-y-3">
                        <div className="relative">
                          <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Cardholder Name</label>
                          <input 
                            type="text" 
                            placeholder="Full Name on Card" 
                            defaultValue={userInfo?.name || ""}
                            className="w-full bg-white border border-gray-200 px-4 py-3 rounded-xl text-sm outline-none focus:border-black transition-colors"
                          />
                        </div>
                        <div className="relative">
                          <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Card Number</label>
                          <input 
                            type="text" 
                            placeholder="4242 4242 4242 4242" 
                            defaultValue="4242 4242 4242 4242"
                            className="w-full bg-white border border-gray-200 px-4 py-3 rounded-xl text-sm outline-none focus:border-black transition-colors font-mono"
                          />
                        </div>
                        <div className="flex gap-3">
                          <div className="w-1/2">
                            <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Expiration</label>
                            <input type="text" placeholder="MM/YY" defaultValue="12/26" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-xl text-sm outline-none focus:border-black transition-colors" />
                          </div>
                          <div className="w-1/2">
                            <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">CVC</label>
                            <input type="text" placeholder="***" defaultValue="123" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-xl text-sm outline-none focus:border-black transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PayPal Option */}
                  <label 
                    onClick={() => setPaymentMethod("paypal")}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'paypal' ? 'border-black bg-gray-50' : 'border-gray-100'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'paypal' ? 'border-black' : 'border-gray-300'}`}>
                        {paymentMethod === 'paypal' && <div className="w-2 h-2 bg-black rounded-full" />}
                      </div>
                      <span className="font-bold text-sm">PayPal</span>
                    </div>
                    <div className="w-12 h-6 bg-[#003087] rounded flex items-center justify-center text-[10px] font-black text-white italic">Pay<span className="text-[#009cde]">Pal</span></div>
                  </label>

                  {/* PayPal Email Mockup (Only visible if paypal selected) */}
                  {paymentMethod === 'paypal' && (
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">💳</span>
                        <p className="text-xs font-bold text-blue-800 uppercase tracking-wider">Fast & Secure PayPal Checkout</p>
                      </div>
                      <div className="space-y-3">
                        <div className="relative">
                          <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">PayPal Email</label>
                          <input 
                            type="email" 
                            placeholder="PayPal Email Address" 
                            defaultValue={userInfo?.email || "user@example.com"}
                            className="w-full bg-white border border-blue-200 px-4 py-3 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors"
                          />
                        </div>
                        <div className="relative">
                          <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">PayPal Password</label>
                          <input 
                            type="password" 
                            placeholder="Password" 
                            defaultValue="••••••••"
                            className="w-full bg-white border border-blue-200 px-4 py-3 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors"
                          />
                        </div>
                      </div>
                      <p className="text-[10px] text-blue-600 font-medium italic">You will be redirected to PayPal to complete your purchase securely.</p>
                    </div>
                  )}

                  {/* Cash on Delivery Option */}
                  <label 
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-black bg-gray-50' : 'border-gray-100'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-black' : 'border-gray-300'}`}>
                        {paymentMethod === 'cod' && <div className="w-2 h-2 bg-black rounded-full" />}
                      </div>
                      <span className="font-bold text-sm">Cash on Delivery</span>
                    </div>
                    <span className="text-xl">💵</span>
                  </label>
                </div>
              </div>

              <CusButton 
                onClick={handlePlaceOrder}
                text={isLoading ? "Processing Payment..." : "Place Order"} 
                className="w-full mt-10 py-5 bg-black text-white rounded-2xl hover:bg-primary-color transition-all active:scale-[0.98]" 
                disabled={isLoading}
              />
              
              <p className="text-[10px] text-center text-gray-400 mt-6 font-medium">
                Your payment is secured with 256-bit SSL encryption.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Checkout;
