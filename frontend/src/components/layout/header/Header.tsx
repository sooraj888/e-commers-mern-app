import React, { Fragment, useState, useEffect } from "react";

import Logo from "../../../assets/logo.png";
import { ReactNavbar } from "overlay-navbar";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import Title from "./Title";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import Loader from "../Loader/Loader";
import SmLoader from "../Loader/SmLoader";
import AccountMenu from "./AccountMenu";

export default function Header() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const { isAuthenticated, loading, response }: any = useSelector(
    (state: RootState) => state.login
  );

  const handleBackButton = (event: any) => {
    setShowSearch(false);
  };

  // Use useEffect to add and remove the event listener
  useEffect(() => {
    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  return (
    <header
      style={{
        zIndex: 2,
        // background: "red",
        // height: "10vmax",
        // position: "fixed",
        // top: 0,
        // left: 0,
        // width: "100%",
      }}
    >
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
          position: "fixed",
          right: "5vmax",
          top: "2.5vmax",
          zIndex: 2,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <button
          style={{
            padding: 10,
            zIndex: 2,
            margin: "0px 1vmax",
          }}
          onClick={() => {
            setShowSearch(true);
          }}
        >
          <BiSearch size={"2vmax"} color="gray" />
        </button>
        <button
          style={{
            padding: 5,
            fontSize: "1.5vmax",
          }}
          onClick={() => {
            {
              !loading && !isAuthenticated && navigate("/login");
            }
          }}
        >
          {loading ? (
            <SmLoader />
          ) : !isAuthenticated ? (
            "Login"
          ) : (
            <AccountMenu>
              <Avatar
                name={String(response?.user?.name)}
                src={String(response?.user?.avatar?.url)}
              />
            </AccountMenu>
          )}
        </button>
      </div>

      {showSearch && (
        <div
          style={{
            position: "fixed",
            backgroundColor: "white",
            zIndex: 10000000,
          }}
        >
          <Title>Search</Title>
          <Search setShowSearch={setShowSearch} />
        </div>
      )}
    </header>
  );
}
