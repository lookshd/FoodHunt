import { IMG_CDN_URL } from "../pages/RestaurantList";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite, selectIsFavorite } from "../redux/slices/favoritesSlice";

const RestaurantCard = ({
  id,
  cloudinaryImageId,
  name,
  cuisines,
  areaName,
  sla,
  costForTwo,
  avgRatingString,
  veg,
}) => {
  const dispatch = useDispatch();
  const isFav = useSelector(selectIsFavorite(id));

  const ratingNum = parseFloat(avgRatingString);
  const ratingClass =
    ratingNum >= 4 ? "good" : ratingNum >= 3 ? "avg" : "low";

  const handleFavClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      toggleFavorite({
        info: { id, cloudinaryImageId, name, cuisines, areaName, sla, costForTwo, avgRatingString, veg },
      })
    );
  };

  return (
    <div className="card">
      <div className="card-img-wrapper">
        <img
          src={IMG_CDN_URL + cloudinaryImageId}
          alt={name}
          loading="lazy"
        />
        <button
          className={`card-fav-btn ${isFav ? "favorited" : ""}`}
          onClick={handleFavClick}
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="card-body">
        <h3>{name}</h3>
        <p className="card-cuisines">{cuisines?.join(", ")}</p>
        <p className="card-area">{areaName}</p>
      </div>
      <div className="card-footer">
        <span className={`card-rating ${ratingClass}`}>
          ⭐ {avgRatingString}
        </span>
        <span className="card-meta">
          {sla?.slaString ?? "25-30 min"}
          <span className="card-meta-dot">•</span>
          {costForTwo ?? "₹200 for two"}
        </span>
      </div>
    </div>
  );
};

export default RestaurantCard;
