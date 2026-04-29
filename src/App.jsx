import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RootLayout from "./RootLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Journal from "./pages/Journal";
import MyAccount from "./pages/MyAccount";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Error from "./pages/Error";
import Wishlist from "./pages/Wishlist";

import OrderSuccess from "./pages/OrderSuccess";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />}></Route>
      <Route path="/shop" element={<Shop />}></Route>
      <Route path="/about-us" element={<About />}></Route>
      <Route path="/contacts" element={<Contact />}></Route>
      <Route path="/journal" element={<Journal />}></Route>
      <Route path="/product/:id" element={<Products />}></Route>
      <Route path="/my-account" element={<MyAccount />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/checkout" element={<Checkout />}></Route>
      <Route path="/wishlist" element={<Wishlist />}></Route>
      <Route path="/order-success" element={<OrderSuccess />}></Route>
      <Route path="*" element={<Error />}></Route>
    </Route>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
