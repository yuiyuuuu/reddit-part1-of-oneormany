import React from "react";
import { useDispatch } from "react-redux";

import { toggleCreateCommunity } from "../../../store/nav-createcommunity";

const YourCommunities = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className='ln-subtitle'>YOUR COMMUNITIES</div>
      <div
        className='ln-sub'
        onClick={() => dispatch(toggleCreateCommunity(true))}
      >
        <div className='ln-plus' />
        <span className='ln-des'>Create Community</span>
      </div>
    </div>
  );
};

export default YourCommunities;
