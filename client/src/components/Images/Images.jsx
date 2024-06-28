import React, { useState } from "react";
import "./images.css";

const Images = ({ imgs }) => {
  console.log("🚀 ~ Images ~ imgs:", imgs);
  const [mainImage, setMainImage] = useState(imgs[0]);
  console.log(mainImage);

  return (
    <>
      <div className="side_images">
        {imgs.map((imgs, index) => {
          return (
            <figure key={index}>
            <img src={imgs.url} alt="" onClick={() => setMainImage(imgs)} />
          </figure>
          );
        })}
      </div>
      <div className="min_screen">
        <img src={mainImage.url} alt="" />
      </div>
    </>
  );
};

export default Images;
