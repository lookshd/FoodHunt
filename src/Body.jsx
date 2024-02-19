import React, { useEffect, useState } from 'react'
import { swiggy_api_URL} from './ResturantList';
import RestaurantCard from './RestaurantCard'
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import {filterData} from './utility/searchhelper'
import useOnline from './utility/useOnline';
const Body = () => 
{
  const[searchText,setSearchText]= useState("");
  const [restaurants, setRestaurants] = useState([]);
  const[filterrestaurants,setFilterrestaurants]=useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(()=>
  {
    getRestaurants();


  },[] );
async function getRestaurants(){
try {
  const response= await fetch(swiggy_api_URL);
  const json=await response.json();
  console.log(json);
  async function checkJsonData(jsonData) {
    for (let i = 0; i < jsonData?.data?.cards.length; i++) {

      // initialize checkData for Swiggy Restaurant data
      let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      // if checkData is not undefined then return it
      if (checkData !== undefined) {
        return checkData;
      }
    }
  }

  // call the checkJsonData() function which return Swiggy Restaurant data
  const resData = await checkJsonData(json);

  // update the state variable restaurants with Swiggy API data
  setRestaurants(resData);
  setFilterrestaurants(resData);
  
} catch (error) {
  console.log(error);

  
}
}
const searchData = (searchText, restaurants) => {
  if (searchText !== "") {
    const filteredData = filterData(searchText, restaurants);
    setFilterrestaurants(filteredData);
    setErrorMessage("");
    if (filteredData?.length === 0) {
      setErrorMessage("No matches restaurant found");
    }
  } else {
    setErrorMessage("");
    setFilterrestaurants(restaurants);
  }
};

// if allRestaurants is empty don't render restaurants cards


if (!restaurants) return null;


  return (
  <>
  <div className="search-container">
    <input 
    type="text"
    className="search-input"
    placeholder="Search a restaurant you want..."
    value={searchText}
    onChange={(e)=>setSearchText(e.target.value)}
    >
    </input>
     
  
    <button
          className="search-btn"
          onClick={() => {
          searchData(searchText,restaurants);
          
          }}
        >
          Search
        </button>
  </div>
  {errorMessage && <div className="error-container">{errorMessage}</div>}
    {
      restaurants?.length===0 ?(
        <Shimmer/>
      ):(
        <div className="restaurant-list">
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
      )

    }
    
    
   </>
  )
}

export default Body