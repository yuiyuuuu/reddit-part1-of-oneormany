import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "./nav.scss";

import $ from "jquery";

import PopularIcon from "./navsvgs/PopularIcon";
import CoinsIconSvg from "./navsvgs/CoinsIconSvg";
import MessageIconSvg from "./navsvgs/MessageIconSvg";
import BellIconSvg from "./navsvgs/BellIconSvg";
import PlusSvgIcon from "./navsvgs/PlusSvgIcon";
import AdvertiseIconSvg from "./navsvgs/AdvertiseIconSvg";
import DownArrowPfp from "./navsvgs/DownArrowPfp";
import NotLoggedInPfp from "./navsvgs/NotLoggedInPfp";
import LogoutIcon from "./navsvgs/rightoverlay/LogoutIcon";
import DownArrowCommunities from "./navsvgs/DownArrowCommunities";
import RedditIcon from "./navsvgs/RedditIcon";
import RedditName from "./navsvgs/RedditName";
import SearchIconSvg from "./navsvgs/SearchIconSvg";
import LogoutIcon2 from "./navsvgs/rightoverlay/LogoutIcon2";

import { logout } from "../../store/auth";
import { sectionCheck } from "../communities/ModeratorTools/section";

const Nav = () => {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const communityStylingState = useSelector((state) => state.communityStyling);

  const [showRightOverlay, setShowRightOverlay] = useState(false);
  const [showCommunitiesOverlay, setShowCommunitiesOverlay] = useState(false);

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
      }}
    >
      {/* the point of this hide element is so for the /about/:section. The navbar usually shows up before we can hide it so we use this to cover it and then remove it once the page loads*/}
      <div
        className='hide'
        style={{ display: location.pathname.slice(0, 2) !== "/r" && "none" }}
      />

      <div
        className='nav-inner-1'
        style={{ flexGrow: communityStylingState && 0 }}
      >
        <a className='nav-1' href='/'>
          <RedditIcon />
          <RedditName />
        </a>

        <div
          className='nav-2-communities'
          onClick={() => {
            setShowRightOverlay(false);
            setShowCommunitiesOverlay((prev) => !prev);
          }}
        >
          <button className='nav-2-button'>
            <span className='community-nav'>Placeholder community</span>
            <DownArrowCommunities />
          </button>
        </div>

        <div
          className='nav-3-search'
          style={{ display: communityStylingState && "none" }}
        >
          <div className='nav-3-searchinner'>
            <div style={{ marginLeft: "15px", marginRight: "9px" }}>
              <SearchIconSvg />
            </div>
            <input placeholder='Search Reddit' className='input-search' />
            <div className='overlay-nav-search'></div>
          </div>
        </div>
      </div>
      {authState?.id ? (
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
                setShowCommunitiesOverlay(false);
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

              <DownArrowPfp />

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
              setShowCommunitiesOverlay(false);
              setShowRightOverlay((prev) => !prev);
            }}
          >
            <div className='pfp-container'>
              <NotLoggedInPfp />
            </div>

            <DownArrowPfp />

            <div className='overlay-hover-profile' />
          </div>
        </div>
      )}
      <div
        className='nav-rightoverlay'
        style={{ display: showRightOverlay ? "flex" : "none" }}
      >
        <div style={{ width: "100%", height: "100%", padding: "8px 0px" }}>
          {/* LOGGED IN */}
          <button
            className='nav-logout nav-rightoverlayhover'
            style={{ display: showWhenLoggedIn("flex") }}
          >
            <LogoutIcon />
            <span className='nav-logouttext' onClick={() => dispatch(logout())}>
              Logout
            </span>
          </button>

          {/*NOT LOGGED IN */}

          <a
            className='nav-logout nav-rightoverlayhover'
            role='button'
            style={{ display: showWhenNoLogin("flex") }}
            href='/login'
          >
            <LogoutIcon2 />
            <span className='nav-logouttext'>Log In / Sign Up</span>
          </a>
        </div>
      </div>
      <div
        className='nav-communitiesoverlay'
        style={{ display: showCommunitiesOverlay ? "block" : "none" }}
      >
        <div className='communitiesoverlay-section'>Feeds</div>
      </div>
    </div>
  );
};

export default Nav;
