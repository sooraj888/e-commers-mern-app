import React, { Fragment } from "react";

import Logo from "../../../assets/logo.png";
import { ReactNavbar } from "overlay-navbar";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <ReactNavbar
        logo={Logo}
        logoWidth="250px"
        logoHeight="60px"
        burgerColor="rgb(250,0, 200)"
        burgerColorHover="orangered"
        link1Color="red"
        link1Text="Home"
        link2Text="Product"
        link3Text="Contact"
        link4Text="About"
        link1Url="/"
        link2Url="products"
        link3Url="contact"
        link4Url="about"
        navColor1="white"
        nav1alignItems="center"
        nav1FlexDirection="row"
        nav1justifyContent="flex-start"
        link1Family="Roboto"
        link1Margin="50px"
        link1AnimationTime={0.05}
        searchIconColor="red"
        searchIconSize="2vmax"
        searchIconUrl="/search"
        searchIconTransition={0.05}
      />
      <div
        style={{
          width: "vmax",
          height: "2vmax",
          position: "fixed",
          right: "5vmax",
          top: "2.5vmax",
        }}
      >
        <BiSearch
          size={"2.5vmax"}
          color="gray"
          onClick={() => {
            navigate("/search");
          }}
        />
      </div>
    </header>
  );
}
