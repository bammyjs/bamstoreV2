import { Link, useNavigate } from "react-router-dom";
import { shortenText } from "../../utils";

const SearchProducts = ({ product, toggleShow }) => {
  return (
    <div className="  min-w-[10rem] w-full   rounded-xl flex  group bg-gray-bk  justify-between gap-4 items-center p-2">
      <div className="h-20 w-20  bg-light p-1 flex items-center justify-center text-white text-base  ">
        <Link onClick={toggleShow} to={`/product/${product._id}`}>
          <img
            src={product?.image[0]}
            className="object-contain bg-blend-exclusion aspect-square w-full h-auto "
            alt={product.name}
          />
        </Link>
      </div>
      <div className="w-full flex flex-col gap-2 items-start ">
        <h3 className="text-dark text-sm md:text-base font-bold">
          {shortenText(product?.name, 50)}
        </h3>
        <p className=" font-bold text-pry-deep">
          <span>&#8358;</span>
          {new Intl.NumberFormat("en-NG").format(product.price)}
        </p>
      </div>
    </div>
  );
};

export default SearchProducts;
