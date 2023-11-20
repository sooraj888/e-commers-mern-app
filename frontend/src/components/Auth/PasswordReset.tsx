import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import Styles from "./ForgotPassword.module.css";
import { MdEmail } from "react-icons/md";
import { BiSolidLock } from "react-icons/bi";
import {
  clearResetPasswordMessages,
  resetPasswordApi,
} from "../../redux/user/resetPassword";

export default function PasswordReset() {
  const params = useParams();
  const dispatch = useDispatch<any>();
  const AUTH = useSelector((state: RootState) => state.login);
  const RESET_PASSWORD = useSelector((state: RootState) => state.resetPassword);
  const bottomAlert = useAlert();
  const [{ newPassword, confirmNewPassword }, setPasswords] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const navigation = useNavigate();
  const handleOnEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      resetPasswordApi({ id: String(params?.id), newPassword, navigation })
    );
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  useEffect(() => {
    if (RESET_PASSWORD.successMessage) {
      bottomAlert.success(RESET_PASSWORD.successMessage);
      dispatch(clearResetPasswordMessages());
    } else if (RESET_PASSWORD.errorMessage) {
      bottomAlert.error(RESET_PASSWORD.errorMessage);
      dispatch(clearResetPasswordMessages());
    }
  }, [RESET_PASSWORD]);
  return (
    <div className={Styles.container}>
      {AUTH.loading ||
        (RESET_PASSWORD.loading && (
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
          <h1>Reset Password</h1>
          <form
            className={Styles.forgotEmailForm}
            onSubmit={handleOnEmailSubmit}
          >
            <div>
              <BiSolidLock size={"1.5vmax"} />
              <input
                disabled={RESET_PASSWORD.loading}
                id="newPassword"
                type="password"
                placeholder="New Password"
                required
                value={newPassword}
                onChange={onChange}
              />
            </div>
            <div>
              <BiSolidLock size={"1.5vmax"} />
              <input
                disabled={RESET_PASSWORD.loading}
                id="confirmNewPassword"
                type="password"
                placeholder="Confirm New Password"
                required
                value={confirmNewPassword}
                onChange={onChange}
              />
            </div>

            <button type="submit" disabled={RESET_PASSWORD.loading}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
