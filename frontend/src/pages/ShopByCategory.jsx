import React, { Fragment } from "react";
import { useGetAllProductsQuery } from "../redux/features/product/productsApi";
import CardProducts from "../componets/product/CardProducts";
import { shortenText } from "../utils";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import {
  IoCartOutline,
  IoCheckmarkCircleSharp,
  IoCloseCircleSharp,
} from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../componets/BreadCrumb";

const ShopByCategory = (props) => {
  const { data, error, isLoading } = useGetAllProductsQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (itemList) => {
    dispatch(addToCart(itemList));
    navigate("/cart");
  };

  return (
    <>
      <div className="flex pb-24  bg-gray-100 flex-col items-center gap-6 mt-20  md:mt-16  ">
        {/* <BreadCrumb product={data} /> */}
        <picture className="w-full">
          <img className="w-full object-contain" src={props.banner} alt="" />
        </picture>
        <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <h1 className="bg- w-full text-pry-deep p-4 text-2xl text-left capitalize">
            {props.category}
          </h1>
          <div className="pt-2 md:pt-4 grid  justify-between overflow-auto   grid-cols-2 gap-2 md:gap-2 md:grid-cols-3 lg:grid-cols-4 ">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>An error occurred...</p>
            ) : (
              <>
                {data?.map((itemList, i) => {
                  if (props.category === itemList.category) {
                    return (
                      <div
                        key={i}
                        className="rounded-xl  items-baseline bg- p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 "
                      >
                        <div className="relative w-full  bg-neutral flex items-end overflow-hidden rounded-xl">
                          <Link to={`/products/${itemList.id}`}>
                            <img
                              className="aspect-[2/2] object-cover "
                              src={itemList.image}
                              alt={itemList.name}
                            />
                          </Link>
                          {/* <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600"></div> */}
                        </div>

                        <div className="mt-1 p-2">
                          <h2 className="text-slate-700">{itemList.name}</h2>
                          <p className="mt-1 text-sm text-slate-400">
                            {shortenText(itemList.description, 15)}
                          </p>

                          <div className="mt-3 flex items-end justify-between">
                            <p className="text-base font-bold text-pry-deep">
                              <span>&#8358;</span>
                              {itemList.price}
                            </p>

                            <div className="flex items-center space-x-1.5 rounded-lg bg-pry-deep px-4 py-1.5 text-white duration-100 hover:bg-neutral hover:text-pry-deep">
                              <motion.div
                                whileHover={{ rotate: 45 }}
                                whileTap={{ scale: 1 }}
                                to="/"
                              >
                                <IoCartOutline
                                  style={{ fontSize: "15px" }}
                                  className="text-2xl"
                                />
                              </motion.div>

                              <button
                                type="button"
                                onClick={() => handleAddToCart(itemList)}
                                className="text-sm"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </>
            )}
          </div>
        </div>
        <div className="join space-x-8">
          <button className="join-item btn btn-primary">1</button>
          <button className="join-item btn btn-secondary">2</button>
          <button className="join-item btn btn-primary">3</button>
          <button className="join-item btn btn-primary">4</button>
        </div>
      </div>
    </>
  );
};

export default ShopByCategory;
