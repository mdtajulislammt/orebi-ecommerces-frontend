import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import BreadCrump from "../components/layout/BreadCrump";
import Container from "../components/layout/Container";
import Paragraph from "../components/layout/Paragraph";
import Heading from "../components/layout/Heading";
import Flex from "../components/layout/Flex";
import InputBox from "../components/layout/InputBox";
import CusButton from "../components/layout/CusButton";
import { useLoginMutation } from "../features/api/apiSlice";
import { setCredentials } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData).unwrap();
      
      if (response.success) {
        dispatch(setCredentials({
          user: response, // storing entire response as user info for now
          token: response.authorization?.access_token,
        }));
        
        toast.success(response.message || "Logged in successfully!");
        
        if (response.type === 'ADMIN') {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Invalid email or password");
      console.error("Login error:", err);
    }
  };

  return (
    <section className="py-10">
      <Container>
        <BreadCrump />
        <div className="border-b-[1px] border-[#f0f0f0]">
          <Paragraph
            text={
              "Welcome back! Please enter your details to access your account."
            }
            classname={
              "text-secondary-color mt-6 sm:mt-8 md:mt-10 lg:mt-12 x:14 2xl:mt-16 lg:mb-14 mb-5 sm:mb-7 md:mb-9 w-full sm:w-[644px] text-xs sm:text-sm md:text-base"
            }
          />
        </div>
        <div className="input-area mt-6 sm:mt-8 md:mt-10 lg:mt-12">
          <Heading
            tagname="h4"
            text="Login to your account"
            className="mb-10 font-dm-sans font-bold capitalize text-[20px] sm:text-[26px] md:text-[32px] lg:text-[38px] xl:text-[42px] 2xl:text-[49px]"
          />
          <form onSubmit={handleLogin} className="w-full sm:w-3/4 xl:w-2/4">
            <Flex className="justify-between items-center gap-x-3 sm:gap-x-10 mb-6">
              <InputBox
                id="email"
                labelText="email address"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
              />
            </Flex>
            <Flex className="justify-between items-center gap-x-3 sm:gap-x-10">
              <InputBox
                id="password"
                labelText="password"
                type="password"
                placeholder="password123"
                value={formData.password}
                onChange={handleChange}
                className="w-full"
              />
            </Flex>
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-10">
              <CusButton
                text={isLoading ? "Logging in..." : "log in"}
                type="submit"
                disabled={isLoading}
                className="bg-black text-white px-12 py-4 hover:bg-white hover:text-black border border-black transition-all duration-300"
              />
              <p className="text-secondary-color text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary-color font-bold hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default Login;
