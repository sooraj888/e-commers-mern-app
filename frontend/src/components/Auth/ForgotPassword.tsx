import React, {
  FormEventHandler,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import Loader from "../layout/Loader/Loader";
import { MdEmail } from "react-icons/md";
import Styles from "./ForgotPassword.module.css";
import {
  clearForgetPasswordMessages,
  forgetPasswordApi,
} from "../../redux/user/forgetPassword";
import { useNavigate } from "react-router-dom";
import { useEditable } from "@chakra-ui/react";

export default function ForgotPassword() {
  const dispatch = useDispatch<any>();
  const AUTH = useSelector((state: RootState) => state.login);
  const FORGOT_PASSWORD = useSelector(
    (state: RootState) => state.forgetPassword
  );
  const bottomAlert = useAlert();
  const [email, setEmail] = useState("");
  const navigation = useNavigate();
  const handleOnEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(forgetPasswordApi({ email, navigation }));
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (FORGOT_PASSWORD.successMessage) {
      bottomAlert.success(FORGOT_PASSWORD.successMessage);
      dispatch(clearForgetPasswordMessages());
    } else if (FORGOT_PASSWORD.errorMessage) {
      bottomAlert.error(FORGOT_PASSWORD.errorMessage);
      dispatch(clearForgetPasswordMessages());
    }
  }, [FORGOT_PASSWORD]);
  return (
    <div className={Styles.container}>
      {AUTH.loading ||
        (FORGOT_PASSWORD.loading && (
          <div
            style={{
              position: "fixed",
              zIndex: 3,
              background: "rgba(0,0,0,0.3)",
            }}
          >
            <Loader />
          </div>
        ))}
      {AUTH.isAuthenticated ? (
        <>page not found</>
      ) : (
        <div className={Styles.card}>
          <h1>Forgot Password</h1>
          <form
            className={Styles.forgotEmailForm}
            onSubmit={handleOnEmailSubmit}
          >
            <div>
              <MdEmail size={"1.5vmax"} />
              <input
                type="text"
                placeholder="Enter Your Email ID "
                id="log_email"
                value={email}
                required
                onChange={onChangeEmail}
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
