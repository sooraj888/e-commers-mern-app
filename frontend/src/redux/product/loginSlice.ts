import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const callLoginApi = createAsyncThunk(
  "login/callLoginApi",
  async (
    {
      email,
      password,
      navigate,
    }: { email: string; password: string; navigate: any },
    { rejectWithValue }
  ) => {
    const res = await axios
      .post(
        `/api/v1/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((e) => {
        // navigate("/");
        return e;
      })
      .catch((e) => {
        return rejectWithValue(e.response);
      });
    return res;
  }
);

export const callLoginWithToken = createAsyncThunk(
  "login/callLoginWithToken",
  async ({ navigate }: any, { rejectWithValue }) => {
    const res = await axios
      .get(`/api/v1/me`)
      .then((e) => {
        // navigate("/");
        return e;
      })
      .catch((e) => {
        return rejectWithValue(e.response);
      });
    return res;
  }
);

export const callLogoutApi = createAsyncThunk(
  "login/callLogoutApi",
  async ({ navigate }: { navigate: any }, { rejectWithValue }) => {
    const res = await axios
      .get(`/api/v1/logout`)
      .then((e) => {
        navigate("/login");
        return e;
      })
      .catch((e) => {
        return rejectWithValue(e.response);
      });
    return res;
  }
);

export const callSignUpApi = createAsyncThunk(
  "login/callSignUpApi",
  async ({ formData }: { formData: any }, { rejectWithValue }) => {
    // console.log({ name, email, password });
    const res = await axios
      .post(`/api/v1/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
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
    isAuthenticated: false,
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
        if (data.user) {
          state.isAuthenticated = true;
        }
      })
      .addCase(callLoginApi.rejected, (state, action: any) => {
        state.loading = false;
        state.errorMessage =
          action?.payload?.data?.error ||
          action?.payload?.statusText ||
          "ERROR: Something Went Wrong";
        state.error = true;
        state.isAuthenticated = false;
      })
      .addCase(callLoginWithToken.pending, (state) => {
        state.errorMessage = "";
        state.error = false;
      })
      .addCase(callLoginWithToken.fulfilled, (state, { payload: { data } }) => {
        state.loading = false;
        state.response = data;
        if (data.user) {
          state.isAuthenticated = true;
        }
      })
      .addCase(callLoginWithToken.rejected, (state, action: any) => {
        state.loading = false;
        state.errorMessage = "";
        // action?.payload?.data?.error ||
        // action?.payload?.statusText ||
        // "ERROR: Something Went Wrong";
        state.error = false;
        state.isAuthenticated = false;
      })
      .addCase(callLogoutApi.fulfilled, (state, { payload: { data } }) => {
        state.isAuthenticated = false;
      })
      .addCase(callSignUpApi.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
        state.error = false;
      })
      .addCase(callSignUpApi.fulfilled, (state, { payload: { data } }) => {
        state.loading = false;
        state.response = data;
        if (data.user) {
          state.isAuthenticated = true;
        }
      })
      .addCase(callSignUpApi.rejected, (state, action: any) => {
        state.loading = false;
        state.errorMessage =
          action?.payload?.data?.error ||
          action?.payload?.statusText ||
          "ERROR: Something Went Wrong";
        state.error = true;
        state.isAuthenticated = false;
      });
  },
});

const loginReducer = loginSlice.reducer;
export default loginReducer;
