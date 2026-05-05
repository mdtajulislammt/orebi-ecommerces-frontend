import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineUser,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import signupBanner from "../assets/tech_banner_2.png";
import BreadCrump from "../components/layout/BreadCrump";
import Container from "../components/layout/Container";
import CusButton from "../components/layout/CusButton";
import { useRegisterMutation } from "../features/api/apiSlice";

const SignUp = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
  });

  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      if (userInfo.type === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignUp = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.phone_number
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await register({
        ...formData,
        type: "CLIENT",
      }).unwrap();

      if (response.success) {
        toast.success(response.message || "Welcome to Orebi!");
        navigate("/login");
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (err) {
      toast.error(
        err?.data?.message || "Something went wrong. Please try again.",
      );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="min-h-screen bg-[#FBFBFB] pb-20">
      {/* Page Banner */}
      <div className="relative h-[250px] w-full overflow-hidden sm:h-[300px] md:h-[350px]">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={signupBanner}
          alt="Sign Up Banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <Container className="relative h-full">
          <div className="flex h-full flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <BreadCrump className="!text-white/80" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-dm-sans text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Sign Up
            </motion.h1>
          </div>
        </Container>
      </div>

      <Container className="-mt-16 relative z-10 sm:-mt-24 md:-mt-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-[700px]"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white px-8 py-12 shadow-[0_40px_120px_rgba(0,0,0,0.1)] ring-1 ring-gray-100 sm:px-16 md:py-16">
            {/* Form Title (Subtle) */}
            <motion.div variants={itemVariants} className="mb-10 text-center">
              <h2 className="font-dm-sans text-2xl font-bold text-black sm:text-3xl">
                Create your account
              </h2>
              <p className="mt-2 text-secondary-color">
                Join our community of premium shoppers.
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                {
                  id: "name",
                  label: "Full Name",
                  type: "text",
                  icon: HiOutlineUser,
                  placeholder: "John Doe",
                },
                {
                  id: "email",
                  label: "Email Address",
                  type: "email",
                  icon: HiOutlineMail,
                  placeholder: "john@example.com",
                },
                {
                  id: "phone_number",
                  label: "Phone Number",
                  type: "text",
                  icon: HiOutlinePhone,
                  placeholder: "01XXXXXXXXX",
                },
                {
                  id: "password",
                  label: "Password",
                  type: "password",
                  icon: HiOutlineLockClosed,
                  placeholder: "••••••••",
                },
              ].map((input) => (
                <motion.div
                  key={input.id}
                  variants={itemVariants}
                  className="group relative flex flex-col space-y-2"
                >
                  <label
                    htmlFor={input.id}
                    className="text-xs font-bold uppercase tracking-widest text-gray-400 transition-colors group-focus-within:text-black"
                  >
                    {input.label}
                  </label>
                  <div className="relative flex items-center">
                    <input.icon className="absolute left-0 text-xl text-gray-300 transition-colors group-focus-within:text-black" />
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      value={formData[input.id]}
                      onChange={handleChange}
                      className="w-full border-b-[1.5px] border-gray-100 py-3 pl-8 font-dm-sans text-lg outline-none transition-all focus:border-black placeholder:text-gray-200"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={itemVariants}
              className="mt-14 flex flex-col items-center justify-between gap-8 sm:flex-row"
            >
              <CusButton
                onClick={handleSignUp}
                disabled={isLoading}
                className={`relative w-full overflow-hidden !rounded-2xl !px-14 !py-4 text-lg font-bold shadow-xl transition-all active:scale-95 sm:w-auto ${
                  isLoading
                    ? "cursor-not-allowed opacity-70"
                    : "hover:shadow-2xl hover:-translate-y-1"
                }`}
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Creating...</span>
                    </>
                  ) : (
                    <span>Create Account</span>
                  )}
                </div>
              </CusButton>

              <p className="text-base text-secondary-color">
                Have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-black transition-all hover:underline"
                >
                  Login here
                </Link>
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 border-t border-gray-100 pt-8 text-center"
            >
              <p className="text-[10px] uppercase tracking-widest text-gray-400">
                Safe & Secure Registration
              </p>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default SignUp;
