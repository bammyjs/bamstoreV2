import heroImage from "../../assets/hero-image.svg";
import { HashLink as Link } from "react-router-hash-link";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className=" bg-pry-deep  w-full flex justify-center items-center    mt-20 md:mt-16 ">
      <div className="container     md:pt-10 w-full max-w-7xl  place-items-center  grid md:grid-cols-2 md:px-6">
        <motion.picture
          initial={{ x: "2rem", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 2,
            type: "spring",
          }}
          className=" order-1 place-self-end"
        >
          <img
            src={heroImage}
            className=" w-full object-contain h-auto"
            alt=""
          />
        </motion.picture>
        <motion.div
          initial={{ y: "2rem", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 2,
            type: "spring",
          }}
          className="flex flex-col  w-full max-w-lg py-8 md:py-20 lg:py-44 gap-8 md:gap-10 justify-center items-center md:items-start"
        >
          <p className="text-sm text-neutral text-center md:text-left">
            Best Product
          </p>
          <h1 className="text-4xl text-neutral text-center md:text-left md:text-4xl lg:text-5xl text-700">
            Get Quality Gadgets, <br></br>
            <span className="text-5xl text-pry-color">Forget</span> The Rest...
          </h1>
          <p className="text-sm text-neutral text-center md:text-left">
            Bamstore provides a full service range including technical skils,
            design, business understanding fujhthjkndfghusdgnj gaduihgjkhegrueir
            adfyuhtearyjkt
          </p>
          <div className="">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className=" btn  bg-pry-color  font-medium text-white transition duration-200 active:bg-blue-950"
              to="/"
            >
              <Link to="/products" className="">
                Explore Now
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
