import React from "react";

const NavChildOption = ({ item }) => {
  function replace() {
    const result = item
      .toLowerCase()
      .replace(/-/g, "")
      .replace(/:/, "")
      .replace(/,/, "")
      .replace(/[ ,]+/g, "_");

    return result;
  }

  return (
    <div>
      <a className='nav-oep' href={`/t/${replace()}`}>
        {item.length > 18 ? item.slice(0, 18) + "..." : item}
      </a>
    </div>
  );
};

export default NavChildOption;
