import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async ({}: any, { rejectWithValue }) => {
    const res = await axios
      .get(`/api/v1/products/`)
      .then((e) => e)
      .catch((e) => {
        return rejectWithValue(e.response);
      });
    return res;
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
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
        state.error = false;
      })
      .addCase(getAllProducts.fulfilled, (state, { payload: { data } }) => {
        state.loading = false;
        state.productCount = data?.productCount;
        state.products = data?.products;
      })
      .addCase(getAllProducts.rejected.type, (state, action: any) => {
        state.loading = false;
        state.errorMessage =
          action?.payload?.data?.error ||
          action?.payload?.statusText ||
          "ERROR: Something Went Wrong";
        state.error = true;
      });
  },
});

export default counterSlice.reducer;
