import Header from "./header";
import Footer from "./Footer";
import Body from "./Body";
import Error from "./Error";
import About from "./About";
import React from "react";
import Login from "./Login";
import Contact from "./Contact";
import { Toaster } from 'react-hot-toast';
import RestaurantMenu from "./RestaurantMenu";
import { createBrowserRouter,Outlet,RouterProvider } from "react-router-dom";
import Cart from "./cart";
import useOnline from "./utility/useOnline";
function App() {
const isonline=useOnline();

  return (
   <>
 {   isonline?
 (<>
   <Toaster />
 <Header/>
<Outlet/>
 <Footer/></>
 )
:
(
  <div className='helloji'>
    <h1 className='text-4xl font-bold'>Oops! Connection lost</h1>
    <p>
      Looks like you're offline, please check your internet connection.
    </p>
  </div>
)
}
 </>
   
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/", // show path for routing
    element: <App />, // show component for particular path
    errorElement: <Error />, // show error component for path is different
    children: [
      // show children component for routing
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart/>,
      },
    ],
  }, 
  {  
    path: "/login",
    element: <Login />,
  },
]);
export default App;
