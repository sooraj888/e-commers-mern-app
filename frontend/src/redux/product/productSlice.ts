import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async ({}: any) => {
    const res = await axios.get(`/api/v1/products/`);
    return res.data;
  }
);

export const counterSlice = createSlice({
  name: "products",
  initialState: {
    productCount: 0,
    loading: false,
    error: false,
    errorMessage: "",
    products: [],
  },

  reducers: {},
  extraReducers: {
    [getAllProducts.pending.type]: (state) => {
      state.loading = true;
      state.errorMessage = "";
      state.error = false;
    },
    [getAllProducts.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.productCount = payload.productCount;
      state.products = payload.products;
    },
    [getAllProducts.rejected.type]: (state, { error }) => {
      state.loading = false;
      state.errorMessage = error?.response?.data?.message || error.message;
      state.error = true;
    },
  },
});

export default counterSlice.reducer;
