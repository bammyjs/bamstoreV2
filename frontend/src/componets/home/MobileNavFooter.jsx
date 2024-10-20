import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import {
  IoBagOutline,
  IoMegaphoneOutline,
  IoPerson,
  IoPersonOutline,
  IoReceiptOutline,
  IoStorefrontOutline,
} from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import { useSelector } from "react-redux";

export const MobileNavFooter = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  return (
    <div className="sticky bottom-0 p-4 bg-light z-40 border-t-2  flex md:hidden items-base justify-evenly">
      
      <NavLink
        to={"/products"}
        className={({ isActive }) =>
          `flex flex-col items-center text-dark ${
            isActive ? "text-sec-color" : "text-dark"
          }`
        }
      >
        <IoStorefrontOutline style={{ fontSize: "20px" }} />
        <p className="text-sm">Shop</p>
      </NavLink>
      <NavLink
        to={"/orders"}
        className={({ isActive }) =>
          `flex flex-col items-center text-dark ${
            isActive ? "text-sec-color" : "text-dark"
          }`
        }
      >
        <IoReceiptOutline style={{ fontSize: "20px" }} />
        <p className="text-sm">Orders</p>
      </NavLink>
      <NavLink
        to={"/feed"}
        className={({ isActive }) =>
          `flex flex-col items-center text-dark ${
            isActive ? "text-sec-color" : "text-dark"
          }`
        }
      >
        <IoMegaphoneOutline style={{ fontSize: "20px" }} />
        <p className="text-sm">Feed</p>
      </NavLink>

      <NavLink
        to={"/cart"}
        className={({ isActive }) =>
          `relative flex flex-col items-center text-dark ${
            isActive ? "text-sec-color" : "text-dark"
          }`
        }
      >
        <span className="absolute -right-2 -top-2">{cartTotalQuantity}</span>

        <IoBagOutline style={{ fontSize: "20px" }} />

        <p className="text-sm">Cart</p>
      </NavLink>
      <div className="flex-none text-dark gap-2">
        <div className="dropdown dropdown-end">
          <div className="flex flex-col items-center ">
            <ShowOnLogout>
              <NavLink to={"login"}>
                <IoPersonOutline style={{ fontSize: "20px" }} />
              </NavLink>
            </ShowOnLogout>
            <ShowOnLogin>
              <NavLink to={"profile"}>
                <IoPerson style={{ fontSize: "20px" }} />
              </NavLink>
            </ShowOnLogin>
          </div>
          <p className="text-sm">Profile</p>
        </div>
      </div>
    </div>
  );
};
