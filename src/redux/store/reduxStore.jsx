import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import authReducer from "../slices/authSlice";
import searchReducer from "../slices/searchSlice";
import favoritesReducer from "../slices/favoritesSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    search: searchReducer,
    favorites: favoritesReducer,
  },
});
export default store;
