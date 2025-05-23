import { useGetAllProductsQuery } from "../../redux/features/product/productsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
import {
  IoCartOutline,
  IoCheckmarkCircleSharp,
  IoCloseCircleSharp,
} from "react-icons/io5";
import { shortenText } from "../../utils";
import ReactStars from "react-rating-stars-component";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function CardProducts({ product }) {
  const dispatch = useDispatch();

  const [averageRating, setAverageRating] = useState();

  useEffect(() => {
    if (product?.ratings?.length > 0) {
      const sum = product.ratings.reduce((acc, curr) => acc + curr.star, 0);
      const newAverage = sum / product.ratings.length;
      setAverageRating(newAverage);
    } else {
      setAverageRating(0); // Handle the case with no ratings
    }
  }, [product]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // navigate("/cart");
  };

  let textInputs = product.quantity === 0 ? "SOLD OUT" : "IN STOCK";
  let displayCart = product.quantity > 0 ? true : false;

  return (
    <div
      key={product._id}
      className="bg-light min-w-[10rem] max-w-xs rounded-xl items-baseline shadow-xl hover:shadow-xl"
    >
      <div className="relative w-full bg-light flex items-end overflow-hidden rounded-xl">
        <Link
          to={`/product/${product._id}`}
          className=" w-full h-auto relative"
        >
          <img
            className="w-full  h-auto aspect-[2/2]  hover:transform scale-75 hover:scale-100 duration-3000 ease-in-out object-cover"
            src={product.image?.[0]}
            alt={product.name}
          />
        </Link>
        {textInputs && (
          <span className="absolute bg-dark text-xs px-2 py-1 top-0 left-0 flex items-center gap-1 text-neutral">
            {textInputs}
          </span>
        )}
        <span className="absolute bg-pry-color capitalize text-center text-xs py-1 px-2 top-6 left-0 flex items-center text-neutral">
          SAVE<span className="text-xs">&#8358;</span>
          {product?.regularPrice - product?.price}
        </span>
      </div>

      <div className="mt-1 p-4">
        <h2 className="text-slate-700 text-lg font-semibold">
          {shortenText(product?.name, 20)}
        </h2>
        <div
          className="mt-1 text-base font-normal text-slate-400"
          dangerouslySetInnerHTML={{
            __html: shortenText(product?.features, 20),
          }}
        />
        {averageRating > 0 ? (
          <ReactStars
            count={5}
            size={24}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
            value={averageRating}
          />
        ) : (
          <ReactStars
            count={5}
            size={24}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
            value={3}
          />
        )}

        <div className="flex items-end justify-between">
          <div className="flex flex-col  items-center">
            <p className="text-base md:text-xl font-bold text-pry-deep">
              <span className="text-base md:text-xl font-bold text-pry-deep">
                &#8358;
              </span>
              {new Intl.NumberFormat("en-NG").format(product.price)}
            </p>
            {/* <p className=" font-light text-base text-gray">
              <strike className="text-xs  md:text-base  ">
                <span className=" text-xs  md:text-base ">&#8358;</span>
                {new Intl.NumberFormat("en-NG").format(product?.regularPrice)}
              </strike>
            </p> */}
          </div>
          {displayCart ? (
            <button
              type="button"
              onClick={() => handleAddToCart(product)}
              className="flex items-center space-x-1.5 rounded-full bg-dark p-2 text-white duration-100 hover:bg-neutral hover:text-pry-deep"
            >
              <motion.div whileHover={{ rotate: 45 }} whileTap={{ scale: 1 }}>
                <IoCartOutline
                  style={{ fontSize: "20px" }}
                  className="text-2xl"
                />
              </motion.div>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleAddToCart(product)}
              className="btn-disabled flex items-center space-x-1.5 rounded-full bg-dark p-2 text-white duration-100 hover:bg-neutral hover:text-pry-deep"
            >
              <motion.div whileHover={{ rotate: 45 }} whileTap={{ scale: 1 }}>
                <IoCartOutline
                  style={{ fontSize: "20px" }}
                  className="text-2xl"
                />
              </motion.div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default CardProducts;
