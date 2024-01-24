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

function CardProducts({ products }) {
  console.log(products);
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
            {products?.map((product, i) => {
              let textInputs;
              let bgColor;
              if (product.quantity === 0) {
                textInputs = "sold out";
                bgColor = "bg-sec-color";
              } else if (product.quantity > 0) {
                textInputs = "in stock";
                bgColor = "bg-sec-color";
              }

              let displayCart;
              if (product.quantity === 0) {
                displayCart = false;
              } else if (product.quantity > 0) {
                displayCart = true;
              }
              return (
                <div
                  key={i}
                  className="rounded-xl  items-baseline bg- p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 "
                >
                  <div className="relative w-full  $`{bgColor}` flex items-end overflow-hidden rounded-xl">
                    <Link to={`/product/${product._id}`}>
                      <img
                        className="aspect-[2/2] object-cover "
                        src={product.image?.[0]}
                        alt={product.name}
                      />
                    </Link>
                    {textInputs && (
                      <span className="absolute bg-black bg-sec- text-xs rounded-br-lg p-1  top-0 left-0 flex items-center gap-1 text-neutral">
                        {textInputs}
                      </span>
                    )}
                    {/* <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600"></div> */}
                  </div>

                  <div className="mt-1 p-2">
                    <h2 className="text-slate-700">{product.name}</h2>
                    <p className="mt-1 text-sm text-slate-400">
                      {shortenText(product.description, 15)}
                    </p>
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

                    <div className="mt-3 flex items-end justify-between">
                      <p className="text-base font-bold text-pry-deep">
                        <span>&#8358;</span>
                        {product.price}
                      </p>
                      {displayCart ? (
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
                        </button>
                      ) : (
                        <button
                          type="buttton"
                          onClick={() => handleAddToCart(product)}
                          className="btn-disabled flex items-center space-x-1.5 rounded-lg bg-pry-deep px-4 py-1.5 text-white duration-100 hover:bg-neutral hover:text-pry-deep"
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
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}{" "}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CardProducts;
