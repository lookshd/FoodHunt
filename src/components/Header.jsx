import React, { useContext, useState, useEffect } from "react";
import FoodFireLogo from "../images/simple-illustration-of-food-delivery-and-restaurant-logo-design-inspiration-icon-vector.jpg";
import {
  Bars3Icon,
  BuildingOfficeIcon,
  ChevronDownIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PhoneIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useOnline from "../hooks/useOnline";
import { useNavigate } from "react-router-dom";
import { selectItemsInCart } from "../redux/slices/cartSlice";
import {
  selectUser,
  selectIsLoggedIn,
  openLoginPopup,
  logoutUser,
  loginUser,
} from "../redux/slices/authSlice";
import { selectSearchText, setSearchText, filterRestaurants } from "../redux/slices/searchSlice";
import { useSelector, useDispatch } from "react-redux";
import useLocalStorage from "../hooks/useLocalStorage";
const Title = () => (
  <a href="/">
    <img className="logo" src={FoodFireLogo} alt="Food Fire Logo" />
  </a>
);

const Header = () => {
  const cartitems = useSelector(selectItemsInCart);
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const searchText = useSelector(selectSearchText);
  const dispatch = useDispatch();
  console.log("isLoggedIn", isLoggedIn);
  const navigate = useNavigate();

  // call custom hook useLocalStorage for getting localStorage value of user
  const [getLocalStorage, , clearLocalStorage] = useLocalStorage("user");


  // Initialize login state from localStorage on component mount
  useEffect(() => {
    if (
      getLocalStorage?.token?.length === 100 &&
      !isLoggedIn &&
      getLocalStorage
    ) {
      // User has valid token in localStorage but Redux state shows logged out
      console.log("Initializing login from localStorage:", getLocalStorage);
      dispatch(loginUser(getLocalStorage));
    } else if (!getLocalStorage && isLoggedIn) {
      // No localStorage but Redux shows logged in - clear Redux state
      console.log("No localStorage found, clearing Redux state");
      dispatch(logoutUser());
    }
  }, [getLocalStorage, isLoggedIn, dispatch]);

  // call custom hook useOnline if user is online or not
  const isOnline = useOnline();

  const handleLoginClick = () => {
    dispatch(openLoginPopup());
  };

  const handleLogout = () => {
    console.log("Logging out user...");
    // Dispatch logout first to update Redux state immediately
    dispatch(logoutUser());
    // Then clear localStorage
    clearLocalStorage();
  };
  console.log("searchText",searchText);

  return (
    <div className="Header">
      <Title />
      {isLoggedIn && user && (
        <div className="user-name">Hi {user.userName}!</div>
      )}
      <div className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search a restaurant you want..."
            value={searchText}
            onChange={(e) => dispatch(setSearchText(e.target.value))}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="search-icon"
            onClick={() => {
              dispatch(filterRestaurants());
            }}
          />
        </div>
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link
              to="/cart"
              className="p-2 relative md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              <p className="hidden md:block">Cart</p>
              {<p className="itemshow">{cartitems.length}</p>}
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <p
                onClick={handleLogout}
                className="p-2 md:px-4 hover:bg-gray-50 rounded-md"
              >
                Logout
              </p>
            ) : (
              <p
                onClick={handleLoginClick}
                className="p-2 md:px-4 hover:bg-gray-50 rounded-md"
              >
                Log in
              </p>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
