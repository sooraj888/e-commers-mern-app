import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export default function Product({ product }: { product: any }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.2)",
    activeColor: "tomato",
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 20,
  };

  return (
    <Link className="productCard" to={`/product/${product?._id}`}>
      <img
        src={
          String(product?.image[0]?.url).startsWith("http")
            ? product?.image[0]?.url
            : ""
        }
        alt={product?.name}
      ></img>
      <p>{product?.name}</p>
      <div className="rating">
        <ReactStars {...options} value={product?.ratings} />
        <span>{`(${product?.numOfReviews || 0} Reviews)`}</span>
      </div>
      <span> &#8377;{`${Number(product?.price) || "----"}`}</span>
    </Link>
  );
}
