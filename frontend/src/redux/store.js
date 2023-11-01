import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import { composeWithDevTools } from "redux-devtools-extension";
import ProductReducer from "./product/productSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    products: ProductReducer,
    composeWithDevTools,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
