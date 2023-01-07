import React from "react";

const LeftArrowStyling = () => {
  return (
    <svg
      viewBox='0 0 9 14'
      xmlns='http://www.w3.org/2000/svg'
      style={{
        height: "16px",
        width: "16px",
        transform: "scaleX(-1)",
        marginRight: "5px",
      }}
    >
      <g transform='translate(-6.000000, -3.000000)'>
        <polygon fill='none' points='0 20 20 20 20 0 0 0'></polygon>
        <polygon
          fill='inherit'
          points='7.47566213 3 14.4756621 10 7.47566213 17 6 15.5239203 11.5239203 10 6 4.47566213'
        ></polygon>
      </g>
    </svg>
  );
};

export default LeftArrowStyling;
