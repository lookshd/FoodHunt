import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./pages/Body";
import Error from "./pages/Error";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Toaster } from "react-hot-toast";
import RestaurantMenu from "./pages/RestaurantMenu";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Cart from "./pages/Cart";
import useOnline from "./hooks/useOnline";
import React from "react";
function App() {
  const isonline = useOnline();

  return (
    <>
      {isonline ? (
        <>
          <Toaster />
          <Header />
          <Outlet />
          <Footer />
        </>
      ) : (
        <div className="helloji">
          <h1 className="text-4xl font-bold">Oops! Connection lost</h1>
          <p>
            Looks like you're offline, please check your internet connection.
          </p>
        </div>
      )}
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
        element: <Cart />,
      },
    ],
  },
]);
export default App;
