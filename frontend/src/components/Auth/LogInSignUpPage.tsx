import React, { FormEvent, useEffect, useRef, useState } from "react";
import "./LogInSignUpPage.css";
import { BiSearch, BiSolidLock } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useEditable } from "@chakra-ui/react";
import { callLoginApi, callSignUpApi } from "../../redux/product/loginSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { AppDispatch, RootState } from "../../redux/store";
import { useAlert } from "react-alert";
var isFirstTime = true;
export default function LogInSignUpPage() {
  const switchBtnRef = useRef<HTMLButtonElement>(null);
  const loginFormRef = useRef<HTMLFormElement>(null);
  const signUpFormRef = useRef<HTMLFormElement>(null);

  // const focus=useIsF

  const navigate = useNavigate();

  const [isLoginSelected, setIsLoginSelected] = useState(true);

  const [loginData, setLoginData] = useState({
    log_email: "",
    log_password: "",
  });
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    publicID: "",
    pic: "",
  });

  const dispatch = useDispatch<any>();
  const { isAuthenticated, error, errorMessage, loading } = useSelector(
    (state: RootState) => state.login
  );
  const bottomAlert = useAlert();

  const switchForm = () => {
    setIsLoginSelected(!isLoginSelected);
  };
  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev: any) => {
      const updatedData = { ...prev, [`${e.target.id}`]: e.target.value };
      return updatedData;
    });
  };
  const handleOnLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      callLoginApi({
        email: loginData.log_email,
        password: loginData.log_password,
        navigate,
      })
    );
  };

  const onChangeSignUp = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "pic") {
      return;
    }
    setSignUpData((prev: any) => {
      const updatedData = { ...prev, [`${e.target.id}`]: e.target.value };
      return updatedData;
    });
  };

  const handleOnSignUpSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      callSignUpApi({
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
      })
    );
  };
  useEffect(() => {
    if (!isLoginSelected) {
      switchBtnRef.current?.classList.add("buttonSwap");
      loginFormRef.current?.classList.add("hideLoginForm");
      signUpFormRef.current?.classList.add("unHideSignUpForm");
    } else {
      switchBtnRef.current?.classList.remove("buttonSwap");
      loginFormRef.current?.classList.remove("hideLoginForm");
      signUpFormRef.current?.classList.remove("unHideSignUpForm");
    }
  }, [isLoginSelected]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (error) {
      if (!isFirstTime) {
        bottomAlert.error(errorMessage);
      }
    }
    isFirstTime = false;
  }, [error]);

  return (
    <div className="authContainer">
      {loading && (
        <div
          style={{
            position: "fixed",
            zIndex: 3,
            background: "rgba(0,0,0,0.3)",
          }}
        >
          <Loader />
        </div>
      )}

      <div className="authCard">
        <div className="authHeader">
          <div>
            <button
              onClick={() => {
                setIsLoginSelected(true);
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLoginSelected(false);
              }}
            >
              SignUp
            </button>
          </div>
          <button ref={switchBtnRef} onClick={switchForm}></button>
        </div>
        <div className="formContainer">
          <form
            className="loginForm"
            ref={loginFormRef}
            onSubmit={handleOnLoginSubmit}
            action="#"
            autoComplete="off"
          >
            <div>
              <MdEmail size={"1.5vmax"} />
              <input
                type="text"
                placeholder="Email"
                id="log_email"
                value={loginData.log_email}
                required
                onChange={onChangeLogin}
                tabIndex={isLoginSelected ? 2 : -1}
              />
            </div>
            <div>
              <BiSolidLock size={"1.5vmax"} />
              <input
                value={loginData.log_password}
                type="password"
                placeholder="Password"
                id="log_password"
                required
                onChange={onChangeLogin}
                tabIndex={isLoginSelected ? 2 : -1}
              />
            </div>
            <Link to={"/forgotPassword"}>Forgot Password</Link>
            <button type="submit" tabIndex={isLoginSelected ? 1 : -1}>
              Login
            </button>
          </form>

          <form
            className="signUpForm"
            ref={signUpFormRef}
            onSubmit={handleOnSignUpSubmit}
            action="#"
            autoComplete="off"
          >
            <div>
              <BsFillPersonFill />
              <input
                id="name"
                type="text"
                placeholder="Name"
                required
                value={signUpData.name}
                tabIndex={isLoginSelected ? -1 : 1}
                onChange={onChangeSignUp}
              />
            </div>
            <div>
              <MdEmail size={"1.5vmax"} />
              <input
                id="email"
                type="email"
                placeholder="Email"
                required
                tabIndex={isLoginSelected ? -1 : 1}
                value={signUpData.email}
                onChange={onChangeSignUp}
              />
            </div>
            <div>
              <BiSolidLock size={"1.5vmax"} />
              <input
                id="password"
                type="password"
                placeholder="Password"
                required
                tabIndex={isLoginSelected ? -1 : 1}
                value={signUpData.password}
                onChange={onChangeSignUp}
              />
            </div>
            <div>
              <BiSolidLock size={"1.5vmax"} />
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
                tabIndex={isLoginSelected ? -1 : 1}
                value={signUpData.confirmPassword}
                onChange={onChangeSignUp}
              />
            </div>
            <span>
              <img alt="Profile"></img>
              <input
                id="pic"
                type="file"
                tabIndex={isLoginSelected ? -1 : 1}
                onChange={onChangeSignUp}
              ></input>
            </span>
            <button type="submit" tabIndex={isLoginSelected ? -1 : 1}>
              SignUp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
