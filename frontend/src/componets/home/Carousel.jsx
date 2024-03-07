import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useGetAllProductsQuery } from "../../redux/features/product/productsApi";
import { ProductCard } from "./ProductCard";

const Carousel = () => {
  const { data: products, error, isLoading } = useGetAllProductsQuery();

  // Sort products based on salesCount, descending
  const bestSellingProducts = products
    ?.slice()
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 10); // Get top 10 best selling

  return (
    <section className="w-full flex flex-col items-center gap-8">
      <h2 className="max-w-3xl w-full text-dark text-center font-bold text-2xl md:text-5xl">
        This Week's Most Popular{" "}
        <span className="text-pry-color text-2xl md:text-5xl">
          And Best Selling
        </span>
      </h2>
      <Splide
        className="w-full container max-w-7xl"
        aria-label="Best Selling Products"
        options={{
          fixedWidth: "300px",
          perPage: 3,
          // gap: "2px",
          breakpoints: {
            640: {
              perPage: 2,
              // gap: "1rem",
            },
            480: {
              perPage: 2,
              // gap: ".7rem",
            },
          },
          pagination: false,
          arrows: true,
          focus: "center",
          autoplay: true,
          rewind: true,
          type: "loop",
        }}
      >
        {isLoading ? (
          <div className="flex  justify-center ">
            <span className="loading loading-ball loading-xs"></span>
            <span className="loading loading-ball loading-sm"></span>
            <span className="loading loading-ball loading-md"></span>
            <span className="loading loading-ball loading-lg"></span>
          </div>
        ) : bestSellingProducts && bestSellingProducts.length > 0 ? (
          bestSellingProducts.map((product) => (
            <SplideSlide key={product._id}>
              <ProductCard product={product} />
            </SplideSlide>
          ))
        ) : (
          <p>No products found</p>
        )}
      </Splide>
    </section>
  );
};

export default Carousel;
