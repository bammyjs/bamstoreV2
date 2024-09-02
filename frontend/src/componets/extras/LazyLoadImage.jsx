import React, { useState } from "react";

const LazyLoadImage = ({ src, alt, className, loaderClassName = "loader" }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative object-contain w-full  h-auto rounded-3xl">
      {!imageLoaded && (
        <div
          className={`absolute inset-0 flex justify-center items-center ${loaderClassName}`}
        >
          {/* You can use any loader/spinner here */}
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-500"
            role="status"
          ></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        className={`${className} ${imageLoaded ? "block" : "hidden"}`}
      />
    </div>
  );
};

export default LazyLoadImage;
