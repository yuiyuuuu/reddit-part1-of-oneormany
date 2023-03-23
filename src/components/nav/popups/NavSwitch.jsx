import React from "react";

const NavSwitch = ({ condition }) => {
  return (
    <div
      className='nav-pill'
      style={{ background: condition ? "#24a0ed" : "rgba(26,26,27,0.1)" }}
    >
      <div
        className='nav-ball'
        style={{ right: condition && 0, left: !condition && 0 }}
      ></div>
    </div>
  );
};

export default NavSwitch;
