import React from "react";

export const Input = ({ label, type, value, onChange }) => (
  <div className="input-group">
    <label>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="input"
    />
  </div>
);