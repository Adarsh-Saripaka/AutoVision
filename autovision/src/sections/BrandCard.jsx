import React from "react";
import "./BrandCard.css";

const BrandCard = ({ brand, onClick }) => {
  return (
    <div className="brand-card" onClick={onClick}>
      <span className="brand-glow" />
      <h2 className="brand-name">{brand}</h2>
    </div>
  );
};

export default BrandCard;
