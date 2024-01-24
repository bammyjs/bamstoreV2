import React, { useEffect } from "react";
// import "../coupon/Coupon.scss";
import BrandList from "./BrandList";

import { useDispatch, useSelector } from "react-redux";
import {
  RESET_CAT,
  getBrands,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categorySlice";
import CreateBrand from "./CreateBrand";

const Brand = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const reloadBrands = () => {
    dispatch(getBrands());
  };

  return (
    <section>
      <div className="flex flex-col">
        <CreateBrand reloadBrands={reloadBrands} />
        <BrandList brands={brands} />
      </div>
    </section>
  );
};

export default Brand;
