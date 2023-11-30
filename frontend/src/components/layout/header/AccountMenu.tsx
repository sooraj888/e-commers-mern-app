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
import { AppDispatch, RootState } from "../../../redux/store";
import { MdAddCircleOutline } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { clearCart } from "../../../redux/cart/cart";

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
  const onClickCart = () => {
    navigate("/myCart");
  };
  const onClickLogout = () => {
    dispatch(clearCart());
    dispatch(callLogoutApi({ navigate }));
  };
  // const cartCount=useSelector((state)=>{return state})
  const { cartItems } = useSelector((state: RootState) => state.cart);
  return (
    <Menu>
      <MenuButton>{children}</MenuButton>

      <MenuList>
        <MenuItem onClick={onClickProfile} icon={<FaPerson />}>
          Profile
        </MenuItem>
        <MenuItem onClick={onClickCart} icon={<FaShoppingCart />}>
          <pre>Cart {`      ${cartItems.length}`}</pre>
        </MenuItem>
        <MenuItem onClick={onClickLogout} icon={<CiLogout />}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
