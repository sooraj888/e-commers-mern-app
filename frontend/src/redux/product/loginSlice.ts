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

export const callUpdateUserApi = createAsyncThunk(
  "login/updateApi",
  async ({ formData }: { formData: any }, { rejectWithValue }) => {
    const res = await axios
      .put(`/api/v1/me/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((e) => {
        console.log(e);
        return e;
      })
      .catch((e) => {
        console.log(e);
        return rejectWithValue(e.response);
      });
    return res;
  }
);

export const UpdateUserPasswordApi = createAsyncThunk(
  "login/UpdateUserPasswordApi",
  async (
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    const res = await axios
      .put(`/api/v1/password/update`, { oldPassword, newPassword })
      .then((e) => {
        return e;
      })
      .catch((e) => {
        console.log(e);
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
    successMessage: "",
  },

  reducers: {
    clearSuccessMessage: (state) => {
      state.successMessage = "";
    },
  },
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
        state.loading = true;
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
        state.loading = false;
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
      })
      .addCase(callUpdateUserApi.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
        state.error = false;
      })
      .addCase(callUpdateUserApi.fulfilled, (state, { payload: { data } }) => {
        state.loading = false;
        state.response = data;
      })
      .addCase(callUpdateUserApi.rejected, (state, action: any) => {
        state.loading = false;
        state.errorMessage =
          action?.payload?.data?.error ||
          action?.payload?.statusText ||
          "ERROR: Something Went Wrong";
        state.error = true;
      })
      .addCase(UpdateUserPasswordApi.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
        state.error = false;
        state.successMessage = "";
      })
      .addCase(
        UpdateUserPasswordApi.fulfilled,
        (state, { payload: { data } }) => {
          state.loading = false;
          state.successMessage = "Password Updated SuccessFully";
          // state.response = data;
        }
      )
      .addCase(UpdateUserPasswordApi.rejected, (state, action: any) => {
        state.loading = false;
        state.errorMessage =
          action?.payload?.data?.error ||
          action?.payload?.statusText ||
          "ERROR: Something Went Wrong";
        state.error = true;
        state.successMessage = "";
      });
  },
});

const loginReducer = loginSlice.reducer;

export const { clearSuccessMessage } = loginSlice.actions;
export default loginReducer;
