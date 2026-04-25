import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: (() => {
    try {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      return [];
    }
  })(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const restaurant = action.payload;
      const exists = state.items.find((r) => r?.info?.id === restaurant?.info?.id);
      if (exists) {
        state.items = state.items.filter(
          (r) => r?.info?.id !== restaurant?.info?.id
        );
      } else {
        state.items.push(restaurant);
      }
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
  },
});

export const selectFavorites = (state) => state.favorites.items;
export const selectIsFavorite = (id) => (state) =>
  state.favorites.items.some((r) => r?.info?.id === id);

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
