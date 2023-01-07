import React from "react";

const DownArrowColorThemeSquare = ({ display }) => {
  return (
    <svg
      viewBox='0 0 12 12'
      xmlns='http://www.w3.org/2000/svg'
      style={{
        transform: display && "rotate(180deg)",
      }}
      className='comstyling-downhover'
    >
      <g>
        <polygon
          fill='inherit'
          points='11.0584 4.0602 6.0292 9.0894 1 4.0602 2.0608 3 6.0292 6.9684 9.9982 3'
        ></polygon>
      </g>
    </svg>
  );
};

export default DownArrowColorThemeSquare;
