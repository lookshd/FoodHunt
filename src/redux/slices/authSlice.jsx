import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoginPopupOpen: false,
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openLoginPopup: (state) => {
      state.isLoginPopupOpen = true;
    },
    closeLoginPopup: (state) => {
      state.isLoginPopupOpen = false;
    },
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.isLoginPopupOpen = false;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

// Selectors
export const selectIsLoginPopupOpen = (state) => state.auth.isLoginPopupOpen;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;

export const { openLoginPopup, closeLoginPopup, loginUser, logoutUser } =
  authSlice.actions;

export default authSlice.reducer;
