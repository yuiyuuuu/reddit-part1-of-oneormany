import React from "react";
import NavTwo from "./NavTwo";

import { explore } from "./sectionobj";

//this one is only used for the explore section, as of right now

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
