import React from "react";

const ClaimImage = ({ images }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-0 sm:p-5 border">
      {images?.map((image, index) => {
        return (
          <img
            src={image.src}
            alt=""
            key={index}
            className="h-[300px] w-full object-cover border border-violet-600"
          />
        );
      })}
    </div>
  );
};

export default ClaimImage;
