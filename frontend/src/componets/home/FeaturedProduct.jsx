import React, { Fragment } from "react";

import accessories from "../../assets/earphones_1366689.png";
import game from "../../assets/5570568.png";
import phone from "../../assets/iphone_644458.png";
import laptop from "../../assets/laptop_5512018.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// "https://i.ibb.co/5GVkd3m/c1.jpg"
const categories = [
  {
    id: 1,
    title: "Phones",
    image: phone,
    link: "/phones",
  },
  {
    id: 2,
    title: "Laptops",
    image: laptop,
    link: "/laptops",
  },
  {
    id: 3,
    title: "Gaming",
    image: game,
    link: "/gaming",
  },
  {
    id: 4,
    title: "Accessory",
    image: accessories,
    link: "/workspace",
  },
];

const Category = ({ title, image, link }) => {
  return (
    <div className="rounded-full  p-1 place-self-center bg-light w-[120px] h-[120px] md:w-[190px] md:h-[190px] relative">
      <Link to={link}>
        <img
          src={image}
          loading="lazy"
          alt=""
          className="w-full aspect-[2/2] h-auto object-contain scale-50 hover:scale-110 transition-all duration-400  "
        />
        <span className="absolute cursor-pointer -bottom-5 w-full flex justify-center rounded-full bg-light p-1 md:p-3 font-bold text-base mb-3 text-dark transition duration-200 box-shadow-2">
          {title}
        </span>
      </Link>
    </div>
  );
};

function FeaturedProduct() {
  const navigate = useNavigate();
  return (
    <section className="w-full rounded-3xl flex flex-col justify-center place-item-center items-center py-10 ">
      <h2 className="  text-dark text-left font-bold text-2xl md:text-5xl">
        Browse by Category
      </h2>
      <div className="container mt-4 p-6 w-full gap-y-8 grid justify-center  items-center grid-cols-2 md:grid-cols-4  md:gap-y-8 max-w-7xl   ">
        {categories.map((cat) => {
          return (
            <Fragment key={cat.id}>
              <Category title={cat.title} image={cat.image} link={cat.link} />
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}

export default FeaturedProduct;
