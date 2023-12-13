import React from "react";
import pad from "../../assets/controller.svg";
// import iphone from "../assets/iphone.svg"
import accessories from "../../assets/accessories.svg";
import game from "../../assets/game.svg";
import phone from "../../assets/14pro.svg";
import { useNavigate } from "react-router-dom";

function FeaturedProduct() {
  const navigate = useNavigate();
  return (
    <>
      <section className="w-full bg-black rounded-3xl flex flex-col justify-center place-item-center items-center py-10 ">
        <div className="container  p-6 w-full gap-y-8 grid justify-center  items-center grid-cols-2 md:grid-cols-3    md:gap-y-8 max-w-7xl   ">
          <div className="rounded-full  place-self-center bg-dark w-[120px] h-[120px] md:w-[190px] md:h-[190px] relative">
            <img
              src={accessories}
              alt=""
              className=" w-full h-auto md:w-[190px] md:h-auto object-contain block mt-5 "
            />
            <span className="absolute -bottom-5 w-full flex justify-center rounded-full bg-light p-1 md:p-3 font-bold text-base mb-3 text-dark transition duration-200 box-shadow-2">
              PHONES
            </span>
          </div>
          <div className="rounded-full place-self-center  bg-dark w-[120px] h-[120px] md:w-[190px] md:h-[190px] relative">
            <img
              src={game}
              alt=""
              className=" w-full h-auto md:w-[190px] md:h-auto object-contain block mt-5 "
            />
            <span className="absolute -bottom-5 w-full flex justify-center rounded-full bg-light p-1 md:p-3 font-bold text-base mb-3 text-dark transition duration-200 box-shadow-2">
              PHONES
            </span>
          </div>
          <div className="rounded-full place-self-center  bg-dark w-[120px] h-[120px] md:w-[190px] md:h-[190px] relative">
            <img
              src={accessories}
              alt=""
              className=" w-full h-auto md:w-[190px] md:h-auto object-contain block mt-5 "
            />
            <span className="absolute -bottom-5 w-full flex justify-center rounded-full bg-light p-1 md:p-3 font-bold text-base mb-3 text-dark transition duration-200 box-shadow-2">
              PHONES
            </span>
          </div>
          <div className="rounded-full place-self-center  bg-dark w-[120px] h-[120px] md:w-[190px] md:h-[190px] relative">
            <img
              src={accessories}
              alt=""
              className=" w-full h-auto md:w-[190px] md:h-auto object-contain block mt-5 "
            />
            <span className="absolute -bottom-5 w-full flex justify-center rounded-full bg-light p-1 md:p-3 font-bold text-base mb-3 text-dark transition duration-200 box-shadow-2">
              PHONES
            </span>
          </div>
          <div className="rounded-full place-self-center  bg-dark w-[120px] h-[120px] md:w-[190px] md:h-[190px] relative">
            <img
              src={accessories}
              alt=""
              className=" w-full h-auto md:w-[190px] md:h-auto object-contain block mt-5 "
            />
            <span className="absolute -bottom-5 w-full flex justify-center rounded-full bg-light p-1 md:p-3 font-bold text-base mb-3 text-dark transition duration-200 box-shadow-2">
              PHONES
            </span>
          </div>
          <div className="rounded-full place-self-center  bg-dark w-[120px] h-[120px] md:w-[190px] md:h-[190px] relative">
            <img
              src={accessories}
              alt=""
              className=" w-full h-auto md:w-[190px] md:h-auto object-contain block mt-5 "
            />
            <span className="absolute -bottom-5 w-full flex justify-center rounded-full bg-light p-1 md:p-3 font-bold text-base mb-3 text-dark transition duration-200 box-shadow-2">
              PHONES
            </span>
          </div>
        </div>
      </section>
      <section className=" bg-light w-full  h-auto flex flex-col lg:flex-row gap-4 p-6 justify-center items-center">
        <div className="w-full container max-w-7xl h-auto flex flex-col lg:flex-row gap-4 p-6 justify-center items-center ">
          <div className="relative container max-w-xl md:max-w-[615px]   w-full rounded-3xl">
            <div className="absolute left-14 top-1/2 -translate-y-1/2 flex flex-col text-light gap-6 items-start justify-center w-full py-4  max-w-xs ">
              <p className="md:text-2xl text-xl ">Gaming</p>
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
                shop now
              </button>
            </div>
            <img
              src={pad}
              alt=""
              className="object-contain w-full h-auto  rounded-3xl"
            />
          </div>
          <div className="relative container max-w-xl md:max-w-[615px]   w-full  rounded-3xl">
            <div className="absolute left-14 top-1/2 -translate-y-1/2 flex flex-col text-light gap-6 items-start justify-center w-full py-4  max-w-xs ">
              <p className="md:text-2xl text-xl ">Apple</p>
              <h2 className="md:text-3xl lg:text-4xl text-2xl w-full text-700">
                iphone <br /> 14 ProMAx
              </h2>
              <p className="text-xs md:text-xs lg:text-base w-3/4">
                Lorem ipsum dolor sit amet ctio dol architecto aliquam quia
                praesentium incidunt sit enim,{" "}
              </p>
              <button
                onClick={() => navigate("/ourStore")}
                className="rounded-full bg-blue-500 px-5 py-3 text-base mb-3 font-medium text-white transition duration-200 hover:bg-blue-600 active:bg-blue-700"
              >
                shop now
              </button>
            </div>
            <img
              src={phone}
              alt=""
              className="object-contain w-full h-auto max-w-[]  rounded-3xl"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default FeaturedProduct;
