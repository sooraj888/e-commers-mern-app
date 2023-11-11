import React, { useEffect, useRef, useState } from "react";
import "./LogInSignUpPage.css";
import { BiSearch, BiSolidLock } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEditable } from "@chakra-ui/react";
export default function LogInSignUpPage() {
  const switchBtnRef = useRef<HTMLButtonElement>(null);
  const loginFormRef = useRef<HTMLFormElement>(null);
  const signUpFormRef = useRef<HTMLFormElement>(null);

  const [isLoginSelected, setIsLoginSelected] = useState(true);

  const [loginData, setLoginData] = useState<any>({ email: "", password: "" });

  const switchForm = () => {
    setIsLoginSelected(!isLoginSelected);
  };
  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev: any) => {
      let updatedData = { ...prev, [`${e.target.id}`]: e.target.value };
      return updatedData;
    });
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
  return (
    <div className="authContainer">
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
          <form className="loginForm" ref={loginFormRef}>
            <div>
              <MdEmail size={"1.5vmax"} />
              <input
                type="text"
                placeholder="Email"
                id="email"
                value={loginData.email}
                required
                onChange={onChangeLogin}
              />
            </div>
            <div>
              <BiSolidLock size={"1.5vmax"} />
              <input
                value={loginData.password}
                type="password"
                placeholder="Password"
                id="password"
                required
                onChange={onChangeLogin}
              />
            </div>
            <Link to={"/forgotPassword"}>Forgot Password</Link>
            <button type="submit">Login</button>
          </form>

          <form className="signUpForm" ref={signUpFormRef}>
            <div>
              <BsFillPersonFill />
              <input type="text" placeholder="Name" required />
            </div>
            <div>
              <MdEmail size={"1.5vmax"} />
              <input type="text" placeholder="Email" required />
            </div>
            <div>
              <BiSolidLock size={"1.5vmax"} />
              <input type="password" placeholder="Password" required />
            </div>
            <div>
              <BiSolidLock size={"1.5vmax"} />
              <input type="password" placeholder="Confirm Password" required />
            </div>
            <span>
              <img alt="Profile"></img>
              <input type="file"></input>
            </span>
            <button type="submit">SignUp</button>
          </form>
        </div>
      </div>
    </div>
  );
}
