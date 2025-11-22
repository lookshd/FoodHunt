import React from 'react'
import { useRouteError,Link } from 'react-router-dom'
const Error = () => {
  const error =useRouteError();
 

    return (
    <div className="Error">
         <h1>Oops! The restaurant you're looking for can't be found.</h1>
      <h3 className="error-data">{error.data}</h3>
      <h3 className="error-back-home">
        <Link to="/">Back Home</Link>
      </h3>
    </div>
  )
}

export default Error