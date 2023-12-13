import Layout from "./componets/Layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import "./style.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OurStore } from "./pages/OurStore";
import ForgotPassword from "./pages/ForgotPassword";
import CartList from "./pages/CartList";

import Loader from "./componets/home/Loader";

import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./redux/features/auth/authSlice";
import CreateProduct from "./componets/admin/createProduct";
import NewProducts from "./componets/home/NewProducts";
import ShopByCategory from "./pages/ShopByCategory";
import banner1 from "./assets/banner1.jpg";
import banner2 from "./assets/workwork2.jpg";
import { ProductData } from "./datas/productData";
import Product from "./pages/Product";
import SingleProduct from "./componets/product/SingleProduct";

function App() {
  axios.defaults.withCredentials = true;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  return (
    <BrowserRouter>
      {/* <Loader /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/gaming"
            element={<ShopByCategory banner={banner1} category="gaming" />}
          />
          <Route
            path="/laptop"
            element={<ShopByCategory category="laptops" />}
          />
          <Route
            path="/accessories"
            element={<ShopByCategory category="accessories" />}
          />
          <Route
            path="/workspace"
            element={<ShopByCategory banner={banner2} category="workspace" />}
          />

          {/* <Route
            path="*"
            element={<div> Not Found or You do not have permission.</div>}
          /> */}
          <Route path="/phone" element={<ShopByCategory category="phones" />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/products" element={<OurStore />} />
          <Route path="/products/:id" element={<Product />} />

          <Route path="/cart" element={<CartList />} />
          <Route path="createProduct" element={<CreateProduct />} />
          {/* <Route path="newProduct" element={<NewProducts />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
