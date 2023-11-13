import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const callSignUpApi = createAsyncThunk(
  "signUp/callSignUpApi",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    const res = await axios
      .post(
        `/api/v1/register`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((e) => e)
      .catch((e) => {
        return rejectWithValue(e.response);
      });
    return res;
  }
);

export const signUpSlice = createSlice({
  name: "signUp",
  initialState: {
    loading: false,
    error: false,
    errorMessage: "",
    response: {},
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(callSignUpApi.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
        state.error = false;
      })
      .addCase(callSignUpApi.fulfilled, (state, { payload: { data } }) => {
        state.loading = false;
        state.response = data;
      })
      .addCase(callSignUpApi.rejected, (state, action: any) => {
        state.loading = false;
        state.errorMessage =
          action?.payload?.data?.error ||
          action?.payload?.statusText ||
          "ERROR: Something Went Wrong";
        state.error = true;
      });
  },
});

const signUpReducer = signUpSlice.reducer;
export default signUpReducer;
