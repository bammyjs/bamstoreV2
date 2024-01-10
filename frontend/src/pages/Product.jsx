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
import { Splide, SplideSlide } from "@splidejs/react-splide";

//Get single Product

const Product = () => {
  const { id } = useParams();

  // Logging the ID to the console for debugging
  console.log("Product ID:", id);

  const { data: product, error, isLoading } = useGetSingleProductQuery(id);

  console.log("Product", product);

  const [activeImg, setActiveImage] = useState("");

  useEffect(() => {
    if (product && product.image && product.image.length > 0) {
      setActiveImage(product.image[0]);
    }
  }, [product]);

  // console.log(product);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // navigate("/cart");
  };

  return (
    <>
      {/* <BreadCrumb data={data} />; */}
      <main className="bg-gray-bk flex flex-col gap-6 items-center mt-20 md:mt-24 lg:mt-36 ">
        <section className="w-full  mb-10 flex flex-wrap justify-center items-center">
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
              <div className="text-dark body-font overflow-hidden ">
                <div className="container px-5 py-24 mx-auto ">
                  <div className=" max-w-7xl mx-auto flex flex-wrap  ">
                    <div className="flex flex-col gap-6 lg:w-2/4 border ">
                      <img
                        src={activeImg}
                        alt=""
                        className="w-full h-full aspect-square object-cover rounded-xl"
                      />
                      <div className="flex flex-row justify-between h-24 border-t py-2">
                        {product &&
                          product.image &&
                          product.image.length > 0 &&
                          product.image.map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`Product ${index}`}
                              onClick={() => setActiveImage(img)}
                              className="w-full h-full aspect-square object-contain" // Add your styling classes
                            />
                          ))}
                      </div>
                    </div>
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                      <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                        {product.name}
                      </h1>
                      <div className="flex mb-4">
                        <ReactStars
                          count={5}
                          // onChange={ratingChanged}
                          size={24}
                          isHalf={true}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#ffd700"
                          value="3"
                        />
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
                      <ul className="flex flex-col">
                        <li className="flex justify-between py-2 border-y  border-gray">
                          <p className="font-bold text-xl">Brand:</p>
                          <span className="text-xl">{product.brand}</span>
                        </li>
                        <li className="flex justify-between py-2 border-b border-gray">
                          <p className="font-bold text-xl">Category:</p>
                          <span className="text-xl">{product.category}</span>
                        </li>
                        <li className="flex justify-between py-2 border-b border-gray">
                          <p className="font-bold text-xl">Color:</p>
                          <span className="text-xl">As seen</span>
                        </li>
                        <li className="flex justify-between py-2 border-b border-gray">
                          <p className="font-bold text-xl">
                            Available in stock
                          </p>
                          <span className="text-xl">
                            {product.quantity} left
                          </span>
                        </li>
                      </ul>

                      <div className="w-full flex justify-between mt-6">
                        <span className="title-font font-medium text-2xl text-gray-900 rounded-lg p-4 border">
                          <span className="text-3xl">&#8358;</span>{" "}
                          {product.price}
                        </span>
                        <div className="flex gap-2 justify-between">
                          <button className="btn btn-secondary text-neutral">
                            Buy
                          </button>
                          <button
                            type="buttton"
                            onClick={() => handleAddToCart(product)}
                            className="btn bg-pry-deep px-4 py-1.5 text-white duration-100 hover:bg-neutral hover:text-pry-deep"
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
                      <div className="flex mt-1 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
                      <div className="flex flex-col gap-2">
                        <p className="font-bold text-xl">
                          Product Description:
                        </p>
                        <h2 className="font-light text-xl">KEY FEATURES</h2>
                        {product.description}
                      </div>
                    </div>

                    {/* reviews */}
                    <div className="py-12 px-4 md:px-6 2xl:px-0  flex justify-center items-center">
                      <div className="flex flex-col justify-start items-start w-full space-y-8">
                        <div className="flex justify-start items-start">
                          <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-white ">
                            Reviews
                          </p>
                        </div>
                        <div className="w-full flex justify-start items-start flex-col bg-gray-50 dark:bg-gray-800 p-8 border">
                          <div className="w-full flex justify-start items-start flex-col bg-gray-50 dark:bg-gray-800 md:px-8 py-8">
                            <div className="flex flex-col md:flex-row justify-between w-full">
                              <div className="flex flex-row justify-between items-start">
                                <p className="text-xl md:text-2xl font-medium leading-normal text-gray-800 dark:text-white">
                                  {product.ratings[0]?.review}
                                </p>
                              </div>
                              <ReactStars
                                count={5}
                                // onChange={ratingChanged}
                                size={24}
                                isHalf={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={
                                  <i className="fa fa-star-half-alt"></i>
                                }
                                fullIcon={<i className="fa fa-star"></i>}
                                activeColor="#ffd700"
                                value="3"
                              />
                            </div>
                            <div id="menu2" className="">
                              <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
                                <div>
                                  <img
                                    src="https://i.ibb.co/RCTGZTc/Mask-Group-1.png"
                                    alt="girl-avatar"
                                  />
                                </div>
                                <div className="flex flex-col justify-start items-start space-y-2">
                                  <p className="text-base font-medium leading-none text-gray-800 dark:text-white">
                                    {product.ratings[0]?.name}
                                  </p>
                                  <p className="text-sm leading-none text-gray-600 dark:text-white">
                                    {product.ratings[0]?.reviewDate}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        </section>
      </main>
    </>
  );
};

export default Product;
