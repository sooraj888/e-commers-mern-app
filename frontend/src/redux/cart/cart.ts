import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { CancelTokenSource } from "axios";
import { CancelToken } from "axios";
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
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON?.parse(`${localStorage.getItem("cartItems")}`)
      ? [...JSON?.parse(`${localStorage.getItem("cartItems")}`)]
      : [],
    totalCartCost: localStorage.getItem("totalCartCost") || 0,
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
      localStorage.setItem("cartItems", JSON.stringify(state?.cartItems));
    },
    clearCart: (state) => {
      try {
        localStorage.removeItem("totalCartCost");
        localStorage.removeItem("cartItems");
      } catch (e) {}
      state.cartItems = [];
      state.totalCartCost = 0;
    },
  },
});

export const {
  updateCart,
  decrementSelectedCartItem,
  incrementSelectedCartItem,
  clearCart,
  removeCartItem,
} = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
