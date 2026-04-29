import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/layout/Container";
import BreadCrump from "../components/layout/BreadCrump";
import Heading from "../components/layout/Heading";
import Flex from "../components/layout/Flex";
import InputBox from "../components/layout/InputBox";
import CusButton from "../components/layout/CusButton";
import { useRegisterMutation } from "../features/api/apiSlice";

import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
  });
  
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      const response = await register({
        ...formData,
        type: "CLIENT",
      }).unwrap();
      
      if (response.success) {
        toast.success(response.message || "Registration successful!");
        navigate("/login");
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong. Please try again.");
      console.error("Registration failed:", err);
    }
  };

  return (
    <section className="py-10">
      <Container>
        <BreadCrump />
        
        <div className="input-area mt-6 sm:mt-8 md:mt-10 lg:mt-12 border-b-[1px] border-[#f0f0f0] pb-10">
          <Heading
            tagname="h4"
            text="Create an Account"
            className="mb-10 font-dm-sans font-bold capitalize text-[20px] sm:text-[26px] md:text-[32px] lg:text-[38px] xl:text-[42px] 2xl:text-[49px]"
          />
          
          <Flex className="flex-col gap-y-6 w-full sm:w-3/4 xl:w-2/4">
            <InputBox
              id="name"
              labelText="Full Name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
            
            <InputBox
              id="email"
              labelText="Email Address"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />

            <InputBox
              id="phone_number"
              labelText="Phone Number"
              type="text"
              placeholder="019948547647"
              value={formData.phone_number}
              onChange={handleChange}
            />

            <InputBox
              id="password"
              labelText="Password"
              type="password"
              placeholder="password123"
              value={formData.password}
              onChange={handleChange}
            />
          </Flex>

          <div className="mt-10">
            <CusButton
              text={isLoading ? "Creating..." : "Sign Up"}
              onClick={handleSignUp}
              className="capitalize active:scale-[1.05]"
              disabled={isLoading}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SignUp;
