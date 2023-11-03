import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import ProductReducer from "./product/productSlice";
import productDetails from "./product/productDetailsSlice";
export default configureStore({
  reducer: {
    products: ProductReducer,
    productDetails,
    composeWithDevTools,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
