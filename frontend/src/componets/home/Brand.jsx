import React from "react";
import Marquee from "react-fast-marquee";

import apple from "../../assets/apple.svg";
import huawei from "../../assets/huawei.svg";
import nokia from "../../assets/nokia.svg";
import playstation from "../../assets/playstation.svg";
import samsung from "../../assets/samsung.svg";
import sony from "../../assets/sony.svg";
import toshiba from "../../assets/toshiba.svg";
import lenovo from "../../assets/lenovo.svg";
import windows from "../../assets/windows.svg";
import lg from "../../assets/lg.svg";
import asus from "../../assets/asus.svg";

function Brand() {
  const brandList = [
    { image: apple },
    { image: huawei },
    { image: nokia },
    { image: playstation },
    { image: samsung },
    { image: sony },
    { image: toshiba },
    { image: lenovo },
    { image: windows },
    { image: lg },
    { image: asus },
    { image: apple },
    { image: huawei },
    { image: nokia },
    { image: playstation },
    { image: samsung },
    { image: sony },
  ];
  return (
    <section className="flex w-full justify-center items-center h-auto gap-8 py-2 transition duration-200 box-shadow-2 ">
      <Marquee className="flex  w-full justify-between h-28 gap-8">
        {brandList.map((list) => (
          <img
            src={list.image}
            alt="brands"
            className=" w-20 aspect-square object-contain mr-10  mix-blend-normal "
          />
        ))}
      </Marquee>
    </section>
  );
}

export default Brand;
