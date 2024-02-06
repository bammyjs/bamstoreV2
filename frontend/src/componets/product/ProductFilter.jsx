import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import styles from "./ProductFilter.module.scss";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../redux/features/product/filterSlice";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { GET_PRICE_RANGE } from "../../redux/features/product/productSlice";
import { NavLink } from "react-router-dom";

const ProductFilter = () => {
  const { products } = useSelector((state) => state.product);
  const [category, setCategory] = useState("All");
  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products?.map((product) => product.category)),
  ];
  console.log("All categories:", allCategories);

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products }));
  }, [dispatch, products]);

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  return (
    <>
      {allCategories.map((cat, i) => {
        return (
          <li>
            <button
              key={i}
              type="button"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-primary border-b-2  border-sec-color text-sec-color hover:bg-white/10 transition duration-150 ease-linear  py-1  group"
                  : "btn btn-primary hover:text-sec-light-color transition duration-150 ease-linear rounded-lg py-1  group"
              }
              onClick={() => filterProducts(cat)}
            >
              {cat}
            </button>
          </li>
        );
      })}
    </>
  );
};

export default ProductFilter;
