import React, { useEffect } from "react";

import BreadCrumb from "../componets/BreadCrumb";

import { Meta } from "../componets/Meta";
import { Link } from "react-router-dom";
import image1 from "../assets/14pro.svg";
import image2 from "../assets/controller.svg";
import ReactStars from "react-rating-stars-component";
import { motion } from "framer-motion";
import { IoCartOutline } from "react-icons/io5";
import SingleProduct from "../componets/product/SingleProduct";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../redux/features/product/productsApi";

//Get single Product details

const Product = () => {
  const { _id } = useParams();
  console.log(_id);
  const { data: product, error, isLoading } = useGetSingleProductQuery(_id);

  console.log(product);

  return (
    <section className="mt-32">
      {/* <BreadCrumb data={data} />; */}
      <main className="bg-neutral flex flex-col gap-6 items-center ">
        <section className="py-12 sm:py-16 text-dark">
          <div>
            6
            <>
              <h1>Single item page</h1>
              <h2>{product.name}</h2>
              {/* <SingleProduct /> */}
            </>
          </div>
        </section>
      </main>
    </section>
  );
};

export default Product;
