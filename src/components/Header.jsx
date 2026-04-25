import React, { useState, useEffect, useRef, useCallback } from "react";
import FoodFireLogo from "../images/simple-illustration-of-food-delivery-and-restaurant-logo-design-inspiration-icon-vector.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";
import useDebounce from "../hooks/useDebounce";

import { selectItemsInCart } from "../redux/slices/cartSlice";
import {
  selectUser,
  selectIsLoggedIn,
  openLoginPopup,
  logoutUser,
  loginUser,
} from "../redux/slices/authSlice";
import {
  selectSearchText,
  selectRestaurants,
  selectRecentSearches,
  setSearchText,
  filterRestaurants,
  clearRecentSearches,
} from "../redux/slices/searchSlice";
import { useSelector, useDispatch } from "react-redux";
import useLocalStorage from "../hooks/useLocalStorage";

const Title = () => (
  <Link to="/">
    <img className="logo" src={FoodFireLogo} alt="FoodHunt Logo" />
  </Link>
);

const Header = () => {
  const cartItems = useSelector(selectItemsInCart);
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const searchText = useSelector(selectSearchText);
  const restaurants = useSelector(selectRestaurants);
  const recentSearches = useSelector(selectRecentSearches);
  const dispatch = useDispatch();
  const [isDark, toggleDark] = useDarkMode();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const debouncedSearch = useDebounce(searchText, 300);

  const [getLocalStorage, , clearLocalStorage] = useLocalStorage("user");

  // Auto-filter on debounced search
  useEffect(() => {
    if (restaurants.length > 0) {
      dispatch(filterRestaurants());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // Initialize login state from localStorage
  useEffect(() => {
    if (
      getLocalStorage?.token?.length === 100 &&
      !isLoggedIn &&
      getLocalStorage
    ) {
      dispatch(loginUser(getLocalStorage));
    } else if (!getLocalStorage && isLoggedIn) {
      dispatch(logoutUser());
    }
  }, [getLocalStorage, isLoggedIn, dispatch]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLoginClick = () => dispatch(openLoginPopup());

  const handleLogout = () => {
    dispatch(logoutUser());
    clearLocalStorage();
  };

  // Get search suggestions from restaurant names
  const getSuggestions = useCallback(() => {
    if (!searchText.trim() || !restaurants.length) return [];
    const text = searchText.toLowerCase();
    return restaurants
      .filter(
        (r) =>
          r?.info?.name?.toLowerCase().includes(text) ||
          r?.info?.cuisines?.some((c) => c.toLowerCase().includes(text))
      )
      .slice(0, 6)
      .map((r) => r?.info?.name);
  }, [searchText, restaurants]);

  const handleSuggestionClick = (text) => {
    dispatch(setSearchText(text));
    dispatch(filterRestaurants());
    setShowSuggestions(false);
  };

  return (
    <div className="Header">
      <Title />
      {isLoggedIn && user && (
        <div className="user-name">Hi, {user.userName}!</div>
      )}
      <div className="search-container" ref={searchRef}>
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search restaurants or cuisines..."
            value={searchText}
            onChange={(e) => {
              dispatch(setSearchText(e.target.value));
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                dispatch(filterRestaurants());
                setShowSuggestions(false);
              }
            }}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="search-icon"
            onClick={() => {
              dispatch(filterRestaurants());
              setShowSuggestions(false);
            }}
          />
        </div>

        {/* Search Suggestions Dropdown */}
        {showSuggestions && (
          <div className="search-suggestions">
            {searchText.trim() && getSuggestions().length > 0 && (
              <>
                <div className="search-suggestions-header">Suggestions</div>
                {getSuggestions().map((name, i) => (
                  <div
                    key={i}
                    className="search-suggestion-item"
                    onClick={() => handleSuggestionClick(name)}
                  >
                    <span>🔍</span>
                    <span>{name}</span>
                  </div>
                ))}
              </>
            )}
            {!searchText.trim() && recentSearches.length > 0 && (
              <>
                <div className="search-suggestions-header">
                  Recent Searches
                </div>
                {recentSearches.map((term, i) => (
                  <div
                    key={i}
                    className="search-suggestion-item"
                    onClick={() => handleSuggestionClick(term)}
                  >
                    <span>🕐</span>
                    <span>{term}</span>
                  </div>
                ))}
                <div
                  className="clear-recent"
                  onClick={() => dispatch(clearRecentSearches())}
                >
                  Clear All
                </div>
              </>
            )}
            {searchText.trim() && getSuggestions().length === 0 && (
              <div className="search-suggestion-item">
                <span>😕</span>
                <span>No results found</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="nav-items">
        <ul>
          <li>
            <button className="theme-toggle" onClick={toggleDark} title="Toggle dark mode">
              {isDark ? "☀️" : "🌙"}
            </button>
          </li>
          <li>
            <Link to="/cart" className="cart-badge">
              <span>🛒</span>
              <span className="itemshow">{cartItems.length}</span>
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <p onClick={handleLogout}>Logout</p>
            ) : (
              <p onClick={handleLoginClick}>Log in</p>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
