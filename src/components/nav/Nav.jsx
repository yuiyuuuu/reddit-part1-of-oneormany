import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { dispatchSetLeftNavState } from "../../globalcomponents/LeftNavigation/leftnavigationstates";

import "./nav.scss";

import $ from "jquery";

import { locations } from "../../store/nav/locationsobj";

import PopularIcon from "./navsvgs/PopularIcon";
import CoinsIconSvg from "./navsvgs/CoinsIconSvg";
import MessageIconSvg from "./navsvgs/MessageIconSvg";
import BellIconSvg from "./navsvgs/BellIconSvg";
import PlusSvgIcon from "./navsvgs/PlusSvgIcon";
import AdvertiseIconSvg from "./navsvgs/AdvertiseIconSvg";
import DownArrowPfp from "./navsvgs/DownArrowPfp";
import NotLoggedInPfp from "./navsvgs/NotLoggedInPfp";
import DownArrowCommunities from "./navsvgs/DownArrowCommunities";
import RedditIcon from "./navsvgs/RedditIcon";
import RedditName from "./navsvgs/RedditName";
import SearchIconSvg from "./navsvgs/SearchIconSvg";
import NavRight from "./popups/NavRight";
import LeftNavigationOverlay from "../../globalcomponents/LeftNavigation/LeftNavigationOverlay";
import DefaultCommunitiesIcon from "../communities/communitiessvg/DefaultCommunitiesIcon";
import ToggleLeftNavSvg from "./navsvgs/ToggleLeftNavSvg";

