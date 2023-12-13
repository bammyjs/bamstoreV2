import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useGetAllProductsQuery } from "../redux/features/product/productsApi";

export default function BreadCrumb(props) {
  const { data, error, isLoading } = useGetAllProductsQuery();

  return (
    <nav className="text-sm breadcrumbs">
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/product"}>Store</Link>
        </li>
        <li>{data.name}</li>
      </ul>
    </nav>
  );
}
