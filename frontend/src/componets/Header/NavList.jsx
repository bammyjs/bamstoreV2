import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const NavList = () => {
  return (
    <>
      <ul className="w-full text-lg font-medium md:max-w-2xl flex flex-col items-start  py-4 md:py-0 md:flex-row justify-between md:items-center md:gap-4 ">
        <li className=" py-4 w-full border-b border-gray md:border-0">
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              isActive
                ? " text-sec-color hover:bg-white/10 transition duration-150 ease-linear  py-1  group"
                : "hover:text-sec-light-color transition duration-150 ease-linear rounded-lg py-1  group"
            }
          >
            Phones
          </NavLink>
        </li>
        <li className=" py-4 w-full border-b border-gray md:border-0">
          <NavLink
            to="/laptop"
            className={({ isActive }) =>
              isActive
                ? " text-sec-color hover:bg-white/10 transition duration-150 ease-linear  py-1  group"
                : "hover:text-sec-light-color transition duration-150 ease-linear rounded-lg py-1  group"
            }
          >
            Laptops
          </NavLink>
        </li>
        <li className=" py-4 w-full border-b border-gray md:border-0">
          <NavLink
            to="/gaming"
            className={({ isActive }) =>
              isActive
                ? "  text-sec-color hover:bg-white/10 transition duration-150 ease-linear  py-1  group"
                : "hover:text-sec-light-color transition duration-150 ease-linear rounded-lg py-1  group"
            }
          >
            Gaming
          </NavLink>
        </li>
        <li className=" py-4 w-full border-b border-gray md:border-0">
          <NavLink
            to="/workspace"
            className={({ isActive }) =>
              isActive
                ? "  text-sec-color hover:bg-white/10 transition duration-150 ease-linear  py-1  group"
                : "hover:text-sec-light-color transition duration-150 ease-linear rounded-lg py-1  group"
            }
          >
            WorkSpace
          </NavLink>
        </li>
        <li className=" py-4 w-full border-b border-gray md:border-0">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "  text-sec-color hover:bg-white/10 transition duration-150 ease-linear  py-1  group"
                : "hover:text-sec-light-color transition duration-150 ease-linear rounded-lg py-1  group"
            }
          >
            All Products
          </NavLink>
        </li>
        <li className=" py-4 w-full border-b border-gray md:border-0">
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              isActive
                ? "  text-sec-color hover:bg-white/10 transition duration-150 ease-linear  py-1  group"
                : "hover:text-sec-light-color transition duration-150 ease-linear rounded-lg py-1  group"
            }
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </>
  );
};
