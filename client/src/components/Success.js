import React from "react";
import "./cssInfo/Success.css";

function Success({ user }) {
  const orderNumber = Math.floor(Math.random() * 1000000);

  return (
    <div className="success-card">
      <p className="success-heading">Thank you for your business!</p>
      <p className="order-number">Your Order Number: {orderNumber}</p>
      <p className="confirmation-email">Confirmation e-mail was sent to {user?.email}</p>
    </div>
  );
}

export default Success;
