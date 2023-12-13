import React from "react";
import workspaceImage from "../../assets/workspace.svg";
import { Link } from "react-router-dom";

function Workspace() {
  return (
    <section className="w-full block items-center justify-center">
      <div className=" relative w-full block">
        <img
          src={workspaceImage}
          alt=""
          className="w-full h-auto object-cover"
        />
        <div className="absolute top-10 md:top-20 left-1/2 -translate-x-1/2 block ">
          <h2 className="text-[#afb2aa] text-center text-2xl md:text-5xl lg:text-7xl font-bold mb-2 md:md-4">
            Workspace Setup
          </h2>
          <p className="text-[#afb2aa] text-center text-base md:text-3xl font-bold  mb-2 md:md-4">
            All You Need in One Place
          </p>
          <Link
            to={"/ourStore"}
            className="text-sec-color block text-center text-sm md:text-base font-normal"
          >
            Explore More...
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Workspace;
