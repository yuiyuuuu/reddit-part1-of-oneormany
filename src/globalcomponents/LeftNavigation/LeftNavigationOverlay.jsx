import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import {
  addCommunityToFavorite,
  removeCommunityToFavorite,
} from "../../store/auth";

import "./leftnav.scss";

import $ from "jquery";

import ModQueue from "./svg/ModQueue";
import ModMail from "./svg/ModMail";
import DefaultCommunityIcon from "../../components/communities/communitiessvg/DefaultCommunitiesIcon";
import YourCommunities from "./smallcomponents/YourCommunities";
import Feeds from "./smallcomponents/Feeds";
import Other from "./smallcomponents/Other";
import StarSvg from "./svg/StarSvg";

const LeftNavigationOverlay = ({ display, setDisplay }) => {
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

  function showFavorites() {
    if (inputValue.length < 1) return {};

    const result = {};
    const query = inputValue.toLowerCase();
    authState?.favoriteCommunities?.forEach((community) => {
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

  const clickout = useCallback(() => {
    var $target = $(event.target);

    if (
      !$target.closest("#nav-leftnav").length &&
      $("#nav-leftnav").is(":visible") &&
      !$target.closest(".nav-2-communities").length
    ) {
      setDisplay(false);
    }
  }, []);

  $(document).off("click", document, clickout).click(clickout);

  useEffect(() => {
    if (!authState?.id) return;
    const fav = authState?.favoriteCommunities;

    const result = fav.map((v) => v.id);

    setFavoriteIds(result);
  }, [authState?.favoriteCommunities]);

  useEffect(() => {
    $(document).ready(() => {
      $(".ln-in").focus();
    });
  }, []);

  useEffect(() => {
    const v = document
      .getElementsByClassName("nav-2-communities")[0]
      .getBoundingClientRect();
    $(".nav-communitiesoverlay").css("left", v.left + "px");
  }, []);

  return (
    <div>
      <div
        className='ln-parent nav-communitiesoverlay'
        id='nav-leftnav'
        style={{
          display: (!display || !authState?.id) && "none",
          maxHeight: "482px",
          borderRadius: "0 0 4px 4px",
        }}
      >
        <div className='ln-inner' style={{ height: "100%" }}>
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
              display:
                (authState?.favoriteCommunities?.length < 1 ||
                  !showFavorites()) &&
                "none",
            }}
          >
            <div className='ln-subtitle'>FAVORITES</div>

            {authState?.favoriteCommunities?.length > 0 &&
              authState?.favoriteCommunities?.map((community) => (
                <div
                  className='ln-sub'
                  style={{
                    display: !showFavorites()
                      ? "none"
                      : inputValue.length > 0 &&
                        !showFavorites()[community?.name] &&
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
                      color={
                        favoriteIds.includes(community?.id) ? "#0079d3" : ""
                      }
                      stroke={
                        favoriteIds.includes(community?.id) ? true : false
                      }
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
            <ModQueue idv='modqueue2' />
            <span className='ln-des'>Mod Queue</span>
          </a>

          <div
            className='ln-sub'
            style={{
              display:
                inputValue.length > 0 && !showModerating()?.modmail && "none",
            }}
          >
            <ModMail idv={"modmail2"} />
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
            <ModQueue idv='slashmod2' />
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
            identify={"overlay"}
          />

          <Feeds inputValue={inputValue} identify={"overlay"} />

          <Other
            auth={authState}
            inputValue={inputValue}
            identify={"overlay"}
          />
        </div>
      </div>
    </div>
  );
};

export default LeftNavigationOverlay;
