import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const callLoginApi = createAsyncThunk(
  "login/callLoginApi",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    const res = await axios
      .post(
        `/api/v1/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((e) => e)
      .catch((e) => {
        return rejectWithValue(e.response);
      });
    return res;
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    error: false,
    errorMessage: "",
    response: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(callLoginApi.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
        state.error = false;
      })
      .addCase(callLoginApi.fulfilled, (state, { payload: { data } }) => {
        state.loading = false;
        state.response = data;
      })
      .addCase(callLoginApi.rejected, (state, action: any) => {
        state.loading = false;
        state.errorMessage =
          action?.payload?.data?.error ||
          action?.payload?.statusText ||
          "ERROR: Something Went Wrong";
        state.error = true;
      });
  },
});

const loginReducer = loginSlice.reducer;
export default loginReducer;
