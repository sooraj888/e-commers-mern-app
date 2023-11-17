import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { BsFillPersonFill } from "react-icons/bs";
import {
  callSignUpApi,
  callUpdateUserApi,
} from "../../redux/product/loginSlice";
import { MdEmail } from "react-icons/md";
import { BiSolidLock } from "react-icons/bi";
import Styles from "./EditProfile.module.css";
import { useAlert } from "react-alert";
var isFirstTime = true;
export default function EditProfile() {
  const {
    isAuthenticated,
    response: { user },
    loading,
    error,
    errorMessage,
  }: any = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [
    { name, email, updatePassword, confirmUpdatePassword, pic },
    setUpdateData,
  ] = useState({
    name: "",
    email: "",
    updatePassword: "",
    confirmUpdatePassword: "",
    pic: "",
  });

  const [avatar, setAvatar] = useState<any>();

  const bottomAlert = useAlert();

  const handleOnSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", updatePassword);
    if (avatar) {
      formData.set("image", avatar);
      formData.set("public_id", user.avatar.public_id);
    }
    dispatch(
      callUpdateUserApi({
        formData,
      })
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "pic") {
      if (e.target.files && e.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e2) => {
          setAvatar(e?.target?.files?.[0]);
          setUpdateData((prev: any) => {
            const updatedData = { ...prev, pic: String(e2?.target?.result) };
            return updatedData;
          });
        };
        reader?.readAsDataURL(e?.target?.files?.[0]);
      }
      return;
    } else {
      setUpdateData((prev: any) => {
        const updatedData = { ...prev, [`${e.target.id}`]: e.target.value };
        return updatedData;
      });
    }
  };

  useEffect(() => {
    setUpdateData({
      ...user,
      name: user?.name,
      email: user?.email,
      pic: user?.avatar?.url,
    });
  }, [user]);

  useEffect(() => {
    if (error) {
      if (!isFirstTime) {
        bottomAlert.error(errorMessage);
      }
    }
    isFirstTime = false;
  }, [error]);

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
          <span>
            <img alt="Profile" src={pic}></img>
            <input
              id="pic"
              type="file"
              accept="image/*"
              onChange={onChange}
            ></input>
          </span>
          <div>
            <BsFillPersonFill />
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div>
            <MdEmail size={"1.5vmax"} />
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div>
            <BiSolidLock size={"1.5vmax"} />
            <input
              id="password"
              type="password"
              placeholder="Update Password"
              value={updatePassword}
              onChange={onChange}
            />
          </div>
          <div>
            <BiSolidLock size={"1.5vmax"} />
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Update Password"
              value={confirmUpdatePassword}
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
