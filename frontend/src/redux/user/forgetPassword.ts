import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const forgetPasswordApi = createAsyncThunk(
  "forgetPassword/forgetPasswordApi",
  async (
    { email, navigation }: { email: string; navigation: any },
    { rejectWithValue }
  ) => {
    const res = await axios
      .post(`/api/v1/password/forgot`, { email })
      .then((e) => e)
      .catch((e) => {
        return rejectWithValue(e.response);
      });
    return res;
  }
);

export const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState: {
    loading: false,
    error: false,
    errorMessage: "",
    successMessage: "",
  },

  reducers: {
    clearForgetPasswordMessages: (state) => {
      state.error = false;
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgetPasswordApi.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
        state.error = false;
      })
      .addCase(forgetPasswordApi.fulfilled, (state, { payload: { data } }) => {
        state.loading = false;
        state.successMessage = data.message;
      })
      .addCase(forgetPasswordApi.rejected, (state, action: any) => {
        state.loading = false;
        state.errorMessage =
          action?.payload?.data?.error ||
          action?.payload?.statusText ||
          "ERROR: Something Went Wrong";
        state.error = true;
      });
  },
});

export const { clearForgetPasswordMessages } = forgetPasswordSlice.actions;

const forgetPasswordReducer = forgetPasswordSlice.reducer;
export default forgetPasswordReducer;
