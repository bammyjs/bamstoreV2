import React, { Fragment, useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../redux/features/product/productsApi";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import CardProducts from "../componets/product/CardProducts";
import BreadCrumb from "../componets/BreadCrumb";
import logo from "../assets/bammylogo.png";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Meta } from "../componets/Meta";

const ShopByCategory = (props) => {
  const { data: products, error, isLoading } = useGetAllProductsQuery();
  console.log(products);

  const ITEMS_PER_PAGE = 6; // Set your desired items per page

  // State for managing current page
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("Show All");
  const [brands, setBrands] = useState(["Show All"]);

  useEffect(() => {
    if (products) {
      // Extract unique brands from products
      const uniqueBrands = [
        "Show All",
        ...new Set(products.map((product) => product.brand)),
      ];
      setBrands(uniqueBrands);
    }
  }, [products]); // Depend on products to update brands

  const filteredProducts =
    products?.filter(
      (product) =>
        props.category === product.category &&
        (selectedBrand === "Show All" || product.brand === selectedBrand)
    ) || [];

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1); // +1 because event.selected is zero-based
  };
  // Brand selection handler
  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setCurrentPage(1); // Reset to first page when brand changes
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
      <Meta
        title={`${props.category} category Page - Bamstore.ng`}
        description="categories products from BamstoreNG No1 gadget store in Nigeria."
        keywords="all categories, bamstore product categories, welcome to bamstore ng"
        url={`http://bamstore.ng/${props.category} `}
      />
      <main
        id="main-content"
        className="bg-gray-bk h-fit flex-col gap-6   md: lg:"
      >
        {/* <div className="mx-auto container max-w-7xl bg-gray-bk px-4 sm:px-6 lg:px-10 ">
        <BreadCrumb
          crumbs={[
            { label: "Home", path: "/" },
            { label: "OurStore", path: "/products" },
            { label: props.category },
          ]}
        />
      </div> */}
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
                <div className="w-full  relative ">
                  <img
                    className="w-full h-auto object-cover aspect-square md:aspect-[4/1]"
                    src={props.banner}
                    alt=""
                  />
                  <div className="absolute flex flex-col items-center  p-12 w-2/5 h-auto top-1/2 -translate-y-1/2">
                    <img
                      className="w-52 md:w-96 h-auto object-cover aspect-auto"
                      src={logo}
                      alt=""
                    />
                    <h3 className="text-2xl text-neutral">
                      Shop All{" "}
                      <span className="text-2xl text-neutral">
                        {props.category}
                      </span>{" "}
                    </h3>
                  </div>
                  {/* Brand selection UI */}
                  <div className="absolute right-1/2 left-1/2 -translate-x-1/2 w-full md:max-w-5xl max-w-md  bottom-0 my-4 flex flex-wrap  justify-center gap-2">
                    {brands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => handleBrandSelect(brand)}
                        className={`btn btn-primary ${
                          selectedBrand === brand
                            ? "btn-primary"
                            : "btn-neutral"
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
                <section className="mx-auto max-w-7xl mt-10 px-4 sm:px-6 lg:px-10">
                  <div className="container max-w-7xl flex flex-col item-center justify-center gap-8  ">
                    <div className="w-full md:p-2">
                      <div className="grid pb-8 justify-between overflow-auto  grid-cols-2 gap-2 md:gap-2 md:grid-cols-3 lg:grid-cols-4 ">
                        {currentProducts.map((product, i) => {
                          return (
                            <CardProducts
                              key={i}
                              product={product}
                              category={product.category}
                            />
                          );
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
              pageCount={totalPages}
              onPageChange={handlePageClick}
              containerClassName="join gap-4 flex items-center justify-center mt-8 mb-4"
              pageClassName="btn btn-secondary"
              activeClassName="btn-active "
            />
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default ShopByCategory;
