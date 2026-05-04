import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RootLayout from "./RootLayout";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import Login from "./pages/Login";
import MyAccount from "./pages/MyAccount";
import Products from "./pages/Products";
import Shop from "./pages/Shop";
import SignUp from "./pages/SignUp";
import Wishlist from "./pages/Wishlist";

import OrderSuccess from "./pages/OrderSuccess";

// Admin Imports
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import BrandList from "./pages/Admin/Brands/BrandList";
import CategoryList from "./pages/Admin/Categories/CategoryList";
import ContactList from "./pages/Admin/Contacts/ContactList";
import OrderList from "./pages/Admin/Orders/OrderList";
import AdminProfile from "./pages/Admin/Profile/AdminProfile";
import CreateProduct from "./pages/Admin/Products/CreateProduct";
import EditProduct from "./pages/Admin/Products/EditProduct";
import ProductList from "./pages/Admin/Products/ProductList";
import ViewProduct from "./pages/Admin/Products/ViewProduct";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
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
      </Route>
      /* Admin Routes */
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/create" element={<CreateProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="products/view/:id" element={<ViewProduct />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="brands" element={<BrandList />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="contacts" element={<ContactList />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>
      </Route>
      <Route path="*" element={<Error />}></Route>
    </>,
  ),
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
