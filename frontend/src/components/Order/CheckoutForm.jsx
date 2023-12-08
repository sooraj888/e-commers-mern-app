import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect } from "react";
import { clearCart } from "../../redux/cart/cart";
import { useDispatch } from "react-redux";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    // elements.submit();
    const {
      data: { clientSecret },
    } = await axios.post("/api/v1/payment/process", {
      amount: Number(amount) * 100,
    });

    if (!clientSecret) {
      return;
    }

    const result = await stripe.confirmPayment({
      clientSecret,
      //`Elements` instance that was used to create the Payment Element
      elements,

      confirmParams: {
        return_url: `http://localhost:3000/payment/success`,
      },
    });
    localStorage.removeItem("cartItems");
    localStorage.removeItem("totalCartCost");
    sessionStorage.removeItem("order");
    dispatch(clearCart());

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  useEffect(() => {
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    elements?.submit();
  }, [elements]);

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Pay Total &#8377; {amount}</button>
    </form>
  );
};

export default CheckoutForm;
