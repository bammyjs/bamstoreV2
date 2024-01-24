import React, { Fragment, useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../redux/features/product/productsApi";
import CardProducts from "../componets/product/CardProducts";
import { shortenText } from "../utils";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import {
  IoCartOutline,
  IoChevronForward,
  IoChevronBack,
} from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../componets/BreadCrumb";
import CardSkeleton from "../componets/product/CardSkeleton";

const ShopByCategory = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: responseData,
    error,
    isLoading,
  } = useGetAllProductsQuery({ page: currentPage, category: props.category });
  const { products, page, pages } = responseData || {};
  console.log("Products:", products);
  console.log("Error:", error);
  console.log("Is Loading:", isLoading);

  if (error) {
    console.error("An error occurred:", error);
    // You can add additional error handling logic here if needed
  }

  // Pagination change handler
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleAddToCart = (itemList) => {
  //   dispatch(addToCart(itemList));
  //   navigate("/cart");
  // };

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

          <div className="pt-2 md:pt-4 grid  justify-between grid-cols-2 gap-2 md:gap-2 md:grid-cols-3 lg:grid-cols-4 ">
            {isLoading ? (
              <CardSkeleton cards={8} />
            ) : error ? (
              <p>An error occurred</p>
            ) : (
              <>
                {products ? (
                  products.length > 0 ? (
                    products
                      .filter((product) => product.category === props.category)
                      .map((product, i) => {
                        return <CardProducts key={i} {...product} />;
                      })
                  ) : (
                    <p>No products available</p>
                  )
                ) : (
                  <p>Products is null or undefined</p>
                )}
              </>
            )}
          </div>
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
