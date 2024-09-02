import axios from "axios";
import Layout from "./componets/Layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import "./style.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { OurStore } from "./pages/OurStore";
import ForgotPassword from "./pages/ForgotPassword";
import CartList from "./pages/CartList";

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
import AddProduct from "./componets/admin/product/AddProduct";
import AdminAccessOnly from "./componets/admin/AdminAccessOnly";
import NotFound from "./pages/NotFound";
import EditProduct from "./componets/admin/product/EditProduct";
import UpdateUser from "./componets/admin/user/UpdateUser";
import AllProducts from "./pages/AllProducts";
import CheckOut from "./pages/CheckOut";
import { OrderPage } from "./pages/orderDetails/OrderPage";
import { OrderPreview } from "./pages/orderDetails/OrderPreview";
import AllOrders from "./componets/admin/order/AllOrders";
import OrderDetails from "./componets/admin/order/OrderDetails";
import EmailVerification from "./pages/EmailVerification";
import RequireEmailVerification from "./pages/RequireEmailVerification";
import ResetPassword from "./pages/ResetPassword";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import ManageStore from "./componets/admin/pickupstore/ManageStore";
import CheckoutDetails from "./componets/checkout/CheckoutDetails";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  // Setup Axios defaults
  axios.defaults.withCredentials = true;

  // Axios interceptor to handle 401 Unauthorized globally
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Assuming logout action clears the authentication state
          dispatch(logout());
          // Redirect to login page
          navigate("/login", { replace: true });
        }
        return Promise.reject(error);
      }
    );

    // Cleanup the interceptor when the component is unmounted
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
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
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route
          path="/profile"
          element={
            <RequireEmailVerification>
              <Profile />
            </RequireEmailVerification>
          }
        />
        <Route
          path="/reset-password/:id/:resetToken"
          element={<ResetPassword />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:category" element={<AllProducts />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<CartList />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/order-preview/:id" element={<OrderPreview />} />

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
          <Route path="all-orders" element={<AllOrders />} />
          <Route path="order-details/:id" element={<OrderDetails />} />
          <Route path="users" element={<DisplayUsers />} />
          <Route path="updateUser/:id" element={<UpdateUser />} />
          <Route path="manageStores" element={<ManageStore/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
