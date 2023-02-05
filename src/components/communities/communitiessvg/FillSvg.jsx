import React from "react";

const FillSvg = ({ fill }) => {
  return (
    <svg
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
      style={{
        stroke: fill,
        fill: fill,
        height: "52px",
        width: "52px",
      }}
    >
      <g>
        <rect
          stroke='inherit'
          fill='none'
          x='1.5'
          y='1.5'
          width='17'
          height='17'
          rx='4'
        ></rect>
        <rect
          fill='inherit'
          stroke='none'
          x='4'
          y='4'
          width='12'
          height='12'
        ></rect>
      </g>
    </svg>
  );
};

export default FillSvg;
