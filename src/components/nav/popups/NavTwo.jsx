import React, { useState } from "react";

import NavChildOption from "./NavChildOption";

const NavTwo = ({ item }) => {
  const [active, setActive] = useState(false);

  return (
    <div>
      <div onClick={() => setActive((prev) => !prev)} className='nav-oe'>
        <span className='nav-mri' style={{ marginLeft: "32px" }}>
          {item.name}
        </span>

        <div
          className='nav-caret'
          style={{ transform: active && "rotate(-180deg)" }}
        />
      </div>
      <div
        style={{ display: !active && "none" }}
        className='nav-childoptionparent'
      >
        {item.children.map((v) => (
          <div>
            <NavChildOption item={v} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavTwo;
