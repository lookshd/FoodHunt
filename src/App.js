import Header from "./components/Header";
import Footer from "./components/Footer";
import Error from "./pages/Error";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, Outlet } from "react-router-dom";
import useOnline from "./hooks/useOnline";
import React, { Suspense, lazy } from "react";
import Shimmer from "./components/Shimmer";

// Lazy loaded pages for code splitting
const Body = lazy(() => import("./pages/Body"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const RestaurantMenu = lazy(() => import("./pages/RestaurantMenu"));
const Cart = lazy(() => import("./pages/Cart"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));

function App() {
  const isonline = useOnline();

  return (
    <>
      {isonline ? (
        <>
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 2000,
              style: {
                borderRadius: "12px",
                padding: "12px 20px",
                fontSize: "14px",
                fontWeight: 500,
              },
            }}
          />
          <Header />
          <Suspense fallback={<Shimmer />}>
            <Outlet />
          </Suspense>
          <Footer />
        </>
      ) : (
        <div className="offline-page">
          <div style={{ fontSize: 56, marginBottom: 16 }}>📡</div>
          <h1>Oops! Connection lost</h1>
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
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Body />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Shimmer />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:resId",
        element: (
          <Suspense fallback={<Shimmer />}>
            <RestaurantMenu />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/order-success",
        element: (
          <Suspense fallback={<Shimmer />}>
            <OrderSuccess />
          </Suspense>
        ),
      },
    ],
  },
]);
export default App;
