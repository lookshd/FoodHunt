import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  swiggy_menu_api_URL,
  IMG_CDN_URL,
  ITEM_IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
} from "../pages/RestaurantList";
import { MenuShimmer } from "../components/Shimmer";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  selectItemsInCart,
} from "../redux/slices/cartSlice";
import { toast } from "react-hot-toast";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectItemsInCart);

  const getCartItem = (id) => cartItems.find((ci) => ci?.item?.id === id);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart!`);
  };

  const handleIncrease = (id) => dispatch(increaseItemQuantity({ id }));
  const handleDecrease = (id) => dispatch(decreaseItemQuantity({ id }));

  useEffect(() => {
    getRestaurantInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getRestaurantInfo() {
    try {
      setFetchError(false);
      const response = await fetch(swiggy_menu_api_URL + resId);
      const json = await response.json();

      const restaurantData =
        json?.data?.cards
          ?.map((x) => x.card)
          ?.find((x) => x && x.card["@type"] === RESTAURANT_TYPE_KEY)?.card
          ?.info || null;
      setRestaurant(restaurantData);

      const menuItemsData =
        json?.data?.cards
          .find((x) => x.groupedCard)
          ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x.card?.card)
          ?.filter((x) => x["@type"] === MENU_ITEM_TYPE_KEY)
          ?.map((x) => x.itemCards)
          .flat()
          .map((x) => x.card?.info) || [];

      const uniqueMenuItems = [];
      menuItemsData.forEach((item) => {
        if (!uniqueMenuItems.find((x) => x.id === item.id)) {
          uniqueMenuItems.push(item);
        }
      });
      setMenuItems(uniqueMenuItems);
    } catch (error) {
      setMenuItems([]);
      setRestaurant(null);
      setFetchError(true);
      console.error(error);
    }
  }

  if (fetchError) {
    return (
      <div className="network-error">
        <div className="network-error-icon">📡</div>
        <h2>Unable to load restaurant menu</h2>
        <p>Please check your connection and try again.</p>
        <button className="retry-btn" onClick={getRestaurantInfo}>
          Retry
        </button>
      </div>
    );
  }

  return !restaurant ? (
    <MenuShimmer />
  ) : (
    <div className="restaurant-menu">
      <div className="restaurant-summary">
        <img
          className="restaurant-img"
          src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
          alt={restaurant?.name}
          loading="lazy"
        />
        <div className="restaurant-summary-details">
          <h2 className="restaurant-title">{restaurant?.name}</h2>
          <p className="restaurant-tags">{restaurant?.cuisines?.join(", ")}</p>
          <div className="restaurant-details">
            <div className="restaurant-rating">
              ⭐ <span>{restaurant?.avgRating}</span>
            </div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.sla?.slaString}</div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.costForTwoMessage}</div>
          </div>
        </div>
      </div>

      <div className="restaurant-menu-content">
        <div className="menu-items-container">
          <div className="menu-title-wrap">
            <h3 className="menu-title">Recommended</h3>
            <p className="menu-count">{menuItems.length} ITEMS</p>
          </div>
          <div className="menu-items-list">
            {menuItems.map((item) => {
              const cartItem = getCartItem(item?.id);
              const isVeg = item?.isVeg === 1;
              return (
                <div className="menu-item" key={item?.id}>
                  <div className="menu-item-details">
                    {/* Veg/Non-veg icon */}
                    <div className={isVeg ? "veg-icon" : "non-veg-icon"}>
                      <div className="dot"></div>
                    </div>
                    <h3 className="item-title">{item?.name}</h3>
                    <p className="item-cost">
                      {item?.price > 0
                        ? new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(item?.price / 100)
                        : " "}
                    </p>
                    {item?.ratings?.aggregatedRating?.rating && (
                      <p className="item-rating">
                        ⭐ {item.ratings.aggregatedRating.rating}
                        <span style={{ opacity: 0.6, marginLeft: 4, fontSize: 11 }}>
                          ({item.ratings.aggregatedRating.ratingCountV2})
                        </span>
                      </p>
                    )}
                    <p className="item-desc">{item?.description}</p>
                  </div>
                  <div className="menu-img-wrapper">
                    {item?.imageId && (
                      <img
                        className="menu-item-img"
                        src={ITEM_IMG_CDN_URL + item?.imageId}
                        alt={item?.name}
                        loading="lazy"
                      />
                    )}
                    {cartItem ? (
                      <div className="qty-control">
                        <button onClick={() => handleDecrease(item.id)}>
                          −
                        </button>
                        <span>{cartItem.quantity}</span>
                        <button onClick={() => handleIncrease(item.id)}>
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart({ ...item })}
                        className="add-to-cart-btn"
                      >
                        ADD
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
