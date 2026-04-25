import React from "react";
import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="Error">
      <div style={{ fontSize: 64, marginBottom: 16 }}>🍔</div>
      <h1>Oops! Page not found</h1>
      <h3 className="error-data">{error?.data || "Something went wrong"}</h3>
      <h3 className="error-back-home">
        <Link to="/">Back to Home</Link>
      </h3>
    </div>
  );
};

export default Error;
