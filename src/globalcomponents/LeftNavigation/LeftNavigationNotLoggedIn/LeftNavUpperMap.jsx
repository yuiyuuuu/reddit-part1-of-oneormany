import React, { useState } from "react";

import LeftNavNLMapSection from "./LeftNavNLMapSection";

const LeftNavUpperMap = ({ stuff }) => {
  const [show, setShow] = useState(false);

  const Component = stuff?.svg;

  return (
    <div>
      <div className='ln-sub' onClick={() => setShow((prev) => !prev)}>
        {stuff?.svg && <Component />}
        <span
          className='ln-des'
          style={{ marginLeft: "12px", maxWidth: "174px" }}
        >
          {stuff.name}
        </span>

        <div
          className='nav-caret lnnl-right'
          style={{ transform: show && "rotate(180deg)" }}
        />
      </div>

      {show && <LeftNavNLMapSection items={stuff.children} />}
    </div>
  );
};

export default LeftNavUpperMap;
