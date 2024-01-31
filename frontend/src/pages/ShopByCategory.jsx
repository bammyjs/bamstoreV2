import React, { Fragment, useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../redux/features/product/productsApi";
import { shortenText } from "../utils";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { addToCart } from "../redux/features/cartSlice";
import {
  IoCartOutline,
  IoCheckmarkCircleSharp,
  IoCloseCircleSharp,
} from "react-icons/io5";
import ReactStars from "react-rating-stars-component";
import { useNavigate, Link } from "react-router-dom";

import ReactPaginate from "react-paginate";

const AllProducts = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // navigate("/cart");
  };

  return (
    <section className="w-full   flex flex-col items-center justify-center  ">
      <div className="container max-w-7xl flex flex-col item-center justify-center gap-8 p-6 ">
        <div className="w-full p-2">
          <div className="grid pb-8 justify-between overflow-auto  grid-cols-2 gap-2 md:gap-2 md:grid-cols-3 lg:grid-cols-4 ">
            {products?.map((product, i) => {
              let textInputs;
              if (product.quantity === 0) {
                textInputs = "sold out";
                bgColor = "bg-sec-color";
              } else if (product.quantity > 0) {
                textInputs = "in stock";
              }

              let displayCart;
              if (product.quantity === 0) {
                displayCart = false;
              } else if (product.quantity > 0) {
                displayCart = true;
              }
              return (
                <div
                  key={i}
                  className="border rounded-xl  items-baseline shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 "
                >
                  <div className="relative w-full bg-light   flex items-end overflow-hidden rounded-xl">
                    <Link to={`/product/${product._id}`}>
                      <img
                        className="w-full h-auto aspect-[2/2] object-cover "
                        src={product.image?.[0]}
                        alt={product.name}
                      />
                    </Link>
                    {textInputs && (
                      <span className="absolute bg-black bg-sec- text-xs rounded-br-lg p-1  top-0 left-0 flex items-center gap-1 text-neutral">
                        {textInputs}
                      </span>
                    )}
                    {/* <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600"></div> */}
                  </div>

                  <div className="mt-1 p-2">
                    <h2 className="text-slate-700">{product.name}</h2>
                    <div
                      className="mt-1 text-sm text-slate-400"
                      dangerouslySetInnerHTML={{
                        __html: shortenText(product.description, 50),
                      }}
                    />
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

                    <div className="mt-3 flex items-end justify-between">
                      <p className="text-base font-bold text-pry-deep">
                        <span>&#8358;</span>
                        {product.price}
                      </p>
                      {displayCart ? (
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
                      ) : (
                        <button
                          type="buttton"
                          onClick={() => handleAddToCart(product)}
                          className="btn-disabled flex items-center space-x-1.5 rounded-lg bg-pry-deep px-4 py-1.5 text-white duration-100 hover:bg-neutral hover:text-pry-deep"
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
                      )}
                    </div>
                  </div>
                </div>
              );
            })}{" "}
          </div>
        </div>
      </div>
    </section>
  );
};

const ShopByCategory = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: products,
    error,
    isLoading,
  } = useGetAllProductsQuery(currentPage);
  console.log(products);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1); // +1 because event.selected is zero-based
  };

  const showNextBtn = (currentPage) => 1;
  const showPrevBtn = currentPage > 1;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 2,
      },
    },
  };

  return (
    <>
      <h3 className="text-xl text-dark text-center mb-4 md:text-3xl font-bold">
        All products<span className="text-red-700">{}</span>
      </h3>
      <div className="overflow-x-scroll">
        <div className="lg:col-span-4 ">
          {loading ? (
            <div className="flex  justify-center ">
              <span className="loading loading-ball loading-xs"></span>
              <span className="loading loading-ball loading-sm"></span>
              <span className="loading loading-ball loading-md"></span>
              <span className="loading loading-ball loading-lg"></span>
            </div>
          ) : (
            <>
              <div>
                <img src={props.banner} alt="" />
              </div>
              {products?.map((items, i) => {
                if (props.category === items.category) {
                  return (
                    <AllProducts
                      key={i}
                      image={items.image}
                      price={items.price}
                      description={items.description}
                      id={items._id}
                      name={items.name}
                    />
                  );
                }
              })}
            </>
          )}
        </div>
        <motion.div
          variants={paginationVariants}
          initial="hidden"
          animate="visible"
        >
          <ReactPaginate
            breakLabel="..."
            previousLabel={
              showPrevBtn ? (
                <span>
                  <IoChevronBack style={{ fontSize: "15px" }} />
                </span>
              ) : null
            }
            nextLabel={
              showNextBtn ? (
                <span>
                  <IoChevronForward style={{ fontSize: "15px" }} />
                </span>
              ) : null
            }
            pageRangeDisplayed={5}
            pageCount={products?.pages || 1}
            onPageChange={handlePageClick}
            containerClassName="join gap-4 flex items-center justify-center mt-8 mb-4"
            pageClassName="btn btn-secondary"
            activeClassName="btn-active "
          />
        </motion.div>
      </div>
    </>
  );
};

export default ShopByCategory;
