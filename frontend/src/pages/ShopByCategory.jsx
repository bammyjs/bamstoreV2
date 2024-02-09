import React, { Fragment, useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../redux/features/product/productsApi";
import { shortenText } from "../utils";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { addToCart } from "../redux/features/cartSlice";
import { IoCartOutline } from "react-icons/io5";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

import ReactPaginate from "react-paginate";
import CardProducts from "../componets/product/CardProducts";

const ShopByCategory = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: products, error, isLoading } = useGetAllProductsQuery();
  console.log(products);
  const dispatch = useDispatch();

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1); // +1 because event.selected is zero-based
  };

  const showNextBtn = (currentPage) => 1;
  const showPrevBtn = currentPage > 1;

  const [loading, setLoading] = useState(true);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // navigate("/cart");
  };
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
    <main className="bg-gray-bk mt-20 ">
      <div className="overflow-x-scroll">
        <div className="lg:col-span-4 ">
          {loading ? (
            <div className="flex  justify-center ">
              <span className="loading loading-ball loading-xs"></span>
              <span className="loading loading-ball loading-sm"></span>
              <span className="loading loading-ball loading-md"></span>
              <span className="loading loading-ball loading-lg"></span>
            </div>
          ) : error ? (
            <div>An error occurred: {error.message}</div>
          ) : (
            <>
              <div>
                <img src={props.banner} alt="" />
              </div>
              <h3 className="text-xl text-dark text-center mb-4 md:text-3xl font-bold">
                {props.category}
                <span className="text-red-700">{}</span>
              </h3>
              <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
                <div className="container max-w-7xl flex flex-col item-center justify-center gap-8 p-6 ">
                  <div className="w-full p-2">
                    <div className="grid pb-8 justify-between overflow-auto  grid-cols-2 gap-2 md:gap-2 md:grid-cols-3 lg:grid-cols-4 ">
                      {products?.map((product, i) => {
                        if (props.category === product.category) {
                          return (
                            <CardProducts
                              key={i}
                              product={product}
                              category={product.category}
                            />
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              </section>
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
    </main>
  );
};

export default ShopByCategory;
