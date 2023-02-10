import React from "react";

const TrashCan = ({ deleteFunction }) => {
  return (
    <button
      style={{
        fill: "white",
        cursor: "pointer",
        display: "flex",
      }}
      onClick={() => deleteFunction()}
    >
      <svg
        class='_369jaOfOFcc4zl3BotOKV0'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 40 40'
        style={{ height: "16px", width: "16px" }}
      >
        <g>
          <g fill='inherit'>
            <polygon points='10,38.8 30,38.8 31.2,10.9 8.7,10.9'></polygon>
            <path d='M27.5,3.8H25c0-1.4-1.1-2.5-2.5-2.5h-5c-1.4,0-2.5,1.1-2.5,2.5h-2.5c-2.8,0-5,2.2-5,5h25C32.5,6,30.3,3.8,27.5,3.8z'></path>
          </g>
        </g>
      </svg>
    </button>
  );
};

export default TrashCan;
