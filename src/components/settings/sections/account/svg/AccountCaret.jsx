import React from "react";

const AccountCaret = ({ color, size }) => {
  return (
    <svg
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
      style={{ fill: color, height: size, width: size }}
    >
      <path d='M14.17,9.35,10,13.53,5.83,9.35a.5.5,0,0,1,.35-.85h7.64a.5.5,0,0,1,.35.85'></path>
    </svg>
  );
};

export default AccountCaret;
