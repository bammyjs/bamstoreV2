import Layout from "./componets/Layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import "./style.scss";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { OurStore } from "./pages/OurStore";
import ForgotPassword from "./pages/ForgotPassword";
import CartList from "./pages/CartList";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginStatus,
  getUser,
  selectIsLoggedIn,
  selectUser,
} from "./redux/features/auth/authSlice";
import ShopByCategory from "./pages/ShopByCategory";
import banner1 from "./assets/banner1.jpg";
import banner2 from "./assets/workwork2.jpg";
import banner3 from "./assets/accessory.webp";
import banner4 from "./assets/animiphone.gif";
import Product from "./pages/Product";

import { Admin } from "./pages/Admin";
import DashBoardPreview from "./componets/admin/DashBoardPreview";
import AvailableProducts from "./componets/admin/AvailableProducts";
import DisplayUsers from "./componets/admin/DisplayUsers";
import Orders from "./componets/admin/Orders";
import AddProduct from "./componets/admin/product/AddProduct";
import AdminAccessOnly from "./componets/admin/AdminAccessOnly";
import NotFound from "./pages/NotFound";
import EditProduct from "./componets/admin/product/EditProduct";
import UpdateUser from "./componets/admin/user/UpdateUser";
import AllProducts from "./pages/AllProducts";

function App() {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <BrowserRouter>
      {/* <Loader /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<NotFound />} />
          <Route index element={<Home />} />
          <Route
            path="/gaming"
            element={<ShopByCategory banner={banner1} category="Gaming" />}
          />
          <Route
            path="/laptop"
            element={<ShopByCategory banner={banner2} category="Laptops" />}
          />
          <Route
            path="/accessories"
            element={<ShopByCategory banner={banner3} category="Accessories" />}
          />
          <Route
            path="/workspace"
            element={<ShopByCategory banner={banner2} category="Workspace" />}
          />

          <Route
            path="/phones"
            element={<ShopByCategory banner={banner4} category="Phones" />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<AllProducts />} />
          <Route path="/product/:id" element={<Product />} />

          <Route path="/cart" element={<CartList />} />
          {/* <Route path="/createProduct" element={<CreateProduct />} /> */}
          <Route
            path="/admin"
            element={
              <AdminAccessOnly>
                <Admin />
              </AdminAccessOnly>
            }
          >
            <Route path="dashboard" element={<DashBoardPreview />} />
            <Route path="products" element={<AvailableProducts />} />
            <Route path="createProduct" element={<AddProduct />} />
            <Route path="editProduct/:id" element={<EditProduct />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<DisplayUsers />} />
            <Route path="updateUser/:id" element={<UpdateUser />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
