import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import {
  IoBagOutline,
  IoPerson,
  IoPersonOutline,
  IoStorefrontOutline,
} from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import { Link } from "react-router-dom";
import { RESET_AUTH, logout } from "../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";

export const MobileNavFooter = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  return (
    <div className="sticky bottom-0 p-4 bg-light z-40 border-t-2  flex md:hidden items-base justify-evenly">
      <div className="flex-none text-dark gap-2">
        <div className="dropdown dropdown-end">
          <div className="flex flex-col items-center ">
            <ShowOnLogout>
              <Link to={"login"}>
                <IoPersonOutline style={{ fontSize: "20px" }} />
              </Link>
            </ShowOnLogout>
            <ShowOnLogin>
              <Link to={"profile"}>
                <IoPerson style={{ fontSize: "20px" }} />
              </Link>
            </ShowOnLogin>
          </div>
          <p className="text-sm">My Profile</p>
        </div>
      </div>
      <Link to={"/products"} className="flex flex-col items-center text-dark ">
        <IoStorefrontOutline style={{ fontSize: "20px" }} />
        <p className="text-sm">All Products</p>
      </Link>

      <Link
        to={"/cart"}
        className="relative flex flex-col items-center text-dark"
      >
        <span className="absolute -right-2 -top-2">{cartTotalQuantity}</span>

        <IoBagOutline style={{ fontSize: "20px" }} />

        <p className="text-sm">Cart</p>
      </Link>
    </div>
  );
};
