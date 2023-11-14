import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { callLogoutApi } from "../../redux/product/loginSlice";
import { useEditable } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { isAuthenticated, response } = useSelector(
    (state: RootState) => state.login
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return isAuthenticated ? (
    <>
      {JSON.stringify(response)}

      <button
        onClick={() => {
          dispatch(callLogoutApi({ navigate }));
        }}
      >
        Logout
      </button>
    </>
  ) : (
    <>page not found</>
  );
}
