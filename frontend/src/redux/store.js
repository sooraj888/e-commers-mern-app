import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import { composeWithDevTools } from "redux-devtools-extension";
export default configureStore({
  reducer: {
    counter: counterReducer,
    composeWithDevTools,
  },
});