const Nav = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const communityStylingState = useSelector((state) => state.communityStyling);
  const selectedPost = useSelector((state) => state.selectedPost);
  const lnState = useSelector((state) => state.lnState);
  const navLocation = useSelector((state) => state.navLocation);

  let Component = locations[navLocation?.image];
  const [rerender, setRerender] = useState(1);

  const [showRightOverlay, setShowRightOverlay] = useState(false);
  const [showLeftNavOverlay, setShowLeftNavOverlay] = useState(false);

  const [show, setShow] = useState(true);

  //block display when user is not logged in
  function showWhenNoLogin(v) {
    if (!authState.id) {
      return v;
    } else {
      return "none";
    }
  }

  //block display when user is logged in
  function showWhenLoggedIn(v) {
    if (authState.id) {
      return v;
    } else {
      return "none";
    }
  }

  function textFocusChangeBGColor() {
    $(".input-search").focus(() => {
      $(".nav-3-searchinner").css("background-color", "#ffffff");
      $(".overlay-nav-search").css("border", "1px solid #0079d3 ");
      $(".input-search").focusout(() => {
        $(".nav-3-searchinner").css("background-color", "#f6f7f8");
        $(".overlay-nav-search").css("border", "none ");
      });
    });
  }

  useEffect(() => {
    const v = document
      .getElementsByClassName("nav-2-communities")[0]
      .getBoundingClientRect();
    $(".nav-communitiesoverlay").css("left", v.left + "px");
  }, []);

  useEffect(() => {
    textFocusChangeBGColor();
  }, []);

  useEffect(() => {
    setShowLeftNavOverlay(false);
  }, [window.location.href]);

  return (
    <div
      className='nav-parent'
      style={{
        display:
          (location.pathname === "/login" ||
            location.pathname === "/signup" ||
            location.pathname === "/test" ||
            !show) &&
          "none",
        marginLeft: communityStylingState && "284px",
        width: communityStylingState && "calc(100% - 284px)",
      }}
    >
      {/* the point of this hide element is so for the /about/:section. The navbar usually shows up before we can hide it so we use this to cover it and then remove it once the page loads*/}
      <div
        className='hide'
        style={{
          display:
            (location.pathname.slice(0, 2) !== "/r" || selectedPost?.id) &&
            "none",
        }}
      />

      <div className='nav-inner-1'>
        <a className='nav-1' href='/'>
          <RedditIcon />
          <RedditName />
        </a>

        <div
          className='nav-2-communities'
          onClick={() => {
            if (!lnState) {
              setShowLeftNavOverlay((prev) => !prev);
            }
          }}
          style={{
            border: showLeftNavOverlay && "#edeff1 1px solid",
            pointerEvents: lnState && "none",
          }}
        >
          <button className='nav-2-button'>
            {Component && (
              <div className='nav-ic'>
                <Component />
              </div>
            )}

            {navLocation?.community && (
              <div className='nav-ic'>
                {navLocation.community?.iconImage ? (
                  <img
                    className='nav-cmimg'
                    src={`data:image/png;base64,${navLocation.community?.iconImage}`}
                  />
                ) : (
                  <DefaultCommunitiesIcon
                    fillcolor={`#${navLocation.community.themeBaseColor}`}
                    height={20}
                    community={navLocation.community}
                  />
                )}
              </div>
            )}
            <span className='community-nav'>{navLocation?.name}</span>
            <span
              className='nav-togleft'
              style={{ display: (lnState || !showLeftNavOverlay) && "none" }}
              onClick={() => {
                dispatch(dispatchSetLeftNavState(true));
                window.localStorage.setItem("lnstate", true);
              }}
            >
              <ToggleLeftNavSvg />
            </span>
            <span style={{ display: lnState && "none" }}>
              <DownArrowCommunities />
            </span>
          </button>
        </div>

        <div className='nav-3-search'>
          <div className='nav-3-searchinner'>
            <div style={{ marginLeft: "15px", marginRight: "9px" }}>
              <SearchIconSvg />
            </div>
            <input placeholder='Search Reddit' className='input-search' />
            <div className='overlay-nav-search'></div>
          </div>
        </div>
      </div>

      {authState?.id || window.localStorage.getItem("token") ? (
        <div className='nav-inner2'>
          <div className='nav-twoicons'>
            <div className='icon-container'>
              <PopularIcon />
            </div>

            <div
              className='icon-container'
              style={{
                marginLeft: "8px",
              }}
            >
              <CoinsIconSvg />
            </div>
          </div>
          <div className='nav-inner2-child'>
            <div className='icon-container'>
              <MessageIconSvg />
            </div>

            <div className='icon-container' style={{ marginLeft: "8px" }}>
              <BellIconSvg />
            </div>

            <div className='icon-container' style={{ marginLeft: "8px" }}>
              <PlusSvgIcon />
            </div>

            <div className='nav-advertise-icon'>
              <AdvertiseIconSvg />
              <div className='advertise-word'>Advertise</div>
            </div>

            <div
              className='userprofile-nav'
              onClick={() => {
                setShowLeftNavOverlay(false);
                setShowRightOverlay((prev) => !prev);
              }}
            >
              <div className='pfp-container'>
                <img
                  src={authState?.image || "/assets/defaultpfp.png"}
                  className='pfp-nav'
                  style={{ padding: "4px 0px" }}
                />
              </div>

              <div className='text-container-nav'>
                <div className='profile-name desc-nav'>{authState.name}</div>
                <div className='profile-karma desc-nav'>Karma</div>
              </div>

              <DownArrowPfp idv={2} />

              <div className='overlay-hover-profile' />
            </div>
          </div>
        </div>
      ) : (
        <div className='nav-inner2'>
          <a className='nav-signupbutton' href='/signup'>
            Sign Up
          </a>
          <a className='nav-loginbutton' href='/login'>
            Log In
          </a>

          <div
            className='userprofile-nav'
            style={{ marginLeft: "8px" }}
            onClick={() => {
              setShowLeftNavOverlay(false);
              setShowRightOverlay((prev) => !prev);
            }}
          >
            <div className='pfp-container'>
              <NotLoggedInPfp />
            </div>

            <DownArrowPfp idv={1} />

            <div className='overlay-hover-profile' />
          </div>
        </div>
      )}

      <NavRight
        showWhenLoggedIn={showWhenLoggedIn}
        showWhenNoLogin={showWhenNoLogin}
        showRightOverlay={showRightOverlay}
        setShowRightOverlay={setShowRightOverlay}
      />

      <LeftNavigationOverlay
        display={showLeftNavOverlay}
        setDisplay={setShowLeftNavOverlay}
      />
    </div>
  );
};

export default Nav;
