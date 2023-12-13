import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoCheckmarkCircleSharp, IoCloseCircleSharp } from "react-icons/io5";
import { shortenText } from "../utils";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";

const ProductCard = (props) => {
  const { image, name, description, price, stock } = props.itemList;

  const dispatch = useDispatch();
  const handleAddToCart = (itemList) => {
    dispatch(addToCart(itemList));
  };

  let textInputs;
  if (stock === 0) {
    textInputs = (
      <span className="w-full  flex justify-between items-center gap-1 text-red-900">
        <IoCloseCircleSharp />
        <p className="text-[10px]">Out of Stock</p>
      </span>
    );
  } else if (stock > 0) {
    textInputs = (
      <span className="  flex items-center gap-1 text-dark">
        <IoCheckmarkCircleSharp />
        <p className="text-[10px]">in Stock</p>
      </span>
    );
  }
  return (
    <>
      {/*<!-- Component: E-commerce card --> */}
      <div className="relative overflow-hidden rounded-2xl border bg-white text-slate-500 shadow-md shadow-slate-200 p-2">
        {/*  <!-- Image --> */}
        <Link to="product/:id" className="">
          <img src={image} alt="card image" className="aspect-video w-full" />
          {textInputs && (
            <span className="absolute bg-gray-bk rounded-br-lg p-1  top-0 left-0 flex items-center gap-1 text-dark">
              {textInputs}
            </span>
          )}
        </Link>
        {/*  <!-- Body--> */}
        <div className="p-4">
          <ReactStars
            count={5}
            // onChange={ratingChanged}
            size={24}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
            value="3"
          />
          <header className="mb-4">
            <h3 className="text-xl font-medium text-slate-700">{name}</h3>
            <p className=" text-slate-400">
              <span>&#8358;</span>
              {price}
            </p>
          </header>
          <p>{shortenText(description, 20)}</p>
        </div>
        {/*  <!-- Action base sized basic button --> */}
        <div className="w-full flex justify-between  mb-4 ml-4  ">
          <button
            type="button"
            onClick={() => handleAddToCart(itemList)}
            className="btn btn-primary text-light"
          >
            Add to Cart
          </button>
          {/* <motion.div
            whileHover={{ rotate: 45 }}
            whileTap={{ scale: 1 }}
            to="/"
          >
            <ion-icon
              size="large"
              name="add-circle-outline"
              style={{ color: "pry-color" }}
            ></ion-icon>
          </motion.div> */}
        </div>
      </div>
      {/*<!-- End E-commerce card --> */}
    </>
  );
};

export default ProductCard;
