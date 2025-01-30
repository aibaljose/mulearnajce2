import React from "react";

const GooglePayButton = () => {
  const upiID = "aibaljosej@okicici"; // Replace with your UPI ID
  const name = "ACM AJCE"; // Business or personal name
  const amount = "500"; // Amount in INR
  const transactionID = "T" + Date.now(); // Unique transaction ID
  const orderID = "ORDER" + Date.now(); // Unique order ID
  const currency = "INR";
  const note = "Payment for UXPLORE";

  // Generate UPI payment URL
  const upiURL = `upi://pay?pa=${upiID}&pn=${name}&tr=${orderID}&tn=${note}&am=${amount}&cu=${currency}`;

  const handlePayment = () => {
    window.location.href = upiURL; // Redirect to Google Pay app
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        backgroundColor: "#4285F4",
        color: "#fff",
        padding: "10px 20px",
        fontSize: "16px",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
      }}
    >
      Pay ₹{amount} with Google Pay
    </button>
  );
};

export default GooglePayButton;
