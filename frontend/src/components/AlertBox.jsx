import React from "react";

export default function AlertBox({ message, type = "error" }) {
  return (
    <div className={`alert alert-${type}`}>
      <p>{message}</p>
    </div>
  );
}