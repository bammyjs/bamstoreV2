import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/features/product/productsApi";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { shortenText } from "../../utils";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";

const AllProducts = ({ products }) => {
  return (
    <>
      <thead className="bg-pry-deep">
        <th className="text-left py-3 px-2 rounded-l-lg">item</th>
        <th className="text-left py-3 px-2">Description</th>
        <th className="text-left py-3 px-2">Brand</th>
        <th className="text-left py-3 px-2">Category</th>
        <th className="text-left py-3 px-2 rounded-r-lg">Action</th>
      </thead>
      {products?.map((product, i) => {
        return (
          <tbody key={i}>
            <tr className="border-b text-dark border-gray-700">
              <td className="py-3 px-2  font-bold">
                <div className="inline-flex space-x-3 items-center">
                  <span>
                    <img
                      className="rounded-full w-8 h-8"
                      src={product.image?.[0]}
                    />
                  </span>
                  <span>{shortenText(product.name, 10)}</span>
                </div>
              </td>
              <td className="py-3 px-2">
                {shortenText(product.description, 15)}
              </td>
              <td className="py-3 px-2">{product.brand}</td>
              <td className="py-3 px-2">{product.category}</td>
              <td className="py-3 px-2">
                <div className="inline-flex items-center space-x-3">
                  <Link to={"#"} title="Edit" className="hover:text-gray">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </Link>
                  <Link
                    to={"#"}
                    title="Edit password"
                    className="hover:text-gray"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </Link>
                  <Link
                    to={"#"}
                    title="Suspend user"
                    className="hover:text-gray"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      />
                    </svg>
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        );
      })}
    </>
  );
};

const AvailableProducts = () => {
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
        All products
      </h3>
      <div className="overflow-x-scroll">
        <table className="w-full  whitespace-nowrap">
          {loading ? (
            <div className="flex  justify-center ">
              <span className="loading loading-ball loading-xs"></span>
              <span className="loading loading-ball loading-sm"></span>
              <span className="loading loading-ball loading-md"></span>
              <span className="loading loading-ball loading-lg"></span>
            </div>
          ) : (
            <>
              <AllProducts
                products={products}
                // key={products.id}
                {...products}
              />
            </>
          )}
        </table>
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

export default AvailableProducts;
