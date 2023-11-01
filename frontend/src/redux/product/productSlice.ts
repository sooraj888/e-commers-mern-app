import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async ({ dispatch }: any) => {
    dispatch(clearError());
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

  reducers: {
    clearError: (state) => {
      state.error = false;
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [getAllProducts.pending.type]: (state) => {
      state.loading = true;
    },
    [getAllProducts.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.productCount = payload.productCount;
      state.products = payload.products;
    },
    [getAllProducts.rejected.type]: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { clearError } = counterSlice.actions;
export default counterSlice.reducer;
