import React, { Suspense } from "react";
import workspaceImage from "../../assets/workspace.svg";
import { Link } from "react-router-dom";
const LazyLoadImage = React.lazy(() => import("../extras/LazyLoadImage"));

function Workspace() {
  return (
    <section className=" w-full block items-center justify-center">
      <div className="hidden md:block relative w-full ">
        <Suspense fallback={<div className="spinner">Loading...</div>}>
          <LazyLoadImage
            src={workspaceImage}
            alt="gaming"
            className="w-full h-auto object-cover"
          />
        </Suspense>
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
        <Suspense fallback={<div className="spinner">Loading...</div>}>
          <LazyLoadImage
            src={workspaceImage}
            alt="gaming"
            className="rounded-t-2xl w-full aspect-video h-auto object-cover"
          />
        </Suspense>

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
