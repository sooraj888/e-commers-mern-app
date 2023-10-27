import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export default function Product({ product }: { product: any }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.2)",
    activeColor: "tomato",
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 20,
    value: 2.5,
  };
  return (
    <Link className="productCard" to={product._id}>
      <img src={product?.image[0]?.url} alt={product?.name}></img>
      <p>{product?.name}</p>
      <div>
        <ReactStars {...options} />
        <span>{"(256 Reviews)"}</span>
      </div>
      <span>{product?.price}</span>
    </Link>
  );
}
