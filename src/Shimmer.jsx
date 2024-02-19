const Shimmer = () => {
    return (
      <div className="restaurant-list" data-testid="shimmer">
        {Array(30)
          .fill("")
          .map((e, index) => (
            <div key={index} className="shimmer-card"></div>
          ))}
      </div>
    );
  };
  
  export default Shimmer;
  