import React from "react";

const ButtonGroup = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "16px",
        gap: "12px",
      }}
    >
      {children}
    </div>
  );
};

export default ButtonGroup;
