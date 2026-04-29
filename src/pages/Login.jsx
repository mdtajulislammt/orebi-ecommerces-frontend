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
        navigate("/");
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
        <div className="input-area mt-6 sm:mt-8 md:mt-10 lg:mt-12 border-b-[1px] border-[#f0f0f0]">
          <Heading
            tagname="h4"
            text="returning customer"
            className="mb-10 font-dm-sans font-bold capitalize text-[20px] sm:text-[26px] md:text-[32px] lg:text-[38px] xl:text-[42px] 2xl:text-[49px]"
          />
          <form onSubmit={handleLogin}>
            <Flex
              className={
                "justify-between items-center w-full sm:w-3/4 xl:w-2/4 gap-x-3 sm:gap-x-10"
              }
            >
              <InputBox
                id="email"
                labelText="email address"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-2/4"
              />
              <InputBox
                id="password"
                labelText="password"
                type="password"
                placeholder="password123"
                value={formData.password}
                onChange={handleChange}
                className="w-2/4"
              />
            </Flex>
            <CusButton
              text={isLoading ? "Logging in..." : "log in"}
              type="submit"
              disabled={isLoading}
              className="mt-7 mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-14 2xl:mb-16 bg-white border !border-primary-color !text-primary-color capitalize hover:!text-white hover:bg-primary-color"
            />
          </form>
        </div>
        <div>
          <Heading
            tagname="h4"
            text="new customer"
            className="mb-5 md:mb-7 xl:mb-10 mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 2xl:mt-16  font-dm-sans font-bold capitalize text-[20px] sm:text-[26px] md:text-[32px] lg:text-[38px] xl:text-[42px] 2xl:text-[49px] "
          />
          <Paragraph
            text={
              "Don't have an account yet? Sign up now to enjoy faster checkout and track your orders."
            }
            classname={
              "text-secondary-color mb-12 w-full sm:w-[644px] text-xs sm:text-sm md:text-base"
            }
          />

          <Link
            to="/signup"
            className="inline-block font-dm-sans text-white bg-black py-2 sm:py-3 md:py-4 px-12 sm:px-15 md:px-[72px] lg:px-[84px] xl:px-24 capitalize hover:bg-white hover:text-primary-color border border-primary-color transition duration-300 ease-in-out"
          >
            Continue
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Login;
