import React from "react";

import HomeIcon from "../svg/HomeIcon";
import PopularIcon from "../svg/PopularIcon";
import AllIcon from "../svg/AllIcon";

const Feeds = ({ inputValue, identify }) => {
  function showFeeds() {
    if (inputValue.length < 1) return {};

    const query = inputValue.toLowerCase();

    const result = {};

    if ("home".includes(query)) {
      result.home = true;
    }

    if ("popular".includes(query)) {
      result.popular = true;
    }

    if ("all".includes(query)) {
      result.all = true;
    }

    return Object.keys(result).length > 0 ? result : null;
  }
  return (
    <div>
      <div
        className='ln-subtitle'
        style={{
          display: !showFeeds() && inputValue.length > 0 && "none",
        }}
      >
        FEEDS
      </div>
      <div
        className='ln-sub'
        onClick={() => dispatch(toggleCreateCommunity(true))}
        style={{
          display: inputValue.length > 0 && !showFeeds()?.home && "none",
        }}
      >
        <HomeIcon idv={identify} />
        <span className='ln-des'>Home</span>
      </div>

      <div
        className='ln-sub'
        onClick={() => dispatch(toggleCreateCommunity(true))}
        style={{
          display: inputValue.length > 0 && !showFeeds()?.popular && "none",
        }}
      >
        <PopularIcon idv={identify} />
        <span className='ln-des'>Popular</span>
      </div>

      <div
        className='ln-sub'
        onClick={() => dispatch(toggleCreateCommunity(true))}
        style={{
          display: inputValue.length > 0 && !showFeeds()?.all && "none",
        }}
      >
        <AllIcon idv={identify} />
        <span className='ln-des'>All</span>
      </div>
    </div>
  );
};

export default Feeds;
