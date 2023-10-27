import React, { Fragment, useEffect } from "react";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import "./App.css";
import WebFont from "webfontloader";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";

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
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" Component={Home}></Route>
      </Routes>
      <Footer />
    </Fragment>
  );
}
