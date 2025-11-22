import React, { useContext, useState ,useEffect} from 'react'
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
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import useOnline from '../hooks/useOnline';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  selectItemsInCart
} from '../redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import useLocalStorage
 from '../hooks/useLocalStorage';
const Title = () => (
    <a href="/">
      <img className="logo" src={FoodFireLogo} alt="Food Fire Logo" />
    </a>
  );
 
const Header = () => {
 
 
const cartitems=useSelector(selectItemsInCart);

const navigate = useNavigate();

// call custom hook useLocalStorage for getting localStorage value of user
const [getLocalStorage, , clearLocalStorage] = useLocalStorage("user");

// call custom hook useAuth for user is loggedin or not
const [isLoggedin, setIsLoggedin] = useAuth();

useEffect(() => {
  // if value of getLocalStorage is equal to null setIsLoggedin to false
  if (getLocalStorage === null) {
    setIsLoggedin(false);
  }
}, [getLocalStorage]);

// call custom hook useOnline if user is online or not
const isOnline = useOnline();


return (


<div className="Header">
<Title/>
{isLoggedin && (
        <div className="user-name">Hi {getLocalStorage?.userName}!</div>
      )}
<div className="nav-items"> 
 
 <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/about">About</Link></li>
    <li><Link to="/contact">Contact</Link></li>

    <li>
            <Link
              to='/cart'
              className='p-2 relative md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2'
            >
         
              <p className='hidden md:block'>Cart</p>
              {
                <p className='itemshow'>
                  {cartitems.length}
                </p>
              }
            </Link>
          </li>
          <li>
            {/* use conditional rendering for login and logout */}
            {isLoggedin ? (
              <button
                className="logout-btn"
                onClick={() => {
                  clearLocalStorage();
                  setIsLoggedin(false);
                }}
              >
                Logout
                <span
                  className={isOnline ? "login-btn-green" : "login-btn-red"}
                >
                  {" "}
                  ●
                </span>
              </button>
            ) : (
              <button className="login-btn" onClick={() => navigate("/login")}>
                Login
                <span
                  className={isOnline ? "login-btn-green" : "login-btn-red"}
                >
                  {" "}
                  ●
                </span>
              </button>
            )}
          </li>
    </ul>
 </div></div>
  )
}

export default Header