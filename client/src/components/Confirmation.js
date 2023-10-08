import React from "react";
import "./cssInfo/Confirmation.css";
import { useNavigate } from "react-router-dom";

function Confirmation({ user }) {
  const navigate = useNavigate()


  const orderNumber = Math.floor(Math.random() * 1000000);

  const handleClick = () => {
    navigate("/account")
  }

  return (
    <div className="success-card">
      <p className="success-heading">Thank you for your business!</p>
      <p className="order-number">Your Order Number: {orderNumber}</p>
      <p className="confirmation-email">Confirmation e-mail was sent to {user?.email}</p>
      <button onClick={handleClick} className="account-page-button">Account Page</button>
    </div>
  );
}

export default Confirmation;
