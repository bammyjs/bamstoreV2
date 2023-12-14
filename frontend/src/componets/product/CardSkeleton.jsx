import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((items) => (
      <div className="w-full rounded-xl  items-baseline bg- p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
        <div className="relative w-full  bg-neutral flex items-end overflow-hidden rounded-xl">
          <Skeleton className=" h-44 " />
        </div>

        <div className="mt-1 p-2">
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-4/5 h-3" />

          <div className="mt-3 flex items-end justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-6 w-14" />
          </div>
        </div>
      </div>
    ));
};

export default CardSkeleton;
