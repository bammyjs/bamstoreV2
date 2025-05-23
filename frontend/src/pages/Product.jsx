import React, { Fragment, useEffect, useState } from "react";

import BreadCrumb from "../componets/BreadCrumb";

import { Meta } from "../componets/Meta";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { motion } from "framer-motion";
import {
  IoCarSharp,
  IoCartOutline,
  IoChevronDown,
  IoChevronUp,
  IoFlagOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../redux/features/product/productsApi";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseCart,
  getTotals,
} from "../redux/features/cartSlice";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { getProduct } from "../redux/features/product/productSlice";

//Get single Product

const Product = () => {
  const { id } = useParams();

  // Logging the ID to the console for debugging
  console.log("Product ID:", id);
  const dispatch = useDispatch();

  const [activeImg, setActiveImage] = useState("");
  const [expand, setExpand] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [availableStores, setAvailableStores] = useState([]);

  const cart = useSelector((state) => state.cart);
  const { data: product, error, isLoading } = useGetSingleProductQuery(id);


//  

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  useEffect(() => {
    if (product?.ratings?.length > 0) {
      const sum = product.ratings.reduce((acc, curr) => acc + curr.star, 0);
      const newAverage = sum / product.ratings.length;
      setAverageRating(newAverage);
    } else {
      setAverageRating(0); // Handle the case with no ratings
    }
  }, [product]);

  useEffect(() => {
    if (product && product.image && product.image.length > 0) {
      setActiveImage(product.image[0]);
    }
  }, [product]);

  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };

  const handleIncreaseCart = (product) => {
    dispatch(addToCart(product));
  };

  // Find the specific cart item for the current product
  const cartItem = cart.cartItems.find((item) => item._id === product?._id);

  // let textInputs = product.quantity === 0 ? "SOLD OUT" : "IN STOCK";
  // let displayCart = product.quantity > 0 ? true : false;

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // navigate("/cart");
  };

  const onExpandView = () => {
    setExpand(!expand);
  };

  return (
    <>
      <Meta
        title="Product description Page - Bamstore.ng"
        description="Product details  BamstoreNG No1 gadget store in Nigeria."
        keywords="product, bamstore product details, welcome to bamstore ng"
        url="http://bamstore.ng/product"
      />
      <main
        id="main-content"
        className="w-full  bg-gray-bk h-fit flex-col gap-6 px-4  md:mt-10 lg:mt-10"
      >
        <div className="mx-auto container max-w-7xl  ">
          <BreadCrumb
            crumbs={[
              { label: "Home", path: "/" },
              { label: "OurStore", path: "/products" },
              { label: product?.category, path: `/${product?.category}` },
              { label: product?.name },
            ]}
          />
        </div>

        <section className="w-full  flex flex-wrap justify-center items-center">
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
              <div className="text-dark body-font   ">
                <div className=" py-6 mx-auto ">
                  <div className="w-full max-w-7xl  mx-auto  flex md:justify-between flex-wrap  ">
                    <div className=" w-full flex flex-col gap-4 lg:w-1/2 md:sticky top-24  h-fit ">
                      <Zoom>
                        <img
                          src={activeImg}
                          alt=""
                          className="w-full h-full aspect-square object-cover  rounded-xl"
                          width="500"
                        />
                      </Zoom>
                      <div className="w-full flex flex-row justify-between h-24  rounded-xl bg-light py-2 ">
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
                    <div className="flex flex-col gap-2 lg:w-[45%]  lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                      <h2 className="text-dark text-3xl title-font font-medium ">
                        {product.name}
                      </h2>
                      <div className="flex items-center gap-2">
                        {averageRating > 0 && (
                          <ReactStars
                            count={5}
                            edit={false}
                            size={24}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                            value={averageRating}
                          />
                        )}
                        <p className=" text-base font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-white ">
                          ({product?.ratings?.length}) Reviews
                        </p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <p className="text-3xl font-bold text-dark">
                          <span className="text-3xl font-bold text-dark">
                            &#8358;
                          </span>
                          {new Intl.NumberFormat("en-NG").format(product.price)}
                        </p>
                        <p className=" font-light text-2xl text-gray">
                          <strike className="  text-2xl ">
                            <span className=" text-2xl ">&#8358;</span>
                            {new Intl.NumberFormat("en-NG").format(
                              product.regularPrice
                            )}
                          </strike>
                        </p>
                      </div>

                      <div className="flex flex-col items-left gap-2 p-2 ">
                        <p className="font-bold text-base md:text-lg">Color</p>
                        <span
                          className="text-xl w-10 h-10 border border-gray outline outline-offset-4 outline-pry-color   rounded-full flex items-center justify-center"
                          style={{ backgroundColor: product.color }}
                          title={product.color}
                        >
                          {/* Optionally show the color name or keep it empty */}
                        </span>
                      </div>
                      <div className="flex flex-col items-left gap-2 p-2 ">
                        <p className="font-bold text-base md:text-lg">Brand</p>
                        <Link
                          to={"/"}
                          className=" bg-light text-xl w-fit p-2 flex items-left rounded-md  outline outline-offset-4 outline-pry-color hover:border-primary hover:bg-primary hover:text-light"
                        >
                          {product.brand}
                        </Link>
                      </div>
                      <div className="flex flex-col items-left justify-between gap-2 p-2 ">
                        <p className="font-bold text-base md:text-lg">
                          Quantity
                        </p>
                        <div className="sm:order-1 ">
                          {cartItem ? (
                            <div className="w-fit border-2 border-dark rounded-lg flex h-10 items-stretch text-gray-600">
                              <button
                                onClick={() => handleDecreaseCart(cartItem)}
                                className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-primary hover:text-white"
                              >
                                -
                              </button>
                              <div className="flex w-full items-center justify-center border-x px-4 text-xs uppercase transition">
                                {cartItem.cartQuantity}
                              </div>
                              <button
                                onClick={() => handleIncreaseCart(cartItem)}
                                className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-primary hover:text-white"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <div className="w-fit border-2 border-dark rounded-lg flex h-10 items-stretch text-gray-600">
                              <button className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-primary hover:text-white"></button>
                              <div className="flex w-full items-center justify-center border-x px-4 text-xs uppercase transition">
                                {"0"}
                              </div>
                              {product.quantity > 0 ? (
                                <button
                                  onClick={() => handleAddToCart(product)}
                                  className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-primary hover:text-white"
                                >
                                  +
                                </button>
                              ) : (
                                <button
                                  disabled
                                  onClick={() => handleAddToCart(product)}
                                  className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-primary hover:text-white"
                                >
                                  +
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-left j gap-2 p-2">
                        <p className="font-bold text-base md:text-lg">
                          Key Features
                        </p>

                        <div
                          className={`transition-expand ${
                            expand
                              ? "max-h-[1000px] opacity-100"
                              : "max-h-48 opacity-50"
                          }`}
                        >
                          <div
                            className="flex flex-col "
                            dangerouslySetInnerHTML={{
                              __html: product?.features,
                            }}
                          />
                        </div>
                        {expand ? (
                          <p
                            onClick={() => onExpandView()}
                            className="cursor-pointer  flex items-center gap-2 text-sec-light-color hover:text-sec-color "
                          >
                            View less
                            <span className="cursor-pointer">
                              <IoChevronUp />
                            </span>
                          </p>
                        ) : (
                          <p
                            onClick={() => onExpandView()}
                            className="cursor-pointer flex items-center gap-2 text-sec-light-color hover:text-sec-color "
                          >
                            View more{" "}
                            <span className="cursor-pointer">
                              <IoChevronDown />
                            </span>
                          </p>
                        )}
                      </div>

                      {/* <ul className="flex flex-col">
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
                      </ul> */}

                      <div className="w-full flex justify-between mt-6">
                        <div className="w-full flex gap-2 justify-between">
                          {product.quantity > 0 ? (
                            <button
                              type="button"
                              onClick={() => handleAddToCart(product)}
                              className="w-full btn bg-pry-deep px-4 py-1.5 text-white duration-100 hover:bg-neutral hover:text-pry-deep"
                            >
                              Add to cart
                              <motion.div
                                whileHover={{ rotate: 45 }}
                                whileTap={{ scale: 1 }}
                              >
                                <IoCartOutline
                                  style={{ fontSize: "15px" }}
                                  className="text-2xl"
                                />
                              </motion.div>
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled
                              onClick={() => handleAddToCart(product)}
                              className="w-full  p-3 rounded-xl  bg-error  "
                            >
                              Out of Stock
                              {/* <motion.div
                              whileHover={{ rotate: 45 }}
                              whileTap={{ scale: 1 }}
                            >
                              <IoCartOutline
                                style={{ fontSize: "15px", color: "black" }}ck" }}
                                className="text-2xl"
                              />
                            </motion.div> */}
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex  items-center  border-b border-gray "></div>
                      <div className="  flex flex-col gap-3 items-start justify-between  py-6 md:flex-row">
                        <p className="flex items-center gap-2 justify-between">
                          <span>
                            <IoCarSharp style={{ fontSize: "20px" }} />
                          </span>
                          Free Shipping
                        </p>
                        <p className="flex items-center gap-2 justify-between">
                          <span>
                            <IoFlagOutline style={{ fontSize: "20px" }} />
                          </span>
                          Risk Free Shopping
                        </p>
                      </div>
                      <div className="flex  items-center  border-b border-gray "></div>
                      <div className="flex mt-4 flex-col items-start justify-between  py-2 md:flex-row">
                        <p className="flex items-center gap-2 justify-between">
                          Note: THIS PRODUCT IS AVAILABLE ONLY BY REQUEST &
                          DELIVERY IS WITHIN 2 TO 3 WEEKS AFTER THE ORDER DATE
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-1 items-center pb-5 border-b border-gray mb-5"></div>
                  <div className="flex flex-col items-center    gap-2 p-2">
                    <p className="font-bold text-xl md:text-3xl">
                      Full Details
                    </p>

                    <div className="max-w-7xl flex flex-col items-center ">
                      <div
                        className="flex flex-col items-center "
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex mt-1 items-center pb-5 border-b border-gray mb-5"></div>

                  {/* reviews */}
                  <div className="w-full py-6   px-4 md:px-6   md:flex justify-center items-center">
                    <div className="  flex flex-col justify-start items-start w-full space-y-8">
                      <div className="flex  justify-start items-start">
                        <p className="text-2xl lg:text-3xl font-semibold leading-7 lg:leading-9 text-gray-800 ">
                          Customer Reviews ({product?.ratings?.length})
                        </p>
                      </div>
                      {product.ratings?.map((rate, i) => {
                        let ratingView;
                        if (!product.ratings) {
                          ratingView = false;
                        } else if (product.ratings) {
                          ratingView = true;
                        }
                        return (
                          <Fragment key={i}>
                            {ratingView ? (
                              <div className="w-full flex gap-4 items-start flex-col pb-6  border-b border-gray">
                                <div className="flex items-center md:flex-row justify-between w-full">
                                  <ReactStars
                                    count={5}
                                    edit={false}
                                    size={24}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={
                                      <i className="fa fa-star-half-alt"></i>
                                    }
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                    value={rate?.star}
                                  />
                                  <p className="text-sm leading-none text-gray-600 dark:text-white">
                                    {new Date(
                                      rate?.reviewDate
                                    ).toLocaleDateString("en-GB")}
                                  </p>
                                </div>
                                <div id="menu2" className="">
                                  <div className=" flex justify-start items-start flex-row space-x-2.5">
                                    <span className="p-1 bg-gray-400">
                                      <IoPersonOutline
                                        style={{ fontSize: "30" }}
                                      />
                                    </span>
                                    <div className="flex flex-col justify-start items-start space-y-2">
                                      <p className="text-base font-medium leading-none text-gray-800 dark:text-white">
                                        {rate?.name}{" "}
                                        <span className="bg-black text-xs text-white p-1">
                                          Verified
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-row justify-between items-start  ">
                                    <p className="text-lg max-w-80 md:text-2xl font-medium leading-normal text-gray-800 dark:text-white">
                                      {rate?.review}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <p>no review yet</p>
                            )}
                          </Fragment>
                        );
                      })}
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
