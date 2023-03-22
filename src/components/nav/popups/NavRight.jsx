import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../../store/auth";

import $ from "jquery";

import AuthIconNoHover from "../navsvgs/rightoverlay/authicon/AuthIconNoHover";
import AuthIconHovered from "../navsvgs/rightoverlay/authicon/AuthIconHovered";
import AdHovered from "../navsvgs/rightoverlay/advertise/AdHovered";
import AdNoHover from "../navsvgs/rightoverlay/advertise/AdNoHover";
import TermsNotHovered from "../navsvgs/rightoverlay/termsandpolicy/TermsNotHovered";
import TermsHovered from "../navsvgs/rightoverlay/termsandpolicy/TermsHovered";
import MoreNotHovered from "../navsvgs/rightoverlay/more/MoreNoHover";
import MoreHovered from "../navsvgs/rightoverlay/more/MoreHovered";
import HelpNoHover from "../navsvgs/rightoverlay/help/HelpNoHover";
import HelpHovered from "../navsvgs/rightoverlay/help/HelpHovered";
import NmodeNotHovered from "../navsvgs/rightoverlay/nightmode/NmodeNotHovered";
import NmodeHovered from "../navsvgs/rightoverlay/nightmode/NmodeHovered";
import MyStuff from "../navsvgs/rightoverlay/loggedin/MyStuff";
import ViewOptions from "../navsvgs/rightoverlay/loggedin/ViewOptions";

const NavRight = ({
  showWhenLoggedIn,
  showWhenNoLogin,
  showRightOverlay,
  setShowRightOverlay,
}) => {
  const dispatch = useDispatch();

  const authstate = useSelector((state) => state.auth);

  const clickout = useCallback(() => {
    var $target = $(event.target);
    if (
      !$target.closest(".nav-rightoverlay").length &&
      $(".nav-rightoverlay").is(":visible") &&
      !$target.closest(".userprofile-nav").length
    ) {
      setShowRightOverlay(false);
    }
  }, []);

  $(document).off("click", document, clickout).click(clickout);

  return (
    <div
      className='nav-rightoverlay'
      style={{ display: showRightOverlay ? "flex" : "none" }}
    >
      {/* LOGGED IN */}
      <div className='nav-c' style={{ padding: "8px 8px 8px 0" }}>
        <div className='nav-q'>
          <div className='nav-section'>
            <MyStuff />
            <span className='nav-p'>My Stuff</span>
          </div>

          <div className='nav-o'>
            <span>Online Status</span>
          </div>

          <a className='nav-o' href={`/u/${authstate.name}`}>
            <span>Profile</span>
          </a>

          <div className='nav-o'>
            <span>Create Avatar</span>
          </div>

          <div className='nav-o' style={{ marginBottom: "12px" }}>
            <span>User Settings</span>
          </div>

          <div className='nav-div' style={{ margin: 0 }} />
        </div>

        <div className='nav-q'>
          <div className='nav-section'>
            <ViewOptions />
            <span className='nav-p'>View Options</span>
          </div>

          <div className='nav-o'>
            <span>Mod Mode</span>
          </div>

          <div className='nav-o'>
            <span>Dark Mode</span>
          </div>
        </div>
      </div>

      {/*NOT LOGGED IN */}
      {!authstate?.id && (
        <div className='nav-c'>
          <a className='nav-opt' id='nav-nmode'>
            <div className='nav-d2'>
              <NmodeNotHovered />
            </div>
            <div className='nav-d1'>
              <NmodeHovered />
            </div>
            <span className='nav-opttext'>Dark Mode</span>
          </a>

          <a className='nav-opt' id='nav-help'>
            <div className='nav-d2'>
              <HelpNoHover />
            </div>
            <div className='nav-d1'>
              <HelpHovered />
            </div>
            <span className='nav-opttext'>Help Center</span>
          </a>

          <a className='nav-opt' id='nav-more'>
            <div className='nav-d2'>
              <MoreNotHovered />
            </div>
            <div className='nav-d1'>
              <MoreHovered />
            </div>
            <span className='nav-opttext'>More</span>
          </a>

          <a className='nav-opt' id='nav-terms'>
            <div className='nav-d2'>
              <TermsNotHovered />
            </div>

            <div className='nav-d1'>
              <TermsHovered />
            </div>

            <span className='nav-opttext'>Terms & Policies</span>
          </a>

          <a className='nav-opt' role='button' id='nav-ad'>
            <div className='nav-d2'>
              <AdNoHover />
            </div>

            <div className='nav-d1'>
              <AdHovered />
            </div>
            <span className='nav-opttext'>Advertise on Reddit</span>
          </a>

          <div className='nav-div'></div>

          <a
            className='nav-opt nav-rightoverlayhover'
            role='button'
            style={{
              display: showWhenNoLogin("flex"),
            }}
            id='nav-logout'
            href='/login'
          >
            <div className='nav-d1'>
              <AuthIconHovered />
            </div>
            <div className='nav-d2'>
              <AuthIconNoHover />
            </div>

            <span className='nav-opttext'>Log In / Sign Up</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default NavRight;

/**      
<button
className='nav-logout nav-rightoverlayhover'
style={{ display: showWhenLoggedIn("flex") }}
>
<LogoutIcon />
<span className='nav-logouttext' onClick={() => dispatch(logout())}>
  Logout
</span>
</button> */
