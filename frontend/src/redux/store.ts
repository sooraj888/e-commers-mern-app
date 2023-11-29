import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";

import ProductReducer from "./product/productSlice";
import productDetails from "./product/productDetailsSlice";
import loginReducer from "./user/loginSlice";
import forgetPasswordReducer from "./user/forgetPassword";
import resetPasswordReducer from "./user/resetPassword";
import cartReducer from "./cart/cart";

// Create a root reducer by combining the slice reducers
const rootReducer = combineReducers({
  products: ProductReducer,
  productDetails,
  login: loginReducer,
  forgetPassword: forgetPasswordReducer,
  resetPassword: resetPasswordReducer,
  cart: cartReducer,
  composeWithDevTools,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
