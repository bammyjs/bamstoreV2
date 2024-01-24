import React, { useEffect, useState } from "react";
// import Card from "../../card/Card";
import { useDispatch, useSelector } from "react-redux";
// import Loader from "../../loader/Loader";
import { toast } from "react-toastify";
import {
  createBrand,
  getBrands,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categorySlice";

const CreateBrand = ({ reloadBrands }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);
  const { isLoading, categories } = useSelector((state) => state.category);

  const saveCat = async (e) => {
    e.preventDefault();
    if (name.length < 2) {
      return toast.error("Coupon must be up to 2 characters");
    }
    if (!category) {
      return toast.error("Please add a parent category");
    }
    const formData = {
      name,
      category,
    };
    console.log(formData);
    dispatch(createBrand(formData));
    dispatch(getBrands());
    setName("");
    reloadBrands();
  };

  return (
    <>
      {isLoading && (
        <div className="flex  justify-center ">
          <span className="loading loading-ball loading-xs"></span>
          <span className="loading loading-ball loading-sm"></span>
          <span className="loading loading-ball loading-md"></span>
          <span className="loading loading-ball loading-lg"></span>
        </div>
      )}
      {/* <div className="w-full h-1 bg-red-700 "></div> */}

      <div className="  mb-2 text-dark border rounded-lg p-4">
        <h3 className="text-center text-base">Create Brand</h3>
        <p className="text-center">
          Use the form to <b>Create a Brand.</b>
        </p>
        <div className="w-full p-4 ">
          <br />
          <form onSubmit={saveCat}>
            <label>Brand Name:</label>
            <input
              className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              type="text"
              placeholder="Brand name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Parent category</label>
            <select
              name="category"
              className="border py-3 text-gray rounded-md px-4 w-full"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select category</option>
              {categories.length > 0 &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat._name}>
                    {cat.name}
                  </option>
                ))}
            </select>

            <div className="my-2">
              <button type="submit" className="btn btn-primary">
                Save Brand
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBrand;
