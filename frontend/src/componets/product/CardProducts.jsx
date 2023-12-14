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
import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link, useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "./CardSkeleton";

function CardProducts({}) {
  const { data: products, error, isLoading } = useGetAllProductsQuery();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // navigate("/cart");
  };

  return (
    <section className="w-full   flex flex-col items-center justify-center  ">
      <div className="container max-w-7xl flex flex-col item-center justify-center gap-8 p-6 ">
        <div className="w-full p-2">
          <div className="grid pb-8 justify-between overflow-auto  grid-cols-2 gap-2 md:gap-2 md:grid-cols-3 lg:grid-cols-4 ">
            {loading ? (
              <CardSkeleton cards={8} />
            ) : (
              <>
                {products?.map((product, i) => {
                  return (
                    <div
                      key={i}
                      className="rounded-xl  items-baseline bg- p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 "
                    >
                      <div className="relative w-full  bg-neutral flex items-end overflow-hidden rounded-xl">
                        <Link to={`/products/${product._id}`}>
                          <img
                            className="aspect-[2/2] object-cover "
                            src={product.image}
                            alt={product.name}
                          />
                        </Link>
                        {/* <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600"></div> */}
                      </div>

                      <div className="mt-1 p-2">
                        <h2 className="text-slate-700">{product.name}</h2>
                        <p className="mt-1 text-sm text-slate-400">
                          {shortenText(product.description, 15)}
                        </p>

                        <div className="mt-3 flex items-end justify-between">
                          <p className="text-base font-bold text-pry-deep">
                            <span>&#8358;</span>
                            {product.price}
                          </p>

                          <button
                            type="buttton"
                            onClick={() => handleAddToCart(product)}
                            className="flex items-center space-x-1.5 rounded-lg bg-pry-deep px-4 py-1.5 text-white duration-100 hover:bg-neutral hover:text-pry-deep"
                          >
                            <motion.div
                              whileHover={{ rotate: 45 }}
                              whileTap={{ scale: 1 }}
                              to="/"
                            >
                              <IoCartOutline
                                style={{ fontSize: "15px" }}
                                className="text-2xl"
                              />
                            </motion.div>

                            {/* <button
                              type="button"
                              onClick={() => handleAddToCart(product)}
                              className="text-sm"
                            >
                              Add
                            </button> */}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}{" "}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="join space-x-8">
        <button className="join-item btn">1</button>
        <button className="join-item btn btn-active">2</button>
        <button className="join-item btn">3</button>
        <button className="join-item btn">4</button>
      </div>
    </section>
  );
}

export default CardProducts;

// <Fragment key={product.id}>
//   {/*<!-- Component: E-commerce card --> */}
//   <div className="relative h-fit overflow-hidden  text-slate-500  p-2">
//     {/*  <!-- Image --> */}
//     <div className="w-full   ">
//       <img
//         src={product.image}
//         alt="card image"
//         className=" aspect-[3/2] object-contain w-full h-auto"
//       />
//       {/* {textInputs && (
//             <span className="absolute bg-black rounded-br-lg p-1  top-0 left-0 flex items-center gap-1 text-dark">
//               {textInputs}
//             </span>
//           )} */}
//     </div>
//     {/*  <!-- Body--> */}
//     <div className="p-2  flex flex-col gap-1">
//       {/* <ReactStars
//           count={5}
//           // onChange={ratingChanged}
//           size={20}
//           isHalf={true}
//           emptyIcon={<i className="far fa-star"></i>}
//           halfIcon={<i className="fa fa-star-half-alt"></i>}
//           fullIcon={<i className="fa fa-star"></i>}
//           activeColor="#ffd700"
//           value="3"
//         /> */}
//       <div className="flex flex-col gap-1">
//         <h3 className="text-lg font-bold text-slate-700">
//           {product.name}
//         </h3>
//         <p className=" text-slate-400">
//           <span>&#8358;</span>
//           {product.price}
//         </p>
//         <p className="text-xs">
//           {shortenText(product.description, 25)}
//         </p>
//       </div>
//     </div>
//     {/*  <!-- Action base sized basic button --> */}
//     <div className="w-full flex justify-start items-center  mb-4 ml-2  ">
//       <button
//         type="button"
//         onClick={() => handleAddToCart(product)}
//         className="btn btn-outline text-pry-deep  font-normal  capitalize"
//       >
//         Add
//         <motion.div
//           whileHover={{ rotate: 45 }}
//           whileTap={{ scale: 1 }}
//           to="/"
//         >
//           <IoCartOutline className="text-2xl" />
//         </motion.div>
//       </button>
//     </div>
//   </div>
//   {/*<!-- End E-commerce card --> */}
// </Fragment>
