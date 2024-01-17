import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

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

const PaginationButtons = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // Pagination change handler
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1); // +1 because event.selected is zero-based
  };

  return (
    <motion.div
      variants={paginationVariants}
      initial="hidden"
      animate="visible"
    >
      <ReactPaginate
        breakLabel="..."
        previousLabel={
          <span>
            <IoChevronBack style={{ fontSize: "15px" }} />
          </span>
        }
        nextLabel={
          <span>
            <IoChevronForward style={{ fontSize: "15px" }} />
          </span>
        }
        pageRangeDisplayed={5}
        pageCount={products?.pages || 1}
        onPageChange={handlePageClick}
        containerClassName="flex items-center justify-center mt-8 mb-4"
        pageClassName="block border border-solid border-dark hover:bg-dark w-10 h-10 flex item-center justify-center rounded-md mr-4"
        activeClassName="bg-light"
      />
    </motion.div>
  );
};

export default PaginationButtons;
