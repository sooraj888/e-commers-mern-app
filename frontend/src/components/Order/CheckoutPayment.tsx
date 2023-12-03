import React, { Fragment, useState } from "react";
import Styles from "./ShippingPage.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CheckoutStep from "../miscellaneous/CheckoutStep";

export default function CheckoutPayment() {
  const { isAuthenticated, loading } = useSelector((state: RootState) => {
    return state.login;
  });

  return (
    <Fragment>
      {isAuthenticated ? (
        <div className={Styles.container}>
          <CheckoutStep value={2} />
        </div>
      ) : (
        <>Redirect to login</>
      )}
    </Fragment>
  );
}
