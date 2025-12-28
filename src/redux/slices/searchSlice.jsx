import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
  restaurants: [],
  filteredRestaurants: [],
  errorMessage: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setRestaurants: (state, action) => {
      state.restaurants = action.payload;
      state.filteredRestaurants = action.payload;
    },
    setFilteredRestaurants: (state, action) => {
      state.filteredRestaurants = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    filterRestaurants: (state) => {
      const searchText = state.searchText.toLowerCase();
      if (searchText !== "") {
        const filtered = state.restaurants.filter((restaurant) =>
          restaurant?.info?.name?.toLowerCase().includes(searchText) ||
          restaurant?.info?.cuisines?.some(cuisine => 
            cuisine.toLowerCase().includes(searchText)
          )
        );
        state.filteredRestaurants = filtered;
        state.errorMessage = filtered.length === 0 ? "No matching restaurants found" : "";
      } else {
        state.filteredRestaurants = state.restaurants;
        state.errorMessage = "";
      }
    },
  },
});

// Selectors
export const selectSearchText = (state) => state.search.searchText;
export const selectRestaurants = (state) => state.search.restaurants;
export const selectFilteredRestaurants = (state) => state.search.filteredRestaurants;
export const selectErrorMessage = (state) => state.search.errorMessage;

export const {
  setSearchText,
  setRestaurants,
  setFilteredRestaurants,
  setErrorMessage,
  filterRestaurants,
} = searchSlice.actions;

export default searchSlice.reducer;