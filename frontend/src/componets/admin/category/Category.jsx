import React, { useEffect } from "react";
import CategoryList from "./CategoryList";
import CreateCategory from "./CreateCategory";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/features/categoryAndBrand/categorySlice";

const Category = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const reloadCategory = () => {
    dispatch(getCategories());
  };
  return (
    <section>
      <div className="">
        <CreateCategory reloadCategory={reloadCategory} />
        <CategoryList categories={categories} />
      </div>
    </section>
  );
};

export default Category;
