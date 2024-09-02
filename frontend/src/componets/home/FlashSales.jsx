import pad from "../../assets/controller.svg";
import iphone from "../../assets/14pro.svg";
import { useNavigate } from "react-router";
import React, { Suspense } from "react";

const LazyLoadImage = React.lazy(() => import("../extras/LazyLoadImage"));

const FlashSales = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-light w-full h-auto flex flex-col lg:flex-row gap-4 p-6 justify-center items-center">
      <div className="w-full container max-w-7xl h-auto flex flex-col lg:flex-row gap-4 p-6 justify-center items-center">
        <div className="relative container max-w-xl md:max-w-[615px] w-full rounded-3xl">
          <div className="absolute left-14 top-1/2 -translate-y-1/2 flex flex-col text-amber-400 z-10 gap-6 items-start justify-center w-full py-4 max-w-xs">
            <p className="md:text-2xl text-xl">Gaming</p>
            <h2 className="md:text-3xl lg:text-4xl text-2xl w-full text-700">
              Ps5 Edge <br /> Controller
            </h2>
            <p className="text-xs md:text-xs lg:text-base w-3/4">
              Lorem ipsum dolorem architecto aliquam quia praesentium incidunt
              sit enim, error aperiam,
            </p>
            <button
              onClick={() => navigate("/ourStore")}
              className="rounded-full bg-light px-5 py-3 text-base mb-3 font-medium text-pry-color transition duration-200 hover:bg-gray active:bg-gray-bk"
            >
              Shop Now
            </button>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <LazyLoadImage src={pad} alt="PS5 Controller" />
          </Suspense>
        </div>
        <div className="relative container max-w-xl md:max-w-[615px] w-full rounded-3xl">
          <div className="absolute left-14 top-1/2 -translate-y-1/2 flex flex-col text-amber-400 z-10 gap-6 items-start justify-center w-full py-4 max-w-xs">
            <p className="md:text-2xl text-xl">Gaming</p>
            <h2 className="md:text-3xl lg:text-4xl text-2xl w-full text-700">
              Ps5 Edge <br /> Controller
            </h2>
            <p className="text-xs md:text-xs lg:text-base w-3/4">
              Lorem ipsum dolorem architecto aliquam quia praesentium incidunt
              sit enim, error aperiam,
            </p>
            <button
              onClick={() => navigate("/ourStore")}
              className="rounded-full bg-light px-5 py-3 text-base mb-3 font-medium text-pry-color transition duration-200 hover:bg-gray active:bg-gray-bk"
            >
              Shop Now
            </button>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <LazyLoadImage src={pad} alt="PS5 Controller" />
          </Suspense>
        </div>
        {/* <div className="relative container max-w-xl md:max-w-[615px] w-full rounded-3xl">
          <div className=" left-14 top-1/2 -translate-y-1/2 flex flex-col text-light gap-6 items-start justify-center w-full py-4 max-w-xs">
            <p className="md:text-2xl text-xl">Apple</p>
            <h2 className="md:text-3xl lg:text-4xl text-2xl w-full text-700">
              iPhone <br /> 14 Pro Max
            </h2>
            <p className="text-xs md:text-xs lg:text-base w-3/4">
              Lorem ipsum dolor sit amet architecto aliquam quia praesentium
              incidunt sit enim,
            </p>
            <button
              onClick={() => navigate("/ourStore")}
              className="rounded-full bg-blue-500 px-5 py-3 text-base mb-3 font-medium text-white transition duration-200 hover:bg-blue-600 active:bg-blue-700"
            >
              Shop Now
            </button>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <LazyLoadImage src={iphone} alt="iPhone 14 Pro Max" />
          </Suspense>
        </div> */}
      </div>
    </section>
  );
};

export default FlashSales;
