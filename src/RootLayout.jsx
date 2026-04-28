import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/section/Footer";
import Navbar from "./components/section/Navbar";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  );
};

export default RootLayout;
