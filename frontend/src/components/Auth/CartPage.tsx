import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import Styles from "./CartPage.module.css";
import { useAlert } from "react-alert";
import { MdRemoveShoppingCart } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import { payloadType } from "../../redux/cart/cart";
import styled from "@emotion/styled";

export default function CartPage() {
  const {
    isAuthenticated,
    response: { user },
    loading,
    error,
    errorMessage,
    successMessage,
  }: any = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const bottomAlert = useAlert();
  const { cartItems, totalCartCost } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <div className={Styles.container}>
      {loading ? (
        <Loader />
      ) : isAuthenticated ? (
        <>
          {cartItems.length ? (
            <div className={Styles.cart}>
              <h1>Cart Products</h1>

              {cartItems.map((items: payloadType) => {
                return (
                  <div className={Styles.cartContainer}>
                    <div className={Styles.cartB_0}>
                      <img src={items.img?.url} alt={items.name}></img>
                      <div className={Styles.cartB_0_1}>
                        <h2>{items.name}</h2>
                        <h6>
                          {"Product ID : "} #{items.productId}
                        </h6>
                      </div>
                    </div>
                    <div className={Styles.cartB_1}>
                      <div className={Styles.cartB_1_1}>
                        <h2>Price</h2>
                        <h3>{items.cost}</h3>
                      </div>
                      <div className={Styles.cartB_1_2}>
                        <h2>Quantity</h2>
                        <h3>{items.quantity}</h3>
                      </div>
                      <div className={Styles.cartB_1_3}>
                        <h2>Total Price</h2>
                        <h3>{items.cost * items.quantity}</h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={Styles.cartZero}>
              <MdRemoveShoppingCart size={"15vmax"} color="orange" />
              <p>You Have Not Added Any Items To Cart </p>
              <Link
                to={".."}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                <IoIosArrowRoundBack /> {<pre> Back </pre>}
              </Link>
            </div>
          )}
        </>
      ) : (
        <>page not found</>
      )}
    </div>
  );
}
