import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  IoAddSharp,
  IoRemoveSharp,
  IoCloseSharp,
  IoFilterSharp,
  IoGridSharp,
  IoFunnelSharp,
  IoChevronDownSharp,
  IoChevronForward,
  IoChevronBack,
} from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { filters } from "./FilterData";
import CardProducts from "./CardProducts";
import { useGetAllProductsQuery } from "../../redux/features/product/productsApi";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "./CardSkeleton";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";

export default function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: products,
    error,
    isLoading,
  } = useGetAllProductsQuery(currentPage);

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

  const location = useLocation();
  const navigate = useNavigate();

  // const handleFilter = (value, sectionId) => {
  //   const searchParams = new URLSearchParams(location.search);
  //   let filterValue = searchParams.getAll(sectionId);

  //   if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
  //     filterValue = filterValue[0].split(",").filter((item) => item !== value);

  //     if (filterValue.length === 0) {
  //       searchParams.delete(sectionId);
  //     }
  //   } else {
  //     filterValue.push(value);
  //   }

  //   if (filterValue.length > 0) {
  //     searchParams.set(sectionId, filterValue.join(","));
  //   }
  //   const query = searchParams.toString();
  //   navigate({ search: `?${query}` });
  // };

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
    <div className="">
      <div>
        {/* Mobile filter dialog */}

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex  justify-end gap-20 md:justify-between p-4 border-b border-gray-200 ">
            <h3 className=" w-full text-pry-deep text-2xl text-left capitalize">
              All Product
            </h3>

            <div className="flex items-center">
              {/* Sort Products */}
              {/* <div className="">
                <label>Sort by:</label>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="latest">Latest</option>
                  <option value="lowest-price">Lowest Price</option>
                  <option value="highest-price">Highest Price</option>
                  <option value="a-z">A - Z</option>
                  <option value="z-a">Z - A</option>
                </select>
              </div> */}

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <IoGridSharp style={{ fontSize: "20px" }} />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <IoFilterSharp style={{ fontSize: "20px" }} />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6 ">
            <h2 id="products-heading" className=" sr-only">
              Products
            </h2>

            <div className="grid  grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Filters */}
              <form className="hidden lg:block ">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-zinc-700">Filters</h3>
                  <IoFilterSharp style={{ fontSize: "20px" }} />
                </div>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-4 ">
                {loading ? (
                  <CardSkeleton cards={4} products={products} />
                ) : (
                  <>
                    <CardProducts
                      products={products}
                      // key={products.id}
                      {...products}
                    />
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
                  </>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
