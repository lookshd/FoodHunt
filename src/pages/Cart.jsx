import { useSelector } from "react-redux";
import CartItemList from "../components/CartItemList";
import OrderSummary from "../components/OrderSummary";
import { selectItemsInCart } from "../redux/slices/cartSlice";

const Cart = () => {
  const cartItems = useSelector(selectItemsInCart);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-layout">
        <div className="cart-items-section">
          <CartItemList />
        </div>
        {cartItems && cartItems.length !== 0 && <OrderSummary />}
      </div>
    </div>
  );
};

export default Cart;
