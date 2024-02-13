import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useGetAllProductsQuery } from "../redux/features/product/productsApi";

export default function BreadCrumb({ crumbs, product }) {
  if (!crumbs || !crumbs.length) return null;

  return (
    <nav className="text-sm breadcrumbs hidden md:block">
      <ul>
        {crumbs.map((crumb, index) => (
          <li key={index}>
            {crumb.path ? (
              <Link to={crumb.path}>{crumb.label}</Link>
            ) : (
              crumb.label
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
