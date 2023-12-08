import React, { Fragment, useEffect } from "react";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import "./App.css";
import WebFont from "webfontloader";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home/Home";
import { Provider } from "react-redux";
import store, { AppDispatch, RootState } from "./redux/store";
import DetailsPage from "./components/Product/ProductDetailsPage";
import Products from "./components/Product/ProductPage";
import Search from "./components/layout/header/Search";
import { ChakraProvider } from "@chakra-ui/react";
import LogInSignUpPage from "./components/Auth/LogInSignUpPage";
import { useDispatch } from "react-redux";
import { callLoginWithToken } from "./redux/user/loginSlice";
import { useSelector } from "react-redux";
import Profile from "./components/Auth/Profile";
import EditProfile from "./components/Auth/EditProfile";
import UpdatePassword from "./components/Auth/UpdatePassword";
import ForgotPassword from "./components/Auth/ForgotPassword";
import PasswordReset from "./components/Auth/PasswordReset";
import CartPage from "./components/Order/CartPage";
import ShippingPage from "./components/Order/ShippingPage";
import CheckProduct from "./components/Order/ConfirmOrder";
import CheckoutPayment from "./components/Order/CheckoutPayment";
import PaymentSuccess from "./components/Order/PaymentSuccess";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.login);
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
  useEffect(() => {
    dispatch(callLoginWithToken({ navigate }));
  }, []);

  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/products" Component={Products}></Route>
        <Route path="/product/:id" Component={DetailsPage}></Route>

        {/*Only UnAuthenticated Routes */}
        <Route path="/login" Component={LogInSignUpPage} />
        <Route path="/forgotPassword" Component={ForgotPassword} />
        <Route path="/passwordReset/:id" Component={PasswordReset} />
        <Route path="/shipping" Component={ShippingPage} />
        <Route path="/order/confirm" Component={CheckProduct} />
        <Route path="/order/checkoutPayment" Component={CheckoutPayment} />
        <Route path="/payment/success" Component={PaymentSuccess} />

        {/*UnAuthenticated Routes */}
        <Route path="/profile" Component={Profile} />
        <Route path="/editProfile" Component={EditProfile} />
        <Route path="/updatePassword" Component={UpdatePassword} />
        <Route path="/myCart" Component={CartPage} />

        <Route path="*" Component={() => <>Page Not found</>}></Route>
      </Routes>
      <Footer />
    </Fragment>
  );
}
