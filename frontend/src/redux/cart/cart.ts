import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { CancelTokenSource } from "axios";
import { CancelToken } from "axios";
var source = axios.CancelToken.source();
export type payloadType = {
  productId: string;
  img: string;
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
    totalCartCost: 0,
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
        state.cartItems[productFound] = payload;
      } else {
        state.cartItems.push(payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { updateCart } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
