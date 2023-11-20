import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { callLogoutApi } from "../../redux/user/loginSlice";
import { useEditable } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Styles from "./profile.module.css";
import Loader from "../layout/Loader/Loader";

export default function Profile() {
  const {
    isAuthenticated,
    response: { user },
    loading,
  }: any = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return loading ? (
    <Loader />
  ) : isAuthenticated ? (
    <div className={Styles.container}>
      <h1>My Profile</h1>
      <div>
        <div className={Styles.leftContainer}>
          <img
            className={Styles.pic}
            src={`${user?.avatar?.url}`}
            alt="profile image"
          ></img>
          <Link to={"/editProfile"}>Edit Profile</Link>
        </div>
        <div className={Styles.details}>
          <h3>Full Name</h3>
          <h5>{user?.name}</h5>
          <h3>Email</h3>
          <h5>{user?.email}</h5>
          <h3>Joined On</h3>
          <h5>{`${user?.createdDate}`.substring(0, 10)}</h5>
          <Link to="/myOrders">My Orders</Link>
          <Link to="/updatePassword">Change Password</Link>
        </div>
      </div>
    </div>
  ) : (
    <>page not found</>
  );
}
