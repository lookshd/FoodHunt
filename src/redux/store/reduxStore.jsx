import { configureStore, createReducer } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import authReducer from "../slices/authSlice";
import searchReducer from "../slices/searchSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    search: searchReducer,
  },
});
export default store;
