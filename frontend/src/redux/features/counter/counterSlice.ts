import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async ({ id, navigate }: any) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    ).then((data) => data.json());
    if (!res) {
      navigate("/product");
    }
    return res;
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    loading: false,
    entities: [],
  },

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: {
    [getPosts.pending.type]: (state) => {
      state.loading = true;
    },
    [getPosts.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.entities = payload;
    },
    [getPosts.rejected.type]: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
