import React from 'react'

const Menushimmer = () => {
  return (
    <div className="Menushimmer">
    <div className="heading">
 {   Array(1)
          .fill("")
          .map((e, index) => (
            <div key={index} className="shimmer-card2"></div>
          ))}
    </div>
    <div className="normal">

    </div>
    </div>
  )
}

export default Menushimmer