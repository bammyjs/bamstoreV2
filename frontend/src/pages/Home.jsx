import React from "react";
import Hero from "../componets/home/Hero";
import Brand from "../componets/home/Brand";
import FeaturedProduct from "../componets/home/FeaturedProduct";
import BestSelling from "../componets/home/BestSelling";
import Workspace from "../componets/home/Workspace";
import NewProducts from "../componets/home/NewProducts";
import GamingFun from "../componets/home/GamingFun";
import GamingProduct from "../componets/home/GamingProduuct";
import Recommendation from "../componets/home/Recommendations";
import ProductCategory from "../componets/product/ProductCategory";
import WorkSpaceProducts from "../componets/home/WorkSpaceProducts";
Recommendation;

function Home() {
  return (
    <>
      <main id="main-content" className=" flex flex-col bg-gray-bk ">
        <Hero />
        {/* <Brand /> */}
        <FeaturedProduct />
        <BestSelling />
        <NewProducts />
        <Workspace />
        <WorkSpaceProducts />

        {/* <GamingProduct /> */}

        <GamingFun />
        <GamingProduct />
        {/* <Recommendation /> */}
      </main>
    </>
  );
}

export default Home;
