import React from "react";
import { useDispatch } from "react-redux";

const XIconIdColor = ({ color, size, id, f, v, dis }) => {
  const dispatch = useDispatch();
  return (
    <svg
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fill: color,
        cursor: "pointer",
      }}
      id={`x-${id}`}
      onClick={() => (f && dis ? dispatch(f(v)) : f(v))}
    >
      <polygon
        fill='inherit'
        points='11.649 9.882 18.262 3.267 16.495 1.5 9.881 8.114 3.267 1.5 1.5 3.267 8.114 9.883 1.5 16.497 3.267 18.264 9.881 11.65 16.495 18.264 18.262 16.497'
      ></polygon>
    </svg>
  );
};

export default XIconIdColor;
