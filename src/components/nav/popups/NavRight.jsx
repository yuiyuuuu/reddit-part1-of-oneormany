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

const NavRight = ({
  showWhenLoggedIn,
  showWhenNoLogin,
  showRightOverlay,
  setShowRightOverlay,
}) => {
  const dispatch = useDispatch();

  const authstate = useSelector((state) => state.auth);

  const [isHoveredAuth, setIsHoveredAuth] = useState(false);
  const [isAdHovered, setIsAdHovered] = useState(false);
  const [isTermsHovered, setIsTermsHovered] = useState(false);
  const [isMoreHovered, setIsMoreHovered] = useState(false);
  const [isHelpHovered, setIsHelpHovered] = useState(false);
  const [isNmodeHovered, setIsNmodeHovered] = useState(false);

  const authHover = useCallback(() => {
    if ($("#nav-logout").is(":hover")) {
      setIsHoveredAuth(true);
    } else {
      setIsHoveredAuth(false);
    }
  }, []);

  const adHover = useCallback(() => {
    if ($("#nav-ad").is(":hover")) {
      setIsAdHovered(true);
    } else {
      setIsAdHovered(false);
    }
  }, []);

  const termsHover = useCallback(() => {
    if ($("#nav-terms").is(":hover")) {
      setIsTermsHovered(true);
    } else {
      setIsTermsHovered(false);
    }
  }, []);

  const moreHover = useCallback(() => {
    if ($("#nav-more").is(":hover")) {
      setIsMoreHovered(true);
    } else {
      setIsMoreHovered(false);
    }
  }, []);

  const helpHover = useCallback(() => {
    if ($("#nav-help").is(":hover")) {
      setIsHelpHovered(true);
    } else {
      setIsHelpHovered(false);
    }
  }, []);

  const nmodeHover = useCallback(() => {
    if ($("#nav-nmode").is(":hover")) {
      setIsNmodeHovered(true);
    } else {
      setIsNmodeHovered(false);
    }
  }, []);

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

  $("#nav-logout").off("hover", "#nav-logout", authHover).hover(authHover);
  $("#nav-ad").off("hover", "#nav-ad", adHover).hover(adHover);
  $("#nav-terms").off("hover", "#nav-terms", termsHover).hover(termsHover);
  $("#nav-more").off("hover", "#nav-more", moreHover).hover(moreHover);
  $("#nav-help").off("hover", "#nav-help", helpHover).hover(helpHover);
  $("#nav-nmode").off("hover", "#nav-nmode", nmodeHover).hover(nmodeHover);
  $(document).off("click", document, clickout).click(clickout);

  return (
    <div
      className='nav-rightoverlay'
      style={{ display: showRightOverlay ? "flex" : "none" }}
    >
      {/*NOT LOGGED IN */}
      {!authstate?.id && (
        <div className='nav-c'>
          <a className='nav-opt' id='nav-nmode'>
            {!isNmodeHovered ? <NmodeNotHovered /> : <NmodeHovered />}
            <span className='nav-opttext'>Dark Mode</span>
          </a>

          <a className='nav-opt' id='nav-help'>
            {!isHelpHovered ? <HelpNoHover /> : <HelpHovered />}
            <span className='nav-opttext'>Help Center</span>
          </a>

          <a className='nav-opt' id='nav-more'>
            {!isMoreHovered ? <MoreNotHovered /> : <MoreHovered />}
            <span className='nav-opttext'>More</span>
          </a>

          <a className='nav-opt' id='nav-terms'>
            {!isTermsHovered ? <TermsNotHovered /> : <TermsHovered />}
            <span className='nav-opttext'>Terms & Policies</span>
          </a>

          <a className='nav-opt' role='button' id='nav-ad'>
            {!isAdHovered ? <AdNoHover /> : <AdHovered />}
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
            {!isHoveredAuth ? <AuthIconNoHover /> : <AuthIconHovered />}
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
