import React, { Fragment, useEffect } from "react";
// import {CgMouse} from "react-icons/all"
import "./Home.css";
import Title from "../layout/header/Title";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigation } from "react-router-dom";
import { getAllProducts } from "../../redux/product/productSlice";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard";

export default function Home() {
  const { products, productCount, loading, error, errorMessage } = useSelector(
    (state: any) => state.products
  );
  const dispatch = useDispatch<any>();
  const bottomAlert = useAlert();

  useEffect((): any => {
    if (error) {
      return bottomAlert.error(errorMessage);
    }
    dispatch(getAllProducts({}));
  }, [dispatch, error, bottomAlert]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Title>E-Commerce</Title>
          <div className="banner">
            <p>Welcome to E-commerce</p>
            <h1>Find Amazing Product Below </h1>
            <a href="#container">
              <button>Scroll</button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Product</h2>
          <div className={"container"} id={"container"}>
            {products?.map((item: any) => {
              return <ProductCard product={item} key={item._id} />;
            })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
