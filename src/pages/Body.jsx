import React, { useEffect, useState } from "react";
import { swiggy_api_URL } from "./RestaurantList";
import RestaurantCard from "../components/RestaurantCard";
import Shimmer from "../components/Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/searchHelper";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoginPopupOpen } from "../redux/slices/authSlice";
import { 
  selectRestaurants, 
  selectFilteredRestaurants, 
  selectErrorMessage,
  setRestaurants 
} from "../redux/slices/searchSlice";
const Body = () => {
  const restaurants = useSelector(selectRestaurants);
  const filterrestaurants = useSelector(selectFilteredRestaurants);
  const errorMessage = useSelector(selectErrorMessage);
  const isLoginPopupOpen = useSelector(selectIsLoginPopupOpen);
  const dispatch = useDispatch();
  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    try {
      const response = await fetch(swiggy_api_URL);
      const json = await response.json();
      console.log(json);
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          // initialize checkData for Swiggy Restaurant data
          let checkData =
            json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;

          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

      // call the checkJsonData() function which return Swiggy Restaurant data
      const resData = await checkJsonData(json);

      // update the Redux store with restaurant data
      dispatch(setRestaurants(resData));
    } catch (error) {
      console.log(error);
    }
  }

  // if allRestaurants is empty don't render restaurants cards
  if (!restaurants || restaurants.length === 0) return <Shimmer />;
  async function getRestaurants() {
    try {
      const response = await fetch(swiggy_api_URL);
      const json = await response.json();
      console.log(json);
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          // initialize checkData for Swiggy Restaurant data
          let checkData =
            json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;

          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

      // call the checkJsonData() function which return Swiggy Restaurant data
      const resData = await checkJsonData(json);

      // update the Redux store with restaurant data
      dispatch(setRestaurants(resData));
    } catch (error) {
      console.log(error);
    }
  }

  // if allRestaurants is empty don't render restaurants cards
  if (!restaurants || restaurants.length === 0) return <Shimmer />;
   console.log("filterrestaurants",filterrestaurants);
  return (
    <>
      {errorMessage && <div className="error-container">{errorMessage}</div>}
      <div className="body">
        <div
          className={
            isLoginPopupOpen ? "restaurant-list-blur" : "restaurant-list"
          }
        >
          {/* We are mapping restaurants array and passing JSON array data to RestaurantCard component as props with unique key as restaurant.data.id */}
          {filterrestaurants.map((restaurant) => {
            return (
              <Link
                to={"/restaurant/" + restaurant?.info?.id}
                key={restaurant?.info?.id}
              >
                <RestaurantCard {...restaurant?.info} />
              </Link>
            );
          })}
        </div>
        {isLoginPopupOpen && (
          <div className="login-backdrop">
            {console.log("Rendering Login component in Body")}
            <Login />
          </div>
        )}
      </div>
    </>
  );
};

export default Body;
