import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { CancelTokenSource } from "axios";
import { CancelToken } from "axios";
import { type } from "os";
import { AlertContainer } from "react-alert";
var source = axios.CancelToken.source();
export type payloadType = {
  productId: string;
  img: any;
  stock: number;
  name: string;
  quantity: number;
  cost: number;
};

export type addRemoveCartType = {
  productId: string;
  bottomAlert?: AlertContainer;
};
export type ShippingInfoType = {
  shippingInfo: {
    country: string;
    state: string;
    address: string;
    city: string;
    phoneNo: string;
    pinCode: string;
  };
};
const initialShippingType: ShippingInfoType["shippingInfo"] = {
  country: "",
  state: "",
  city: "",
  address: "",
  phoneNo: "",
  pinCode: "",
};

const initialShippingTypeLocalStore: ShippingInfoType["shippingInfo"] =
  JSON?.parse(`${localStorage.getItem("shippingInfo")}`)
    ? JSON?.parse(`${localStorage.getItem("shippingInfo")}`)
    : { ...initialShippingType };

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON?.parse(`${localStorage.getItem("cartItems")}`)
      ? [...JSON?.parse(`${localStorage.getItem("cartItems")}`)]
      : [],
    totalCartCost: Number(localStorage.getItem("totalCartCost")) || 0,
    shippingInfo: initialShippingTypeLocalStore,
  },
  reducers: {
    updateCart: (state, { payload }: PayloadAction<payloadType>) => {
      const { productId, img, stock, name, quantity, cost } = payload;
      const productFound = state.cartItems.findIndex(
        (productItem: payloadType) => {
          return productItem.productId === productId;
        }
      );

      if (productFound != -1) {
        if (quantity == 0) {
          state.cartItems = state.cartItems.filter((cartItems) => {
            return cartItems.productId != productId;
          });
        } else {
          state.cartItems[productFound] = payload;
        }
      } else {
        if (quantity == 0) {
          state.cartItems = state.cartItems.filter((cartItems) => {
            return cartItems.productId != productId;
          });
        } else {
          state.cartItems.push(payload);
        }
      }
      let cartTotalPrice = 0;
      state.cartItems.forEach((cartItems: payloadType) => {
        cartTotalPrice += cartItems.cost;
      });
      state.totalCartCost = cartTotalPrice;
      localStorage.setItem("totalCartCost", `${cartTotalPrice}`);
      sessionStorage.removeItem("order");
      localStorage.setItem("cartItems", JSON.stringify(state?.cartItems));
    },
    decrementSelectedCartItem: (
      state,
      { payload }: PayloadAction<addRemoveCartType>
    ) => {
      const { productId } = payload;
      const productFound = state.cartItems.findIndex(
        (productItem: payloadType) => {
          return productItem.productId === productId;
        }
      );

      if (productFound != -1) {
        if (state.cartItems[productFound].quantity == 1) {
          state.cartItems = state.cartItems.filter((cartItems) => {
            return cartItems.productId != productId;
          });
        } else {
          state.cartItems[productFound].quantity =
            state.cartItems[productFound].quantity - 1;
        }
      }
      let cartTotalPrice = 0;
      state.cartItems.forEach((cartItems: payloadType) => {
        cartTotalPrice += cartItems.cost * cartItems.quantity;
      });
      state.totalCartCost = cartTotalPrice;
      localStorage.setItem("totalCartCost", `${cartTotalPrice}`);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      sessionStorage.removeItem("order");
    },
    incrementSelectedCartItem: (
      state,
      { payload }: PayloadAction<addRemoveCartType>
    ) => {
      const { productId, bottomAlert } = payload;
      const productFound = state.cartItems.findIndex(
        (productItem: payloadType) => {
          return productItem.productId === productId;
        }
      );
      if (
        state.cartItems[productFound].stock <=
        state.cartItems[productFound].quantity
      ) {
        bottomAlert?.error("Out of Stock");
      }
      if (
        productFound != -1 &&
        state.cartItems[productFound].stock >
          state.cartItems[productFound].quantity
      ) {
        state.cartItems[productFound].quantity =
          state.cartItems[productFound].quantity + 1;
      }
      let cartTotalPrice = 0;
      state.cartItems.forEach((cartItems: payloadType) => {
        cartTotalPrice += cartItems.cost * cartItems.quantity;
      });
      state.totalCartCost = cartTotalPrice;
      localStorage.setItem("totalCartCost", `${cartTotalPrice}`);
      sessionStorage.removeItem("order");
      localStorage.setItem("cartItems", JSON.stringify(state?.cartItems));
    },
    removeCartItem: (state, { payload }: PayloadAction<addRemoveCartType>) => {
      const { productId } = payload;
      state.cartItems = state.cartItems.filter((cartItems) => {
        return cartItems.productId != productId;
      });
      let cartTotalPrice = 0;
      state.cartItems.forEach((cartItems: payloadType) => {
        cartTotalPrice += cartItems.cost;
      });
      state.totalCartCost = cartTotalPrice;
      localStorage.setItem("totalCartCost", `${cartTotalPrice}`);
      sessionStorage.removeItem("order");
      localStorage.setItem("cartItems", JSON.stringify(state?.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalCartCost = 0;
      state.shippingInfo = { ...initialShippingType };
      try {
        localStorage.removeItem("totalCartCost");
        sessionStorage.removeItem("order");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("shippingInfo");
      } catch (e) {}
    },
    addUpdateShippingInfo: (
      state,
      { payload }: PayloadAction<ShippingInfoType>
    ) => {
      state.shippingInfo = payload.shippingInfo;
      localStorage.setItem("shippingInfo", JSON.stringify(state?.shippingInfo));
    },
  },
});

export const {
  updateCart,
  decrementSelectedCartItem,
  incrementSelectedCartItem,
  clearCart,
  removeCartItem,
  addUpdateShippingInfo,
} = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
