import React, { useEffect, useState } from "react";

import BreadCrumb from "../componets/BreadCrumb";

import { Meta } from "../componets/Meta";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { motion } from "framer-motion";
import { IoCartOutline } from "react-icons/io5";
import SingleProduct from "../componets/product/SingleProduct";

import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../redux/features/product/productsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";

//Get single Product

const Product = () => {
  const { id } = useParams();

  // Logging the ID to the console for debugging
  console.log("Product ID:", id);

  const { data: product, error, isLoading } = useGetSingleProductQuery(id);

  // console.log(product);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // navigate("/cart");
  };
  // const [activeImg, setActiveImage] = useState(product.image[0]);

  return (
    <>
      {/* <BreadCrumb data={data} />; */}
      <main className="bg-gray-bk flex flex-col gap-6 items-center mt-20  md:mt-24 ">
        <section className=" text-dark">
          <>
            {isLoading ? (
              <>
                <span className="loading loading-ball loading-xs"></span>
                <span className="loading loading-ball loading-sm"></span>
                <span className="loading loading-ball loading-md"></span>
                <span className="loading loading-ball loading-lg"></span>
              </>
            ) : error ? (
              <p>An error occurred...</p>
            ) : (
              <section className="text-gray-700 body-font overflow-hidden  md:mt-16">
                <div className="container px-5 py-24 mx-auto">
                  <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="flex flex-col gap-6 lg:w-2/4">
                      <img
                        src={product.image[0]}
                        alt=""
                        className="w-full h-full aspect-square object-cover rounded-xl"
                      />
                      <div className="flex flex-row justify-between h-24">
                        <img
                          src={product.image[0]}
                          alt=""
                          className="w-24 h-24 rounded-md cursor-pointer"
                        />
                        <img
                          src={product.image[1]}
                          alt=""
                          className="w-24 h-24 rounded-md cursor-pointer"
                        />
                        <img
                          src={product.image[2]}
                          alt=""
                          className="w-24 h-24 rounded-md cursor-pointer"
                        />
                        <img
                          src={product.image[3]}
                          alt=""
                          className="w-24 h-24 rounded-md cursor-pointer"
                        />
                      </div>
                    </div>
                    {/* <img
                      src={product.image[0]}
                      alt="ps5 pad"
                      className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                    /> */}
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                      <h2 className="text-lg   text-gray-500 tracking-widest">
                        {product.name}
                      </h2>
                      <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                        {product.description}
                      </h1>
                      <div className="flex mb-4">
                        <span className="flex items-center">
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            className="w-4 h-4 text-red-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            className="w-4 h-4 text-red-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            className="w-4 h-4 text-red-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            className="w-4 h-4 text-red-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            className="w-4 h-4 text-red-500"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                          </svg>
                          <span className="text-gray-600 ml-3">4 Reviews</span>
                        </span>
                        <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                          <a className="text-gray-500">
                            <svg
                              fill="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                            >
                              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                            </svg>
                          </a>
                          <a className="ml-2 text-gray-500">
                            <svg
                              fill="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                            >
                              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                            </svg>
                          </a>
                          <a className="ml-2 text-gray-500">
                            <svg
                              fill="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                            >
                              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                            </svg>
                          </a>
                        </span>
                      </div>
                      <p className="leading-relaxed">
                        Fam locavore kickstarter distillery. Mixtape chillwave
                        tumeric sriracha taximy chia microdosing tilde DIY. XOXO
                        fam indxgo juiceramps cornhole raw denim forage
                        brooklyn. Everyday carry +1 seitan poutine tumeric.
                        Gastropub blue bottle austin listicle pour-over, neutra
                        jean shorts keytar banjo tattooed umami cardigan.
                      </p>
                      <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
                      <div className="flex justify-between">
                        <span className="title-font font-medium text-2xl text-gray-900">
                          <span className="text-3xl">&#8358;</span>{" "}
                          {product.price}
                        </span>
                        <div className="flex gap-2">
                          <button className="btn btn-secondary text-neutral">
                            Buy
                          </button>
                          <button
                            type="buttton"
                            onClick={() => handleAddToCart(product)}
                            className="flex items-center space-x-1.5 rounded-lg bg-pry-deep px-4 py-1.5 text-white duration-100 hover:bg-neutral hover:text-pry-deep"
                          >
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
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </>
        </section>
      </main>
    </>
  );
};

export default Product;
