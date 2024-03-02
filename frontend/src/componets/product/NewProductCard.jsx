import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { shortenText } from "../../utils";

export const NewProductCard = ({ product, sortedProducts }) => {
  return (
    <div className="w-full min-w-[10rem] max-w-xs bg-light p-5 flex flex-col gap-1 rounded-3xl">
      {sortedProducts && (
        <p className="uppercase text-sec-color text-base">new</p>
      )}

      <h3 className="text-xl text-dark font-medium">
        {shortenText(product?.name, 15)}
      </h3>
      {/* {sortedProducts ? null : (
        <div
          className=" text-base font-normal text-slate-400"
          dangerouslySetInnerHTML={{
            __html: shortenText(product?.features, 20),
          }}
        />
      )} */}

      <Link to={`/product/${product._id}`}>
        <img
          className="w-full aspect-square my-3 bg-blend-exclusion  h-auto scale-75 hover:scale-100 transition-all duration-400"
          src={product.image[0]}
          alt=""
        />
      </Link>
      <div className="flex justify-between items-center ">
        <p className="text-base text-gray capitalize">
          <span className="text-base text-gray ">&#8358;</span>
          {new Intl.NumberFormat("en-NG").format(product.price)}
        </p>
        <Link
          to={`/product/${product._id}`}
          className=" bg-primary hover:bg-pry-deep text-light  border-0 rounded-3xl capitalize py-2 px-4"
        >
          buy
        </Link>
      </div>
    </div>
  );
};

// <div className=" relative min-w-[10rem] max-w-xs mb-2 rounded-3xl flex flex-col group bg-gray-bk  justify-center items-center p-6">
//   <div className="h-45 w-45 rounded-full bg-light border-2 border-white flex items-center justify-center text-white text-base mb-3 md:mb-5 overflow-hidden relative">
//     <Link to={`/product/${product._id}`}>
//       <img
//         src={product.image[0]}
//         className="object-contain bg-blend-exclusion aspect-square w-full h-auto scale-75 group-hover:scale-110 transition-all duration-400"
//         alt={product.name}
//       />
//     </Link>
//   </div>
//   {sortedProducts && (
//     <>
//       <p className="animate-ping w-11 h-8 opacity-75 text-red-900 text-sm absolute top-0 left-0 p-1  border  border-dark">
//         New
//       </p>
//       {/* <span class="animate-ping absolute w-12 h-12 inline-flex border-2 rounded-2xl border-green-400 opacity-75"></span> */}
//     </>
//   )}
//   <div className="w-full flex flex-col gap-2 items-start ">
//     <h3 className="text-dark text-sm md:text-base font-bold">
//       {shortenText(product?.name, 20)}
//     </h3>
//     <div
//       className=" text-base font-normal text-slate-400"
//       dangerouslySetInnerHTML={{
//         __html: shortenText(product?.features, 20),
//       }}
//     />
//     <div className="w-full flex items-center justify-between ">
//       <p className=" font-bold text-pry-deep">
//         <span>&#8358;</span>
//         {new Intl.NumberFormat("en-NG").format(product.price)}
//       </p>
//     </div>
//   </div>
// </div>
