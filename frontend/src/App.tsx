import React, { Fragment, useEffect } from "react";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import "./App.css";
import WebFont from "webfontloader";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import { Provider } from "react-redux";
import store from "./redux/store";
import DetailsPage from "./components/Product/ProductDetailsPage";
import Products from "./components/Product/ProductPage";
export default function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Open Sans"],
      },
      active: function () {
        console.log("Fonts are active!");
      },
      inactive: function () {
        console.log("Fonts are inactive!");
      },
    });
  }, []);
  return (
    <Provider store={store}>
      <Fragment>
        <Header />
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/products" Component={Products}></Route>
          <Route path="/product/:id" Component={DetailsPage}></Route>
          <Route path="*" Component={() => <>Not found</>}></Route>
        </Routes>
        <Footer />
      </Fragment>
    </Provider>
  );
}
