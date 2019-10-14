import React from "react";

const BubbleBgr = ({ children }) => {
  return (
    <div className="bubble-container">
      <ul className="bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      {children}
    </div>
  );
};

export default BubbleBgr;
