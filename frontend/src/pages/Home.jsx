import Hero from "../componets/home/Hero";
import FeaturedProduct from "../componets/home/FeaturedProduct";
import BestSelling from "../componets/home/BestSelling";
import Workspace from "../componets/home/Workspace";
import NewProducts from "../componets/home/NewProducts";
import GamingFun from "../componets/home/GamingFun";
import GamingProduct from "../componets/home/GamingProduuct";
import Recommendation from "../componets/home/Recommendations";
import ProductCategory from "../componets/product/ProductCategory";
import WorkSpaceProducts from "../componets/home/WorkSpaceProducts";
import { Meta } from "../componets/Meta";

function Home() {
  return (
    <>
      <Meta
        title="Home Page - Bamstore.ng"
        description="Welcome to the BamstoreNG No1 gadget store in Nigeria."
        keywords="home, bamstore, welcome to bamstore ng"
        url="http://bamstore.ng/home"
      />
      <main id="main-content" className=" flex flex-col bg-gray-bk ">
        <Hero />
        <FeaturedProduct />
        <BestSelling />
        <NewProducts />
        <Workspace />
        <WorkSpaceProducts />
        <GamingFun />
        <GamingProduct />
        {/* <Recommendation /> */}
      </main>
    </>
  );
}

export default Home;
