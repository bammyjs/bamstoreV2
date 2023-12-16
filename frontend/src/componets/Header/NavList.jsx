import React from "react";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavList = () => {
  return (
    <>
      <ul className="hidden md:flex justify-between items-center gap-4">
        <li>
          <Link to="/phone">Phones</Link>
        </li>
        <li>
          <Link to="/laptop">Laptops</Link>
        </li>
        <li>
          <Link to="/gaming">Gaming</Link>
        </li>
        <li>
          <Link to="/workspace">WorkSpace</Link>
        </li>
        <li>
          <Link to="/products">All Products</Link>
        </li>
        <li>
          <Link to="/accessories">Accessories</Link>
        </li>
        <Link>Contact</Link>
      </ul>
    </>
  );
};
