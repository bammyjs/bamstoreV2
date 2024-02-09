import { Fragment, useState, useEffect } from "react";

import {
  IoAddSharp,
  IoRemoveSharp,
  IoCloseSharp,
  IoFilterSharp,
  IoChevronForward,
  IoChevronBack,
  IoCartOutline,
} from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";

import CardProducts from "../componets/product/CardProducts";
import { useGetAllProductsQuery } from "../redux/features/product/productsApi";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "../componets/product/CardSkeleton";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";

export default function AllProducts() {
  const { category } = useParams();
  const { data: products, error, isLoading } = useGetAllProductsQuery();

  const ITEMS_PER_PAGE = 2; // Set your desired items per page

  // State for managing current page
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // State to manage categories and selected category
  const [categories, setCategories] = useState([]);

  // Filter products based on the selected category
  const filteredProducts = products
    ? products.filter((product) =>
        selectedCategory === "All"
          ? true
          : product.category === selectedCategory
      )
    : [];

  // Calculate total pages based on filtered products
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Slice the filtered products array for current page
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // const [selectedCategory, setSelectedCategory] = useState(category || "All");

  // Effect to organize products into categories once they are fetched
  useEffect(() => {
    if (products) {
      const uniqueCategories = [
        "All",
        ...new Set(products.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
      // Adjust here to respect the useParams category if exists
      if (category && uniqueCategories.includes(category)) {
        setSelectedCategory(category);
      }
    }
  }, [products, category]);

  // const filteredProducts =
  //   selectedCategory === "All"
  //     ? products
  //     : products?.filter((product) => product.category === selectedCategory);

  const navigate = useNavigate();

  const handleCategorySelect = (newCategory) => {
    setSelectedCategory(newCategory);
    setCurrentPage(1); // Reset to the first page
  };

  // const handleCategorySelect = (category) => {
  //   setSelectedCategory(category); // Set selected category before navigating
  //   navigate(`/products/${category}`);
  // };

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

  return (
    <main className=" flex  bg-gray-bk flex-col gap-6 mt-20  md:mt-24 lg:mt-36">
      <section className="mx-auto  max-w-7xl bg-gray-bk px-4 sm:px-6 lg:px-10 ">
        <h3 className="text-center w-full text-pry-deep text-base md:text-2xl my-10 capitalize">
          All Products
        </h3>
        <div className="w-full flex text-gray-400  justify-between items-center  md:justify-between p-4 border-y bo border-gray-200 ">
          <p className="w-full hidden md:block">20 products</p>
          <div className="w-full   flex items-center justify-between md:justify-end  ">
            {/* Sort Products */}

            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6  md:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <h3 className="text-lg font-bold text-zinc-700">Filter</h3>
              {/* <IoFilterSharp style={{ fontSize: "20px" }} /> */}
            </button>

            <div className="flex w-full max-w-xs items-center justify-end">
              <label className="mr-2">Sort by:</label>
              <select className="select select-ghost w-full max-w-[10rem]">
                <option value="latest">Latest</option>
                <option value="lowest-price">Lowest Price</option>
                <option value="highest-price">Highest Price</option>
                <option value="a-z">A - Z</option>
                <option value="z-a">Z - A</option>
              </select>
            </div>
          </div>
        </div>
        <div aria-labelledby="products-heading" className="pb-24 pt-6 ">
          <div className="grid  grid-cols-1  lg:grid-cols-5">
            {/* Filters */}
            <form className="hidden lg:block text-dark pr-2 ">
              <div className="flex items-center gap-2">
                <IoFilterSharp style={{ fontSize: "20px" }} />
                <h3 className="text-lg font-bold ">Filters</h3>
              </div>
              <h3 className="text-lg font-semibold border-b">
                Shop by Category
              </h3>
              {/* Category Selection */}
              <div className="flex flex-col items-start p-2">
                {[
                  "All",
                  ...new Set(products.map((product) => product.category)),
                ].map((category) => (
                  <button
                    type="button"
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </form>

            {/* Product grid */}
            <div className="lg:col-span-4  ">
              {loading ? (
                <CardSkeleton cards={4} products={products} />
              ) : (
                <>
                  <section className="w-full   flex flex-col items-center justify-center  ">
                    <div className="container max-w-7xl flex flex-col item-center justify-center gap-8 ">
                      <div className="w-full p-2">
                        <div className="grid pb-8 justify-between overflow-auto  grid-cols-2 gap-2 md:gap-4 md:grid-cols-3 lg:grid-cols-3 ">
                          {currentProducts.map((product) => {
                            return (
                              <CardProducts
                                key={product._id}
                                product={product}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </section>

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
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
