import React from "react";
import workspaceImage from "../../assets/workspace.svg";
import { Link } from "react-router-dom";

function Workspace() {
  return (
    <section className=" w-full block items-center justify-center">
      <div className="hidden md:block relative w-full ">
        <img
          src={workspaceImage}
          alt=""
          className="w-full h-auto object-cover"
        />
        <div className="absolute flex flex-col items-center gap-3 top-10 md:top-20 left-1/2 -translate-x-1/2  ">
          <h2 className="text-gray-900 text-center text-2xl md:text-5xl lg:text-7xl font-bold mb-2 md:md-4">
            Workspace Setup
          </h2>
          <p className="text-dark text-center text-base md:text-3xl font-bold  mb-2 md:md-4">
            The secret to a tidy desk? Don't get rid of anything, just put it in
            really really nice looking containers.
          </p>
          <Link to={"/workSpace"} className="btn btn-primary w-1/2">
            Explore More...
          </Link>
        </div>
      </div>
      <div className="p-4  md:hidden relative w-full ">
        <img
          src={workspaceImage}
          alt=""
          className="rounded-t-2xl w-full aspect-video h-auto object-cover"
        />
        <div className="rounded-b-2xl flex flex-col items-center gap-2 bg-white p-6">
          <h2 className="text-gray-900 text-center text-xl md:text-5xl lg:text-7xl font-bold mb-2 md:md-4">
            Workspace Setup
          </h2>
          <p className="text-dark text-center text-base md:text-3xl font-normal  mb-2 md:md-4">
            The secret to a tidy desk? Don't get rid of anything, just put it in
            really really nice looking containers.
          </p>
          <Link to={"/workSpace"} className="btn btn-primary w-full">
            Explore More...
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Workspace;
