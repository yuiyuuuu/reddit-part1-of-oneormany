import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import {
  addCommunityToFavorite,
  removeCommunityToFavorite,
} from "../../store/auth";
import { dispatchSetLeftNavState } from "./leftnavigationstates";

import "./leftnav.scss";

import XIconIdColor from "../../globalsvg/XIconIdColor";
import ModQueue from "./svg/ModQueue";
import ModMail from "./svg/ModMail";
import DefaultCommunityIcon from "../../components/communities/communitiessvg/DefaultCommunitiesIcon";
import YourCommunities from "./smallcomponents/YourCommunities";
import Feeds from "./smallcomponents/Feeds";
import Other from "./smallcomponents/Other";
import StarSvg from "./svg/StarSvg";

const LeftNavigation = ({ lnState }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const authState = useSelector((state) => state.auth);

  const [inputValue, setInputValue] = useState("");

  const [favoriteIds, setFavoriteIds] = useState([]);

  function sortAlphabetically(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  function showModerating() {
    if (inputValue.length < 1) return {};

    const query = inputValue.toLowerCase();

    const result = {};

    if ("mod queue".includes(query)) {
      result.modqueue ||= true;
    }

    if ("modmail".includes(query)) {
      result.modmail ||= true;
    }

    if ("r/mod".includes(query)) {
      result.slashmod ||= true;
    }

    authState?.moderatorCommunities
      ?.concat(authState?.communityOwner)
      .forEach((community) => {
        if (
          community.name.toLowerCase().includes(query) ||
          community.tag.toLowerCase().includes(query)
        ) {
          result[community.name] = true;
        }
      });

    return Object.keys(result).length > 0 ? result : null;
  }

  function handleFavoriteCommunity(communityid) {
    const obj = {
      userid: authState?.id,
      communityid: communityid,
    };

    if (favoriteIds.includes(communityid)) {
      dispatch(removeCommunityToFavorite(obj));
    } else {
      dispatch(addCommunityToFavorite(obj));
    }
  }

  useEffect(() => {
    if (!authState?.id) return;
    const fav = authState?.favoriteCommunities;

    const result = fav.map((v) => v.id);

    setFavoriteIds(result);
  }, [authState?.favoriteCommunities]);

  return (
    <div
      className='ln-parent'
      style={{ display: (!lnState || !authState?.id) && "none" }}
    >
      <div
        className='ln-x'
        onClick={() => window.localStorage.setItem("lnstate", false)}
      >
        <XIconIdColor
          f={dispatchSetLeftNavState}
          v={false}
          color={"#878a8c"}
          size={20}
          dis={true}
          id='leftnav'
        />
      </div>

      <div className='ln-inner'>
        <div className='ln-input'>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Filter'
            className='ln-in'
          />
        </div>

        <div
          style={{
            display: authState?.favoriteCommunities?.length < 1 && "none",
          }}
        >
          <div className='ln-subtitle'>FAVORITES</div>

          {authState?.favoriteCommunities?.length > 0 &&
            authState?.favoriteCommunities?.map((community) => (
              <div
                className='ln-sub'
                style={{
                  display: !showModerating()
                    ? "none"
                    : inputValue.length > 0 &&
                      !showModerating()[community?.name] &&
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

        <div
          className='ln-subtitle'
          style={{
            display: !showModerating() && inputValue.length > 0 && "none",
          }}
        >
          MODERATING
        </div>
        <a
          className='ln-sub'
          href='/r/mod/about/modqueue'
          style={{
            display:
              inputValue.length > 0 && !showModerating()?.modqueue && "none",
          }}
        >
          <ModQueue idv='modqueue' />
          <span className='ln-des'>Mod Queue</span>
        </a>

        <div
          className='ln-sub'
          style={{
            display:
              inputValue.length > 0 && !showModerating()?.modmail && "none",
          }}
        >
          <ModMail idv={"modmail"} />
          <span className='ln-des'>Modmail</span>
        </div>

        <a
          className='ln-sub'
          href='/r/mod'
          style={{
            display:
              inputValue.length > 0 && !showModerating()?.slashmod && "none",
          }}
        >
          <ModQueue idv='slashmod' />
          <span className='ln-des'>r/Mod</span>
        </a>

        {authState?.moderatorCommunities
          ?.concat(authState?.communityOwner)
          .sort(sortAlphabetically)
          .map((community) => (
            <div
              className='ln-sub'
              style={{
                display: !showModerating()
                  ? "none"
                  : inputValue.length > 0 &&
                    !showModerating()[community?.name] &&
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

        <YourCommunities
          auth={authState}
          sortAlphabetically={sortAlphabetically}
          inputValue={inputValue}
          favoriteIds={favoriteIds}
          handleFavoriteCommunity={handleFavoriteCommunity}
          identify={"notoverlay"}
        />

        <Feeds inputValue={inputValue} identify={"notoverlay"} />

        <Other
          auth={authState}
          inputValue={inputValue}
          identify={"notoverlay"}
        />
      </div>
    </div>
  );
};

export default LeftNavigation;
