import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductDetails = createAsyncThunk(
  "productDetails/getProductDetails",
  async (
    { productId, navigation }: { productId: string; navigation: any },
    { rejectWithValue }
  ) => {
    const res = await axios
      .get(`/api/v1/products/${productId}`)
      .then((e) => e)
      .catch((e) => {
        return rejectWithValue(e.response);
      });
    return res;
  }
);

export const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    loading: false,
    error: false,
    errorMessage: "",
    product: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
        state.error = false;
      })
      .addCase(getProductDetails.fulfilled, (state, { payload: { data } }) => {
        state.loading = false;
        state.product = data?.product;
      })
      .addCase(getProductDetails.rejected, (state, action: any) => {
        state.loading = false;
        state.errorMessage =
          action?.payload?.data?.error ||
          action?.payload?.statusText ||
          "ERROR: Something Went Wrong";
        state.error = true;
      });
  },
});

const productDetails = productDetailsSlice.reducer;
export default productDetails;
