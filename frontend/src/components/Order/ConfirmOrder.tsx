import React, { Fragment, useState } from "react";
import Styles from "./ConfirmOrder.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CheckoutStep from "../miscellaneous/CheckoutStep";
import { payloadType } from "../../redux/cart/cart";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";

export default function CheckProduct() {
  const {
    isAuthenticated,
    response: { user },
    loading,
  }: any = useSelector((state: RootState) => state.login);

  const navigation = useNavigate();
  const { cartItems, totalCartCost, shippingInfo } = useSelector(
    (state: RootState) => state.cart
  );

  const shippingCharge = totalCartCost == 0 ? 0 : totalCartCost < 500 ? 100 : 0;
  const tax =
    Number(totalCartCost + shippingCharge) > 1000
      ? (totalCartCost + shippingCharge) * 0.18
      : 0;

  const total = totalCartCost + shippingCharge + tax;
  const handleOnProcessPayment = () => {
    const data = {
      subTotal: totalCartCost,
      tax,
      shippingCharge,
      totalPrice: total,
    };
    sessionStorage.setItem("order", JSON.stringify(data));
    navigation("/order/checkoutPayment");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : isAuthenticated ? (
        <div className={Styles.container}>
          <CheckoutStep value={1} />
          <div className={Styles.block1}>
            <div className={Styles.block1_1}>
              <div className={Styles.shippingInfo}>
                <h2>Shipping Info</h2>
                <div>
                  <span>
                    <b>Name :</b> {user.name}
                  </span>
                  <span>
                    <b>Phone :</b> {shippingInfo.phoneNo}
                  </span>
                  <span>
                    <b>Address :</b> {shippingInfo.address},{shippingInfo.city},
                    {shippingInfo.state},{shippingInfo.country}
                  </span>
                </div>
              </div>
              <div className={Styles.cart}>
                <h2>Your Cart Items</h2>
                <div className={Styles.cartContainer}>
                  {cartItems.map((items: payloadType) => {
                    return (
                      <div className={Styles.cartItem} key={items.productId}>
                        <div>
                          <img src={items.img?.url} alt={items.name}></img>
                          <h2>{items.name}</h2>
                        </div>
                        <span>
                          {items.quantity} X {items.cost} =
                          {items.cost * items.quantity}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={Styles.block1_2}>
              <h2>Order Summery</h2>
              <div>
                <span>
                  <b>Subtotal : </b> <span>&#8377;{totalCartCost}</span>
                </span>
                <span>
                  <b>Shipping Charges : </b>{" "}
                  <span>&#8377;{shippingCharge}</span>
                </span>
                <span>
                  <b>GST : </b>
                  <span>&#8377;{tax}</span>
                </span>
                <span>
                  <b>Total : </b> <span>&#8377;{total}</span>
                </span>
              </div>
              <button onClick={handleOnProcessPayment}>
                Process To Payment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>Redirect to login</>
      )}
    </Fragment>
  );
}
