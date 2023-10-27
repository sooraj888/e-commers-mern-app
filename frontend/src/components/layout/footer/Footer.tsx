import React from "react";
import PLAYSTORE_LOGO from "../../../assets/playstore.jpeg";
import APPSTORE_LOGO from "../../../assets/appstorejpeg.jpeg";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Down app for android </p>
        <img src={PLAYSTORE_LOGO} alt="playstore" />
        <img src={APPSTORE_LOGO} alt="appstore" />
      </div>
      <div className="centerFooter">
        <h1>E-COMMERCE</h1>
        <p>High quality is our first priority</p>
        <p>Copyright 2023 &copy; Sooraj K </p>
      </div>
      <div className="rightFooter">
        <h4>Follow Me</h4>
        <a href="https://www.google.com/">Instagram</a>
        <a href="https://www.google.com/">Youtube</a>
        <a href="https://www.google.com/">Github</a>
      </div>
    </footer>
  );
}
