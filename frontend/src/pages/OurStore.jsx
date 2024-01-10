import React from "react";
import GamingProduct from "../componets/home/GamingProduuct";
import BreadCrumb from "../componets/BreadCrumb";
import { Meta } from "../componets/Meta";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { NewItems, ProductData } from "../datas/productData";
import AllProducts from "../componets/product/AllProducts";
import { useGetAllProductsQuery } from "../redux/features/product/productsApi";
import { Navigate, useLocation } from "react-router";

export const OurStore = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();

  return (
    <>
      <Meta title={"Store"} />
      <main className=" flex  bg-gray-bk flex-col gap-6 mt-20  md:mt-24 lg:mt-36">
        <div className="w-full  mb-10 flex flex-wrap justify-center items-center">
          {isLoading ? (
            <>
              <span className="loading loading-ball loading-xs"></span>
              <span className="loading loading-ball loading-sm"></span>
              <span className="loading loading-ball loading-md"></span>
              <span className="loading loading-ball loading-lg"></span>
            </>
          ) : error ? (
            <p>An error occurred...</p>
          ) : (
            <>
              <AllProducts />
            </>
          )}
        </div>
      </main>
    </>
  );
};
