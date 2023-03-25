import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { toggleCreateCommunity } from "../../../store/nav-createcommunity";

import DefaultCommunityIcon from "../../../components/communities/communitiessvg/DefaultCommunitiesIcon";
import StarSvg from "../svg/StarSvg";

const YourCommunities = ({
  auth,
  sortAlphabetically,
  inputValue,
  favoriteIds,
  handleFavoriteCommunity,
}) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

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
        <div
          className='ln-sub'
          href={`/r/${community.name}`}
          style={{
            display: !showYourCommunities()
              ? "none"
              : inputValue.length > 0 &&
                !showYourCommunities()[community?.name] &&
                "none",
          }}
          onClick={() => nav(`/r/${community.name}`)}
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
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteCommunity(community.id);
            }}
            className='ln-star'
          >
            <StarSvg
              color={favoriteIds.includes(community?.id) ? "#0079d3" : ""}
              stroke={favoriteIds.includes(community?.id) ? true : false}
              idv={community.id}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default YourCommunities;
