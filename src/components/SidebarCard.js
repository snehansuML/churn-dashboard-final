import React from "react";

function SidebarCard({ title, value, isCurrency }) {
  const displayValue = isCurrency
    ? `$${(value / 1000000).toFixed(2)}M`
    : value.toLocaleString();

  return (
    <div className="sidebar-card">
      <h3>{displayValue}</h3>
      <p>{title}</p>
    </div>
  );
}

export default SidebarCard;
