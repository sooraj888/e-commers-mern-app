import React, { Fragment, useEffect, useState } from "react";
import Styles from "./CheckoutPayment.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CheckoutStep from "../miscellaneous/CheckoutStep";
import axios from "axios";
import {
  Elements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Title from "../layout/header/Title";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51OJBEeSAeDrCcC40rQNefN0luVXhv34jev1nxHiLBHSZ60BFvEjRofrrLtrUi5zT9dmGl8Ax5RK72h6G6VvICv9s00nMmqgmtB"
);

export default function CheckoutPayment() {
  const { isAuthenticated, loading } = useSelector((state: RootState) => {
    return state.login;
  });
  const [stripApiKey, setStripApiKey] = useState("");

  const getStripApiKey = async () => {
    const { data }: any = await axios.get("/api/v1/payment/apiKey");
    if (data?.success == true) {
      setStripApiKey(data?.stripApiKey);
    }
  };
  const order = JSON.parse(sessionStorage.getItem("order") || "{}");
  const amount = Number(order.totalPrice || 0);
  useEffect(() => {
    getStripApiKey();
  }, []);

  return (
    <Fragment>
      <Title>Payment</Title>

      {isAuthenticated ? (
        <div className={Styles.container}>
          <CheckoutStep value={2} />
          <div className={Styles.paymentForm}>
            {amount > 0 && (
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: amount * 100,
                  currency: "inr",
                  // Fully customizable with appearance API.
                  appearance: {
                    /*...*/
                  },
                }}
              >
                <CheckoutForm amount={amount} />
              </Elements>
            )}
          </div>
        </div>
      ) : (
        <>Redirect to login</>
      )}
    </Fragment>
  );
}
