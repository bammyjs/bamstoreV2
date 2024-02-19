import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const NavList = ({ toggleOpen }) => {
  return (
    <>
      <ul className="w-full text-lg font-medium md:max-w-2xl flex flex-col items-start  py-4 md:py-0 md:flex-row justify-between md:items-center md:gap-4 ">
        <NavLink
          to="/phones"
          onClick={toggleOpen}
          className={({ isActive }) =>
            isActive
              ? " py-4 w-full border-b border-gray md:border-0 text-sec-color hover:bg-white/10 transition duration-150 ease-linear   group"
              : "py-4 w-full border-b border-gray md:border-0 hover:text-sec-light-color transition duration-150 ease-linear rounded-lg group"
          }
        >
          Phones
        </NavLink>

        <NavLink
          to="/laptop"
          onClick={toggleOpen}
          className={({ isActive }) =>
            isActive
              ? " py-4 w-full border-b border-gray md:border-0 text-sec-color hover:bg-white/10 transition duration-150 ease-linear   group"
              : "py-4 w-full border-b border-gray md:border-0 hover:text-sec-light-color transition duration-150 ease-linear rounded-lg group"
          }
        >
          Laptops
        </NavLink>

        <NavLink
          to="/gaming"
          onClick={toggleOpen}
          className={({ isActive }) =>
            isActive
              ? " py-4 w-full border-b border-gray md:border-0 text-sec-color hover:bg-white/10 transition duration-150 ease-linear   group"
              : "py-4 w-full border-b border-gray md:border-0 hover:text-sec-light-color transition duration-150 ease-linear rounded-lg group"
          }
        >
          Gaming
        </NavLink>

        <NavLink
          to="/workspace"
          onClick={toggleOpen}
          className={({ isActive }) =>
            isActive
              ? " py-4 w-full border-b border-gray md:border-0 text-sec-color hover:bg-white/10 transition duration-150 ease-linear   group"
              : "py-4 w-full border-b border-gray md:border-0 hover:text-sec-light-color transition duration-150 ease-linear rounded-lg group"
          }
        >
          WorkSpace
        </NavLink>

        <NavLink
          to="/products"
          onClick={toggleOpen}
          className={({ isActive }) =>
            isActive
              ? " py-4 w-full border-b border-gray md:border-0 text-sec-color hover:bg-white/10 transition duration-150 ease-linear   group"
              : "py-4 w-full border-b border-gray md:border-0 hover:text-sec-light-color transition duration-150 ease-linear rounded-lg group"
          }
        >
          All Products
        </NavLink>
        <NavLink
          to="/accessories"
          onClick={toggleOpen}
          className={({ isActive }) =>
            isActive
              ? " py-4 w-full border-b border-gray md:border-0 text-sec-color hover:bg-white/10 transition duration-150 ease-linear   group"
              : "py-4 w-full border-b border-gray md:border-0 hover:text-sec-light-color transition duration-150 ease-linear rounded-lg group"
          }
        >
          Accessories
        </NavLink>
      </ul>
    </>
  );
};
