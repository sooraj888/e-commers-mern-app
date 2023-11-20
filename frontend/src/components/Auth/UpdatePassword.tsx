import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { BsFillPersonFill } from "react-icons/bs";
import {
  UpdateUserPasswordApi,
  callSignUpApi,
  callUpdateUserApi,
  clearSuccessMessage,
} from "../../redux/user/loginSlice";
import { MdEmail } from "react-icons/md";
import { BiSolidLock } from "react-icons/bi";
import Styles from "./UpdatePassword.module.css";
import { useAlert } from "react-alert";
import { Avatar, Image } from "@chakra-ui/react";
import { FaLock } from "react-icons/fa6";

var isFirstTime = true;
export default function UpdatePassword() {
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
  const [{ oldPassword, newPassword, confirmNewPassword }, setUpdateData] =
    useState({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });

  const bottomAlert = useAlert();

  const handleOnSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      UpdateUserPasswordApi({
        newPassword,
        oldPassword,
      })
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateData((prev: any) => {
      const updatedData = { ...prev, [`${e.target.id}`]: e.target.value };
      return updatedData;
    });
  };

  useEffect(() => {
    if (error) {
      if (!isFirstTime) {
        bottomAlert.error(errorMessage);
      }
    }
    isFirstTime = false;
  }, [error]);

  useEffect(() => {
    if (successMessage) {
      bottomAlert.success(successMessage);
    }
  }, [successMessage]);

  useEffect(() => {
    return () => {
      dispatch(clearSuccessMessage());
    };
  }, []);

  return (
    <div className={Styles.container}>
      {loading ? (
        <Loader />
      ) : isAuthenticated ? (
        <form
          className={Styles.updateForm}
          onSubmit={handleOnSignUpSubmit}
          action="#"
          autoComplete="off"
          encType="multipart/form-data"
        >
          <div>
            <FaLock />
            <input
              required
              id="oldPassword"
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={onChange}
            />
          </div>
          <div>
            <FaLock />
            <input
              required
              id="newPassword"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={onChange}
            />
          </div>
          <div>
            <FaLock />
            <input
              required
              id="confirmNewPassword"
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={onChange}
            />
          </div>

          <button type="submit">Update</button>
        </form>
      ) : (
        <>page not found</>
      )}
    </div>
  );
}
