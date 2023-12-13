import React from "react";
import Hero from "../componets/home/Hero";
import Brand from "../componets/home/Brand";
import Videoplay from "../componets/home/Videoplay";
import FeaturedProduct from "../componets/home/FeaturedProduct";
import BestSelling from "../componets/home/BestSelling";
import Workspace from "../componets/home/Workspace";
import NewProducts from "../componets/home/NewProducts";
import GamingFun from "../componets/home/GamingFun";
import GamingProduct from "../componets/home/GamingProduuct";
import Recommendation from "../componets/home/Recommendations";
Recommendation;

function Home() {
  return (
    <>
      <main className=" flex flex-col gap-8 bg-light">
        <Hero />
        <Brand />
        {/* <Videoplay /> */}
        <FeaturedProduct />
        <BestSelling />
        <Workspace />
        {/* <GamingProduct /> */}
        {/*replace with workspace products}
        {/* <NewProducts /> */}
        <GamingFun />
        {/* <GamingProduct /> */}
        <Recommendation />
      </main>
    </>
  );
}

export default Home;
