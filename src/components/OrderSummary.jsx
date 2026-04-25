import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectItemsInCart, selectTotalPrice } from "../redux/slices/cartSlice";

const OrderSummary = () => {
  const cartItems = useSelector(selectItemsInCart);
  const totalPrice = useSelector(selectTotalPrice);
  const navigate = useNavigate();

  const discount = (totalPrice * 10) / 100;
  const deliveryCharges = (totalPrice * 5) / 100;
  const totalAmt = totalPrice + deliveryCharges - discount;

  const handlePlaceOrder = () => {
    const orderId = `FH${Math.floor(Math.random() * 9000) + 1000}`;
    const deliveryTime = Math.floor(Math.random() * 20) + 20;
    navigate("/order-success", {
      state: {
        orderId,
        deliveryTime,
        totalAmount: totalAmt.toFixed(2),
      },
    });
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>

      <div className="order-summary-row">
        <span className="label">Price ({cartItems.length} items)</span>
        <span className="value">₹{totalPrice.toFixed(2)}</span>
      </div>
      <div className="order-summary-row">
        <span className="label">Discount (10%)</span>
        <span className="value discount">- ₹{discount.toFixed(2)}</span>
      </div>
      <div className="order-summary-row">
        <span className="label">Delivery charges (5%)</span>
        <span className="value">+ ₹{deliveryCharges.toFixed(2)}</span>
      </div>

      <div className="order-savings">
        🎉 You'll save ₹{discount.toFixed(2)} on this order
      </div>

      <div className="order-total">
        <span className="label">Total Amount</span>
        <span className="value">₹{totalAmt.toFixed(2)}</span>
      </div>

      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
