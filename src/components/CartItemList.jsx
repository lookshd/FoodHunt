import { useSelector, useDispatch } from "react-redux";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeFromCart,
  selectItemsInCart,
} from "../redux/slices/cartSlice";
import { CDN_URL } from "../pages/RestaurantList";
import { Link } from "react-router-dom";

const CartItemList = () => {
  const cartItems = useSelector(selectItemsInCart);
  const dispatch = useDispatch();

  const removeItem = (id) => dispatch(removeFromCart({ id }));
  const decreaseQuantity = (id) => dispatch(decreaseItemQuantity({ id }));
  const increaseQuantity = (id) => dispatch(increaseItemQuantity({ id }));

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some delicious food to get started!</p>
        <Link to="/">Browse Restaurants</Link>
      </div>
    );
  }

  return (
    <div>
      {cartItems.map((item) => (
        <div className="cart-item" key={item?.item?.id}>
          <img
            className="cart-item-img"
            src={CDN_URL + item?.item?.imageId}
            alt={item?.item?.name}
            loading="lazy"
          />
          <div className="cart-item-info">
            <h4>{item?.item?.name}</h4>
            <p className="cart-item-price">
              <span className="total">
                ₹{((item?.quantity * item?.item?.price) / 100).toFixed(2)}
              </span>
              {" "}
              <span style={{ fontSize: 12, opacity: 0.6 }}>
                (₹{(item?.item?.price / 100).toFixed(2)} × {item?.quantity})
              </span>
            </p>
            <div className="cart-item-actions">
              <div className="cart-qty">
                <button
                  onClick={() => decreaseQuantity(item?.item?.id)}
                  disabled={item?.quantity === 1}
                >
                  −
                </button>
                <span>{item?.quantity}</span>
                <button onClick={() => increaseQuantity(item?.item?.id)}>
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item?.item?.id)}
                className="cart-remove-btn"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItemList;
