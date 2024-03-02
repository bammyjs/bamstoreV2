import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { NewItems } from "../../datas/productData";
import { shortenText } from "../../utils";
import ReactStars from "react-rating-stars-component";
import { useGetAllProductsQuery } from "../../redux/features/product/productsApi";
import CardProducts from "../product/CardProducts";
import { ProductCard } from "./ProductCard";
import { NewProductCard } from "../product/NewProductCard";
import CardSkeleton from "../product/CardSkeleton";

function NewProducts() {
  const [loading, setLoading] = useState(true);
  const { data: products, error, isLoading } = useGetAllProductsQuery();

  // Create a copy of the products array and sort it
  const sortedProducts = products
    ? [...products].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  // Select the first X products to display
  const displayProducts = sortedProducts.slice(0, 4); // Adjust number as needed

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading]);

  return (
    <section className="w-full bg-gray-bk flex justify-center my-6  ">
      <div className="container  max-w-7xl flex flex-col item-center  p-4 ">
        <h2 className="  text-dark text-center font-bold text-2xl md:text-5xl">
          Newly Arriver
        </h2>
        {/* <Carousel /> */}
        {isLoading ? (
          <div className="grid pb-8 justify-between overflow-auto  grid-cols-2 gap-2 md:gap-4 md:grid-cols-3 lg:grid-cols-3 ">
            <CardSkeleton cards={4} products={products} />
          </div>
        ) : error ? (
          <div>An error occurred: {error.message}</div>
        ) : (
          <>
            <section className="w-full  mx-auto mt-10 sm:px-6 lg:px-10">
              <div className="flex flex-col item-center justify-center gap-8">
                <div className="w-full md:p-2">
                  <div className="grid pb-8 justify-between grid-cols-2 gap-2 md:gap-2 md:grid-cols-3 lg:grid-cols-4">
                    {displayProducts.map((product, i) => (
                      <NewProductCard
                        key={i}
                        sortedProducts={sortedProducts}
                        product={product}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <Link
              className="btn btn-primary px-10 md:place-self-end"
              to={"/products"}
            >
              Shop more
            </Link>
          </>
        )}
      </div>
    </section>
  );
}

export default NewProducts;
