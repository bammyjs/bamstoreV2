import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Hero from "../home/Hero";
import Footer from "../home/Footer";
import { ToastContainer } from "react-toastify";
import WhatsappButton from "../extras/WhatsappButton";

function Layout() {
  return (
    <>
      <Header />
      <ToastContainer />
      <WhatsappButton />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
