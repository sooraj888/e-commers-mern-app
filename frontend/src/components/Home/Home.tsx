import React, { Fragment } from "react";
// import {CgMouse} from "react-icons/all"
import "./Home.css";
import Product from "./Product";
import Title from "../Header/Title";
export default function Home() {
  const product = {
    name: "Blue Tshirt",
    image: [
      {
        url: "https://m.media-amazon.com/images/I/51ghKp9ib4L._AC_UL480_FMwebp_QL65_.jpg",
      },
    ],
    price: "₹400",
    _id: 1,
  };
  return (
    <Fragment>
      <Title>E-Commerce</Title>
      <div className="banner">
        <p>Welcome to E-commerce</p>
        <h1>Find Amazing Product Below</h1>
        <a href="#container">
          <button>Scroll</button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Product</h2>
      <div className={"container"} id={"container"}>
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </Fragment>
  );
}
