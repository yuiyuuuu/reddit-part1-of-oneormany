import React from "react";
import { useDispatch } from "react-redux";

import { toggleCreateCommunity } from "../../../store/nav-createcommunity";

import DefaultCommunityIcon from "../../../components/communities/communitiessvg/DefaultCommunitiesIcon";

const YourCommunities = ({ auth, sortAlphabetically, inputValue }) => {
  const dispatch = useDispatch();

  function showYourCommunities() {
    if (inputValue.length < 1) return {};

    const query = inputValue.toLowerCase();

    const result = {};

    if ("create community".includes(query)) {
      result.createcommunity = true;
    }

    auth.communities.forEach((community) => {
      if (
        community.name.toLowerCase().includes(query) ||
        community.tag.toLowerCase().includes(query)
      ) {
        result[community.name] = true;
      }
    });

    return Object.keys(result).length > 0 ? result : null;
  }

  return (
    <div>
      <div
        className='ln-subtitle'
        style={{
          display: !showYourCommunities() && inputValue.length > 0 && "none",
        }}
      >
        YOUR COMMUNITIES
      </div>
      <div
        className='ln-sub'
        onClick={() => dispatch(toggleCreateCommunity(true))}
        style={{
          display:
            inputValue.length > 0 &&
            !showYourCommunities()?.createcommunity &&
            "none",
        }}
      >
        <div className='ln-plus' />
        <span className='ln-des'>Create Community</span>
      </div>

      {auth.communities?.sort(sortAlphabetically).map((community) => (
        <a
          className='ln-sub'
          href={`/r/${community.name}`}
          style={{
            display: !showYourCommunities()
              ? "none"
              : inputValue.length > 0 &&
                !showYourCommunities()[community?.name] &&
                "none",
          }}
        >
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
