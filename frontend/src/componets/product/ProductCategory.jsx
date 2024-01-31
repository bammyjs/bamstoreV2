import React from "react";
import { useNavigate } from "react-router-dom";

// https://i.ibb.co/fNkBYgr/c3.jpg
// https://i.ibb.co/5GVkd3m/c1.jpg
// https://i.ibb.co/nQKLjrW/c2.jpg

const categories = [
  {
    id: 1,
    title: "Phones",
    image: "https://i.ibb.co/5GVkd3m/c1.jpg",
  },
  {
    id: 2,
    title: "Laptops",
    image: "https://i.ibb.co/nQKLjrW/c2.jpg",
  },
  {
    id: 3,
    title: "Gaming",
    image: "https://i.ibb.co/fNkBYgr/c3.jpg",
  },
  {
    id: 4,
    title: "WorkSpace",
    image: "https://i.ibb.co/fNkBYgr/c3.jpg",
  },
];

const Category = ({ title, image }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <h3>{title}</h3>
      <img src={image} alt="img" />
      <button className="btn btn-pry" onClick={() => navigate("/products")}>
        {"Shop Now"}
      </button>
    </div>
  );
};

const ProductCategory = () => {
  return (
    <div className="flex">
      {categories.map((cat) => {
        return (
          <div key={cat.id}>
            <Category title={cat.title} image={cat.image} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductCategory;
