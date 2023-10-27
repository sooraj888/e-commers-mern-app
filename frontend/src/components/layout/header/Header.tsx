import React, { Fragment } from "react";
import { ReactNavbar } from "overlay-navbar";
import Logo from "../../../assets/logo.png";

export default function Header() {
  return (
    <header>
      <ReactNavbar
        logo={Logo}
        logoWidth="250px"
        logoHeight="60px"
        burgerColor="gray"
        burgerColorHover="orangered"
        link1Color="red"
        link1Text="Home"
        link2Text="Product"
        link3Text="Contact"
        link4Text="About"
        link1Url="/"
        link2Url="product"
        link3Url="contact"
        link4Url="about"
        navColor1="white"
        nav1alignItems="center"
        nav1FlexDirection="row"
        nav1justifyContent="flex-start"
        link1Family="Roboto"
        link1Margin="50px"
      />
    </header>
  );
}
