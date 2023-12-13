import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ProductData } from "../../datas/productData";
import { shortenText } from "../../utils";

const Carousel = () => {
  return (
    <section className="w-full flex flex-col items-center gap-8">
      <h2 className=" max-w-3xl w-full text-dark text-center font-bold text-2xl md:text-5xl">
        This Weeks Most Popular{" "}
        <span className="text-pry-color text-2xl md:text-5xl">
          And Best Selling
        </span>
      </h2>
      <Splide
        className="w-full container max-w-7xl "
        aria-label="Feedback"
        options={{
          fixedWidth: "300px",
          perPage: 3,
          gap: "3rem",
          breakpoints: {
            640: {
              perPage: 2,
              gap: "1rem",
              // height : '6rem',
            },
            480: {
              perPage: 1,
              gap: ".7rem",
              // height : '6rem',
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
        {ProductData.map((feed) => {
          return (
            <SplideSlide>
              <Slides feed={feed} key={feed.id} />
            </SplideSlide>
          );
        })}
      </Splide>
    </section>
  );
};

const Slides = (props) => {
  const { image, title, description, price } = props.feed;
  return (
    <div className="min-w-[300px] mb-2 rounded-3xl flex flex-col group bg-light border-[1px] border-pry-color justify-center items-center p-8">
      <div className=" h-40 w-40 rounded-full bg-pry-color border-2 border-white flex items-center justify-center text-white text-base mb-3 md:mb-5 overflow-hidden relative">
        <img
          src={image}
          className="object-cover w-full h-full scale-100 group-hover:scale-110 transition-all duration-400"
          alt=""
        />
        <div className="rounded-full absolute z-10 border-2 border-primary w-[95%] h-[95%] invisible group-hover:visible opacity-0 group-hover:opacity-100 group-hover:scale-90 transition-all duration-500"></div>
      </div>
      <div className="flex flex-col items-start">
        <a
          href="#"
          className=" block text-dark font-bold text-left hover:text-primary transition-colors duration-150 text-lg md:text-xl mb-2"
        >
          {title}
        </a>
        <p className="mb-2 font-normal  text-sm md:text-sm text-left text-[#700000]">
          {shortenText(description, 20)}
        </p>
        <p className=" text-dark font-bold text-left ext-lg md:text-xl">
          <span className=" text-dark font-bold text-left ext-lg md:text-xl">
            &#8358;
          </span>
          {price}{" "}
        </p>
        <motion.div
          whileHover={{ scale: 0.9 }}
          whileTap={{ scale: 1 }}
          className="rounded-full bg-pry-color px-5 py-2.5 text-sm mt-3 font-medium text-white transition duration-200 hover:bg-blue-900 active:bg-blue-950"
          to="/"
        >
          <Link to="/">Buy Now</Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Carousel;
