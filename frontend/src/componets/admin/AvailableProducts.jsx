import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/features/product/productsApi";
import {
  deleteProduct,
  getProducts,
} from "../../redux/features/product/productSlice";
import {
  IoChevronForward,
  IoChevronBack,
  IoTrashOutline,
  IoEyeOutline,
  IoCreateOutline,
} from "react-icons/io5";
import { shortenText } from "../../utils";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch } from "react-redux";

const AllProducts = ({ products }) => {
  const dispatch = useDispatch();

  const delProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());

    // Reload the page after successful deletion
    window.location.reload();
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  return (
    <>
      <thead className="bg-pry-deep">
        <th className="text-left py-3 px-2 rounded-l-lg">s/n</th>
        <th className="text-left py-3 px-2 rounded-l-lg">item</th>
        <th className="text-left py-3 px-2">Category</th>
        <th className="text-left py-3 px-2">Price</th>
        <th className="text-left py-3 px-2">Quantity</th>
        <th className="text-left py-3 px-2">Value</th>
        <th className="text-left py-3 px-2 rounded-r-lg">Action</th>
      </thead>
      {products?.map((product, i) => {
        return (
          <tbody key={i}>
            <tr className=" border-b text-dark border-gray-700">
              <td className="py-3 px-2">{i + 1}</td>
              <td className="py-3 px-2  font-bold">
                <div className="inline-flex space-x-3 items-center">
                  {/* <span>
                    <img
                      className="rounded-full w-8 h-8"
                      src={product.image?.[0]}
                    />
                  </span> */}
                  <span>{shortenText(product.name, 10)}</span>
                </div>
              </td>
              <td className="py-3 px-2">{product.category}</td>
              <td className="py-3 px-2">
                <span>&#8358;</span>
                {product.price}
              </td>
              <td className="py-3 px-2">{product.quantity}</td>
              <td className="py-3 px-2">
                <span>&#8358;</span>
                {product.quantity * product.price}
              </td>
              <td className="py-3 px-2">
                <div className="inline-flex items-center space-x-3">
                  <Link
                    to={`/admin/editProduct/${product._id}`}
                    title="Edit"
                    className="hover:text-gray"
                  >
                    <IoCreateOutline
                      style={{ fontSize: "20px", color: "green" }}
                    />
                  </Link>
                  <Link
                    to={`/product/${product._id}`}
                    title="Edit password"
                    className="hover:text-gray"
                  >
                    <IoEyeOutline style={{ fontSize: "20px", color: "blue" }} />
                  </Link>

                  <IoTrashOutline
                    style={{ fontSize: "20px", color: "red" }}
                    onClick={() => confirmDelete(product._id)}
                  />
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
        All products<span className="text-red-700">{}</span>
      </h3>
      <div className="overflow-x-scroll">
        <table className="table  w-full  whitespace-nowrap">
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
                // key={products._id}
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
