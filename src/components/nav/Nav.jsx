import React, { useEffect } from "react";
import "./nav.scss";
import DownArrowCommunities from "./navsvgs/DownArrowCommunities";
import RedditIcon from "./navsvgs/RedditIcon";
import RedditName from "./navsvgs/RedditName";
import SearchIconSvg from "./navsvgs/SearchIconSvg";

import $ from "jquery";

import PopularIcon from "./navsvgs/PopularIcon";
import CoinsIconSvg from "./navsvgs/CoinsIconSvg";
import MessageIconSvg from "./navsvgs/MessageIconSvg";
import BellIconSvg from "./navsvgs/BellIconSvg";
import PlusSvgIcon from "./navsvgs/PlusSvgIcon";
import AdvertiseIconSvg from "./navsvgs/AdvertiseIconSvg";
import DownArrowPfp from "./navsvgs/DownArrowPfp";

const Nav = () => {
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
    textFocusChangeBGColor();
  }, []);

  return (
    <div className='nav-parent'>
      <div className='nav-inner-1'>
        <a className='nav-1' href='/'>
          <RedditIcon />
          <RedditName />
        </a>

        <div className='nav-2-communities'>
          <button className='nav-2-button'>
            <span className='community-nav'>Placeholder community</span>
            <DownArrowCommunities />
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

          <div className='userprofile-nav'>
            <div className='pfp-container'>
              <img
                src='https://cdn.discordapp.com/attachments/779278654714675232/1039069016154718270/unknown.png'
                className='pfp-nav'
              />
            </div>

            <div className='text-container-nav'>
              <div className='profile-name desc-nav'>Name</div>
              <div className='profile-karma desc-nav'>Karma</div>
            </div>

            <DownArrowPfp />

            <div className='overlay-hover-profile' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
