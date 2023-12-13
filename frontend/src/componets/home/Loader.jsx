import React from "react";
import ReactDOM from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="w-full h-screen fixed z-[10000] bg-slate-500 trans flex justify-center items-center ">
      <div className="container relative w-full   ">
        <span className="loader absolute left-1/2 -translate-x-1/2 m-auto"></span>
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
