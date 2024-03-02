import { useGetAllProductsQuery } from "../../redux/features/product/productsApi";
import { Fragment, useEffect, useState } from "react";
import CardProducts from "../product/CardProducts";
import { Link } from "react-router-dom";
import { NewProductCard } from "../product/NewProductCard";
import CardSkeleton from "../product/CardSkeleton";

function WorkSpaceProducts() {
  const [loading, setLoading] = useState(true);
  const { data: products, error, isLoading } = useGetAllProductsQuery();
  console.log(products);

  const workspaceProducts =
    products?.filter((product) => product.category === "Workspace") || [];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return (
    <section className="w-full bg-gray-bk flex justify-center   ">
      <div className="flex flex-col item-center  gap-8 p-4 border-b-2 border-pry-color">
        <h2 className="  text-dark text-left font-bold text-2xl md:text-5xl">
          Workspace
        </h2>
        {loading ? (
          <div className="grid pb-8 justify-between overflow-auto  grid-cols-2 gap-2 md:gap-4 md:grid-cols-3 lg:grid-cols-3 ">
            <CardSkeleton cards={4} products={products} />
          </div>
        ) : error ? (
          <div>An error occurred: {error.message}</div>
        ) : (
          <>
            <section className=" ">
              <div className="  flex flex-col item-center justify-center gap-8  ">
                <div className="w-full md:p-2">
                  <div className="grid  justify-between   grid-cols-2 gap-2 md:gap-2 md:grid-cols-3 lg:grid-cols-4 ">
                    {workspaceProducts?.slice(0, 4).map((product) => {
                      return (
                        <NewProductCard
                          key={product._id}
                          product={product}
                          category={product.category}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
            <Link
              className="btn btn-primary  px-10 md:place-self-end"
              to={"/workSpace"}
            >
              Shop More
            </Link>
          </>
        )}
      </div>
    </section>
  );
}

export default WorkSpaceProducts;
