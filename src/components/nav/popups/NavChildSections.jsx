import React from "react";
import NavTwo from "./NavTwo";

import { explore } from "./sectionobj";

const NavChildSections = () => {
  return (
    <div className='nav-m'>
      {explore.map((item) => (
        <NavTwo item={item} />
      ))}
    </div>
  );
};

export default NavChildSections;
