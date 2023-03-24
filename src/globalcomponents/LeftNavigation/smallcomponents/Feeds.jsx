import React from "react";

import HomeIcon from "../svg/HomeIcon";
import PopularIcon from "../svg/PopularIcon";
import AllIcon from "../svg/AllIcon";

const Feeds = () => {
  return (
    <div>
      <div className='ln-subtitle'>FEEDS</div>
      <div
        className='ln-sub'
        onClick={() => dispatch(toggleCreateCommunity(true))}
      >
        <HomeIcon />
        <span className='ln-des'>Home</span>
      </div>

      <div
        className='ln-sub'
        onClick={() => dispatch(toggleCreateCommunity(true))}
      >
        <PopularIcon />
        <span className='ln-des'>Popular</span>
      </div>

      <div
        className='ln-sub'
        onClick={() => dispatch(toggleCreateCommunity(true))}
      >
        <AllIcon />
        <span className='ln-des'>All</span>
      </div>
    </div>
  );
};

export default Feeds;
