import React, { useContext, useState } from 'react'
import FoodFireLogo from "./images/simple-illustration-of-food-delivery-and-restaurant-logo-design-inspiration-icon-vector.jpg";
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
import {
  selectItemsInCart
} from './slice/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
const Title = () => (
    <a href="/">
      <img className="logo" src={FoodFireLogo} alt="Food Fire Logo" />
    </a>
  );
 
const Header = () => {
  const [isLoggedin,setIsLoggedin]= useState(true);
 
const cartitems=useSelector(selectItemsInCart);




return (


<div className="Header">
<Title/>

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
                onClick={() => setIsLoggedin(false)}
              >
                Sign Out
              </button>
            ) : (
              <button className="login-btn" onClick={() => setIsLoggedin(true)}>
                Sign In
              </button>
            )}
   </li>
    </ul>
 </div></div>
  )
}

export default Header