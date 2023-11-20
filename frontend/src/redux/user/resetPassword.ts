import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const resetPasswordApi = createAsyncThunk(
  "resetPassword/resetPasswordApi",
  async (
    {
      id,
      newPassword,
      navigation,
    }: { id: string; newPassword: string; navigation: any },
    { rejectWithValue }
  ) => {
    const res = await axios
      .put(`/api/v1/password/reset/${id}`, { password: newPassword })
      .then((e) => e)
      .catch((e) => {
        return rejectWithValue(e.response);
      });
    return res;
  }
);

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    loading: false,
    error: false,
    errorMessage: "",
    successMessage: "",
  },

  reducers: {
    clearResetPasswordMessages: (state) => {
      state.error = false;
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPasswordApi.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
        state.error = false;
      })
      .addCase(resetPasswordApi.fulfilled, (state, { payload: { data } }) => {
        state.loading = false;
        state.successMessage = "Password Reset SuccessFully";
      })
      .addCase(resetPasswordApi.rejected, (state, action: any) => {
        state.loading = false;
        state.errorMessage =
          action?.payload?.data?.error ||
          action?.payload?.statusText ||
          "ERROR: Something Went Wrong";
        state.error = true;
      });
  },
});

export const { clearResetPasswordMessages } = resetPasswordSlice.actions;

const resetPasswordReducer = resetPasswordSlice.reducer;
export default resetPasswordReducer;
