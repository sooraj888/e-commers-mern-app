import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Image,
  Button,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { callLogoutApi } from "../../../redux/user/loginSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../redux/store";
import { MdAddCircleOutline } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";

export default function AccountMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const onClickProfile = () => {
    navigate("/profile");
  };
  const onClickLogout = () => {
    dispatch(callLogoutApi({ navigate }));
  };
  return (
    <Menu>
      <MenuButton>{children}</MenuButton>

      <MenuList>
        <MenuItem onClick={onClickProfile} icon={<FaPerson />}>
          Profile
        </MenuItem>
        <MenuItem onClick={onClickLogout} icon={<CiLogout />}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
