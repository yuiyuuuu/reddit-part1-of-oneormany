import React from "react";
import "./nav.scss";
import RedditIcon from "./navsvgs/RedditIcon";
import RedditName from "./navsvgs/RedditName";

const Nav = () => {
  return (
    <div className="nav-parent">
      <div className="nav-1">
        <RedditIcon />
        <RedditName />
      </div>
    </div>
  );
};

export default Nav;
