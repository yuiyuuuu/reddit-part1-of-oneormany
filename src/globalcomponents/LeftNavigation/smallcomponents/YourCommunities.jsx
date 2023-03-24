import React from "react";
import { useDispatch } from "react-redux";

import { toggleCreateCommunity } from "../../../store/nav-createcommunity";

import DefaultCommunityIcon from "../../../components/communities/communitiessvg/DefaultCommunitiesIcon";

const YourCommunities = ({ auth, sortAlphabetically }) => {
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

      {auth.communities?.sort(sortAlphabetically).map((community) => (
        <a className='ln-sub' href={`/r/${community.name}`}>
          <div className='ln-communityicon'>
            {community?.iconImage ? (
              <img
                className='ln-img'
                src={`data:image/png;base64,${community?.iconImage}`}
              />
            ) : (
              <DefaultCommunityIcon
                fillcolor={"#" + community.themeBaseColor}
                height={20}
                community={community}
              />
            )}
          </div>
          <span className='ln-des'>r/{community.name}</span>
        </a>
      ))}
    </div>
  );
};

export default YourCommunities;
