import React from "react";

const NavMapOE = ({ item, auth }) => {
  return (
    <div
      className='nav-m'
      style={{ border: !auth?.id && "none", marginBottom: !auth?.id && 0 }}
    >
      {item.map((v) => (
        <div className='nav-oe' style={{ paddingLeft: "52px" }}>
          {v}
        </div>
      ))}
    </div>
  );
};

export default NavMapOE;
