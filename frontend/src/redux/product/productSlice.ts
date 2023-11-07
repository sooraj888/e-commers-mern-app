import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (
    {
      page,
      search,
      priceRange,
      category,
    }: {
      page?: number | string;
      search?: string;
      priceRange?: [number, number];
      category?: string;
    },
    { rejectWithValue }
  ) => {
    const res = await axios
      .get(`/api/v1/products/`, {
        params: {
          page,
          keyword: search,
          "price[gte]": priceRange?.[0],
          "price[lte]": priceRange?.[1],
          category: category,
        },
      })
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
    sortedProductCount: 0,
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
        state.sortedProductCount = data?.sortedProductCount;
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
