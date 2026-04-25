import React, { useEffect, useState } from "react";
import { swiggy_api_URL } from "./RestaurantList";
import RestaurantCard from "../components/RestaurantCard";
import Shimmer from "../components/Shimmer";
import { Link } from "react-router-dom";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoginPopupOpen } from "../redux/slices/authSlice";
import {
  selectRestaurants,
  selectFilteredRestaurants,
  selectErrorMessage,
  selectActiveFilters,
  selectSortBy,
  setRestaurants,
  toggleFilter,
  setSortBy,
} from "../redux/slices/searchSlice";

const FILTERS = [
  { key: "rating4", label: "⭐ Rating 4+" },
  { key: "pureVeg", label: "🥬 Pure Veg" },
  { key: "under300", label: "💰 Under ₹300" },
  { key: "fastDelivery", label: "⚡ Fast Delivery" },
];

const Body = () => {
  const restaurants = useSelector(selectRestaurants);
  const filteredRestaurants = useSelector(selectFilteredRestaurants);
  const errorMessage = useSelector(selectErrorMessage);
  const isLoginPopupOpen = useSelector(selectIsLoginPopupOpen);
  const activeFilters = useSelector(selectActiveFilters);
  const sortBy = useSelector(selectSortBy);
  const dispatch = useDispatch();
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    getRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getRestaurants() {
    try {
      setFetchError(false);
      const response = await fetch(swiggy_api_URL);
      const json = await response.json();

      function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          let checkData =
            json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

      const resData = checkJsonData(json);
      dispatch(setRestaurants(resData));
    } catch (error) {
      console.error(error);
      setFetchError(true);
    }
  }

  // Network error state
  if (fetchError) {
    return (
      <div className="network-error">
        <div className="network-error-icon">📡</div>
        <h2>Unable to load restaurants</h2>
        <p>Please check your connection and try again.</p>
        <button className="retry-btn" onClick={getRestaurants}>
          Retry
        </button>
      </div>
    );
  }

  if (!restaurants || restaurants.length === 0) return <Shimmer />;

  return (
    <>
      <div className="body">
        {/* Filter Bar */}
        <div className="filter-bar">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`filter-chip ${activeFilters.includes(f.key) ? "active" : ""}`}
              onClick={() => dispatch(toggleFilter(f.key))}
            >
              {f.label}
            </button>
          ))}
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
          >
            <option value="">Sort By</option>
            <option value="rating">Rating: High to Low</option>
            <option value="deliveryTime">Delivery Time</option>
            <option value="priceLow">Cost: Low to High</option>
            <option value="priceHigh">Cost: High to Low</option>
          </select>
        </div>

        {errorMessage && <div className="error-container">{errorMessage}</div>}

        <div
          className={
            isLoginPopupOpen ? "restaurant-list-blur" : "restaurant-list"
          }
        >
          {filteredRestaurants.length === 0 && !errorMessage ? (
            <div className="no-results">
              <div className="no-results-icon">🍽️</div>
              <h3>No restaurants found</h3>
              <p>Try adjusting your filters or search.</p>
            </div>
          ) : (
            filteredRestaurants.map((restaurant) => (
              <Link
                to={"/restaurant/" + restaurant?.info?.id}
                key={restaurant?.info?.id}
              >
                <RestaurantCard {...restaurant?.info} />
              </Link>
            ))
          )}
        </div>

        {isLoginPopupOpen && (
          <div className="login-backdrop">
            <Login />
          </div>
        )}
      </div>
    </>
  );
};

export default Body;
