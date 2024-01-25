import React from "react";
import { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const NavList = () => {
  return (
    <>
      <ul className="flex flex-col items-start gap-6 py-4 md:py-0 md:flex-row justify-between md:items-center md:gap-4">
        <li>
          <NavLink
            to="/phone"
            className={({ isActive }) =>
              isActive
                ? " border-b-2  border-sec-color text-sec-color hover:bg-white/10 transition duration-150 ease-linear  py-1  group"
                : "hover:text-sec-light-color transition duration-150 ease-linear rounded-lg py-1  group"
            }
          >
            Phones
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/laptop"
            className={({ isActive }) =>
              isActive
                ? " border-b-2  border-sec-color text-sec-color hover:bg-white/10 transition duration-150 ease-linear  py-1  group"
                : "hover:text-sec-light-color transition duration-150 ease-linear rounded-lg py-1  group"
            }
          >
            Laptops
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/gaming"
            className={({ isActive }) =>
              isActive
                ? " border-b-2  border-sec-color text-sec-color hover:bg-white/10 transition duration-150 ease-linear  py-1  group"
                : "hover:text-sec-light-color transition duration-150 ease-linear rounded-lg py-1  group"
            }
          >
            Gaming
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/workspace"
            className={({ isActive }) =>
              isActive
                ? " border-b-2  border-sec-color text-sec-color hover:bg-white/10 transition duration-150 ease-linear  py-1  group"
                : "hover:text-sec-light-color transition duration-150 ease-linear rounded-lg py-1  group"
            }
          >
            WorkSpace
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? " border-b-2  border-sec-color text-sec-color hover:bg-white/10 transition duration-150 ease-linear  py-1  group"
                : "hover:text-sec-light-color transition duration-150 ease-linear rounded-lg py-1  group"
            }
          >
            All Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              isActive
                ? " border-b-2  border-sec-color text-sec-color hover:bg-white/10 transition duration-150 ease-linear  py-1  group"
                : "hover:text-sec-light-color transition duration-150 ease-linear rounded-lg py-1  group"
            }
          >
            Accessories
          </NavLink>
        </li>
        <NavLink
          to={"/contact"}
          className={({ isActive }) =>
            isActive
              ? " border-b-2  border-sec-color text-sec-color hover:bg-white/10 transition duration-150 ease-linear  py-1  group"
              : "hover:text-sec-light-color transition duration-150 ease-linear rounded-lg py-1 px-2 group"
          }
        >
          Contact
        </NavLink>
      </ul>
    </>
  );
};
