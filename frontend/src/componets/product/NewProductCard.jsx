import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { shortenText } from "../../utils";

export const NewProductCard = ({ product, sortedProducts }) => {
  return (
    <div className="relative min-w-[10rem] max-w-xs mb-2 rounded-3xl flex flex-col group bg-gray-bk  justify-center items-center p-6">
      <div className="h-45 w-45 rounded-full bg-light border-2 border-white flex items-center justify-center text-white text-base mb-3 md:mb-5 overflow-hidden relative">
        <img
          src={product.image[0]}
          className="object-contain bg-blend-exclusion aspect-square w-full h-auto scale-75 group-hover:scale-110 transition-all duration-400"
          alt={product.name}
        />
      </div>
      {sortedProducts && (
        <p className="text-red-900 text-base absolute top-0 left-0 p-1  border  border-dark">
          New
        </p>
      )}
      <div className="w-full flex flex-col gap-2 items-start ">
        <Link
          to={`/products/${product._id}`}
          className="block text-dark font-bold text-left hover:text-primary transition-colors duration-150 text-lg md:text-xl "
        >
          {shortenText(product?.name, 20)}
        </Link>
        <div
          className=" text-base font-normal text-slate-400"
          dangerouslySetInnerHTML={{
            __html: shortenText(product?.features, 20),
          }}
        />
        <div className="w-full flex items-center justify-between ">
          <p className="text-base font-bold text-pry-deep">
            <span>&#8358;</span>
            {new Intl.NumberFormat("en-NG").format(product.price)}
          </p>
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1 }}
            className="rounded-full bg-pry-color px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-blue-900 active:bg-blue-950"
          >
            <Link to={`/products/${product._id}`}>Buy Now</Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
