import React, { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const orderId =
    location.state?.orderId ||
    `FH${Math.floor(Math.random() * 9000) + 1000}`;
  const deliveryTime =
    location.state?.deliveryTime || Math.floor(Math.random() * 20) + 20;
  const totalAmount = location.state?.totalAmount || "0.00";

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="order-success-page">
      <div className="success-icon">🎉</div>
      <h1 className="success-title">Order Placed Successfully!</h1>
      <p className="success-order-id">
        Order <span>#{orderId}</span>
      </p>

      <div className="success-card">
        <div className="success-detail">
          <span className="success-detail-icon">🚴</span>
          <span className="success-detail-value">{deliveryTime} mins</span>
          <span className="success-detail-label">Estimated Delivery</span>
        </div>
        <div className="success-detail">
          <span className="success-detail-icon">💳</span>
          <span className="success-detail-value">₹{totalAmount}</span>
          <span className="success-detail-label">Total Paid</span>
        </div>
        <div className="success-detail">
          <span className="success-detail-icon">✅</span>
          <span className="success-detail-value">Confirmed</span>
          <span className="success-detail-label">Order Status</span>
        </div>
      </div>

      <div className="success-actions">
        <Link to="/" className="success-btn-primary">
          Order More Food
        </Link>
        <button
          className="success-btn-outline"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
