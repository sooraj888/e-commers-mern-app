import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { CancelTokenSource } from "axios";
import { CancelToken } from "axios";
var source = axios.CancelToken.source();
export type payloadType = {
  productId: string;
  img: any;
  description: string;
  name: string;
  quantity: number;
  cost: number;
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
      const { productId, img, description, name, quantity, cost } = payload;
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
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { updateCart } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
