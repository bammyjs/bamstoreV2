import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { shortenText } from "../../utils";

export const ProductCard = ({ product }) => {
  return (
    <div className="min-w-[5rem] max-w-64 mb-2 rounded-3xl flex flex-col group bg-light border-2 border-gray-bk justify-center items-center p-6">
      <div className="absolute rounded-tl-3xl bg-black p-2 left-0 top-0">
        {product.salesCount} Sold
      </div>
      <div className="h-45 w-45 rounded-full bg-gray-bk border-2 border-white flex items-center justify-center text-white text-base mb-3 md:mb-5 overflow-hidden relative">
        <img
          src={product.image[0]}
          className="object-contain aspect-square w-full bg-blend-exclusion h-auto scale-75 group-hover:scale-110 transition-all duration-400"
          alt={product.name}
        />
      </div>
      <div className="w-full flex flex-col gap-2 items-start ">
        <h3 className="text-xl text-dark font-medium">
          {shortenText(product?.name, 15)}
        </h3>
        {/* <div
          className=" text-base font-normal text-slate-400"
          dangerouslySetInnerHTML={{
            __html: shortenText(product?.features, 20),
          }}
        /> */}
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
            <Link to={`/product/${product._id}`}>Buy Now</Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
