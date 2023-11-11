import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { CancelTokenSource } from "axios";
import { CancelToken } from "axios";
var source = axios.CancelToken.source();
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (
    {
      page,
      search,
      priceRange,
      category,
      ratings,
    }: {
      page?: number;
      search?: string;
      priceRange?: [number, number];
      category?: string | null;
      ratings?: number;
    },
    { rejectWithValue }
  ) => {
    // alert("category" + category);
    source?.cancel("Operation canceled by the user.");
    source = axios.CancelToken.source();
    const options: any = {
      cancelToken: source?.token,
      params: {
        keyword: search,
        "price[gte]": priceRange?.[0],
        "price[lte]": priceRange?.[1],
      },
    };
    if (page) {
      options.params["page"] = page;
    }
    if (category) {
      options.params["category"] = category;
    }
    if (ratings) {
      options.params["ratings[gte]"] = ratings;
    }

    const res = await axios
      .get(`/api/v1/products/`, options)
      .then((e) => e)
      .catch((e) => {
        if (axios.isCancel(e)) {
          console.log("Request canceled", e.message);
        } else {
          // handle error
        }
        return rejectWithValue(e.response || e);
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
        if (axios.isCancel(action?.payload)) {
          state.error = false;
          state.errorMessage = "";
        }
      });
  },
});

export default counterSlice.reducer;
