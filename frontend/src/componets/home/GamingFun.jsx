import React from "react";
import funImage from "../../assets/fun.svg";
import { Link } from "react-router-dom";

function GamingFun() {
  return (
    <section className="w-full block items-center justify-center">
      <div className=" relative w-full block">
        <img src={funImage} alt="" className="w-full h-auto object-cover" />
        <span className=""></span>
        <div className="absolute top-10 md:top-20 left-1/2 -translate-x-1/2 block ">
          <h2 className="text-light text-center  text-lg md:text-4xl lg:text-6xl font-bold mb-2 ">
            Get More Fun With Us
          </h2>
          <p className="text-green-50 text-center text-sm md:text-2xl font-bold  mb-2 md:md-4">
            One of a Kind Gaming Experience
          </p>
          <Link
            to={"/gaming"}
            className="text-sec-color block text-center text-sm md:text-base font-normal"
          >
            Explore More...
          </Link>
        </div>
      </div>
    </section>
  );
}

export default GamingFun;
