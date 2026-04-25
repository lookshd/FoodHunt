import { createSlice } from "@reduxjs/toolkit";

const loadRecentSearches = () => {
  try {
    return JSON.parse(localStorage.getItem("recentSearches")) || [];
  } catch {
    return [];
  }
};

const initialState = {
  searchText: "",
  restaurants: [],
  filteredRestaurants: [],
  errorMessage: "",
  recentSearches: loadRecentSearches(),
  activeFilters: [],
  sortBy: "",
};

const applyFiltersAndSort = (state) => {
  let results = [...state.restaurants];
  const searchText = state.searchText.toLowerCase();

  // Apply search text
  if (searchText) {
    results = results.filter(
      (r) =>
        r?.info?.name?.toLowerCase().includes(searchText) ||
        r?.info?.cuisines?.some((c) => c.toLowerCase().includes(searchText))
    );
  }

  // Apply filters
  state.activeFilters.forEach((filter) => {
    switch (filter) {
      case "rating4":
        results = results.filter((r) => parseFloat(r?.info?.avgRating) >= 4);
        break;
      case "pureVeg":
        results = results.filter((r) => r?.info?.veg === true);
        break;
      case "under300":
        results = results.filter((r) => {
          const cost = parseInt(r?.info?.costForTwo?.replace(/[^\d]/g, "")) || 0;
          return cost > 0 && cost <= 300;
        });
        break;
      case "fastDelivery":
        results = results.filter(
          (r) => parseInt(r?.info?.sla?.deliveryTime) <= 30
        );
        break;
      default:
        break;
    }
  });

  // Apply sorting
  switch (state.sortBy) {
    case "priceLow":
      results.sort((a, b) => {
        const aPrice = parseInt(a?.info?.costForTwo?.replace(/[^\d]/g, "")) || 0;
        const bPrice = parseInt(b?.info?.costForTwo?.replace(/[^\d]/g, "")) || 0;
        return aPrice - bPrice;
      });
      break;
    case "priceHigh":
      results.sort((a, b) => {
        const aPrice = parseInt(a?.info?.costForTwo?.replace(/[^\d]/g, "")) || 0;
        const bPrice = parseInt(b?.info?.costForTwo?.replace(/[^\d]/g, "")) || 0;
        return bPrice - aPrice;
      });
      break;
    case "rating":
      results.sort(
        (a, b) =>
          parseFloat(b?.info?.avgRating || 0) -
          parseFloat(a?.info?.avgRating || 0)
      );
      break;
    case "deliveryTime":
      results.sort(
        (a, b) =>
          parseInt(a?.info?.sla?.deliveryTime || 999) -
          parseInt(b?.info?.sla?.deliveryTime || 999)
      );
      break;
    default:
      break;
  }

  state.filteredRestaurants = results;
  state.errorMessage = results.length === 0 && (searchText || state.activeFilters.length) 
    ? "No matching restaurants found" 
    : "";
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
      applyFiltersAndSort(state);
    },
    setRestaurants: (state, action) => {
      state.restaurants = action.payload;
      state.filteredRestaurants = action.payload;
      applyFiltersAndSort(state);
    },
    setFilteredRestaurants: (state, action) => {
      state.filteredRestaurants = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    filterRestaurants: (state) => {
      // Add to recent searches if there's text
      if (state.searchText.trim()) {
        const text = state.searchText.trim();
        state.recentSearches = [
          text,
          ...state.recentSearches.filter((s) => s !== text),
        ].slice(0, 8);
        localStorage.setItem(
          "recentSearches",
          JSON.stringify(state.recentSearches)
        );
      }
      applyFiltersAndSort(state);
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
      localStorage.removeItem("recentSearches");
    },
    toggleFilter: (state, action) => {
      const filter = action.payload;
      if (state.activeFilters.includes(filter)) {
        state.activeFilters = state.activeFilters.filter((f) => f !== filter);
      } else {
        state.activeFilters.push(filter);
      }
      applyFiltersAndSort(state);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      applyFiltersAndSort(state);
    },
    clearAllFilters: (state) => {
      state.activeFilters = [];
      state.sortBy = "";
      state.searchText = "";
      applyFiltersAndSort(state);
    },
  },
});

// Selectors
export const selectSearchText = (state) => state.search.searchText;
export const selectRestaurants = (state) => state.search.restaurants;
export const selectFilteredRestaurants = (state) => state.search.filteredRestaurants;
export const selectErrorMessage = (state) => state.search.errorMessage;
export const selectRecentSearches = (state) => state.search.recentSearches;
export const selectActiveFilters = (state) => state.search.activeFilters;
export const selectSortBy = (state) => state.search.sortBy;

export const {
  setSearchText,
  setRestaurants,
  setFilteredRestaurants,
  setErrorMessage,
  filterRestaurants,
  clearRecentSearches,
  toggleFilter,
  setSortBy,
  clearAllFilters,
} = searchSlice.actions;

export default searchSlice.reducer;