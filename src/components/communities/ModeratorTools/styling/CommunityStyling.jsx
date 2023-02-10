import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftArrowStyling from "../modtoolssvgs/LeftArrowStyling";
import RightArrow from "../modtoolssvgs/RightArrow";
import XSvgStyling from "../modtoolssvgs/XSvgStyling";
import Banner from "./banner/Banner";
import ColorTheme from "./colortheme/ColorTheme";
import "./communitystyling.scss";
import NameIcon from "./nameicon/NameIcon";

import $ from "jquery";
import { toggleDiscard } from "../../../../store/discard/discardChanges";
import { setHrefPath } from "../../../../store/comstyling/hrefpath";

const CommunityStyling = () => {
  const dispatch = useDispatch();

  const communityStylingState = useSelector((state) => state.communityStyling);
  const communityState = useSelector((state) => state.postsindividualcommunity);
  const madeChanges = useSelector((state) => state.madeChange);
  const [selectedSection, setSelectedSection] = useState("");

  const pdefault = useCallback((e, v) => {
    e.preventDefault();
    dispatch(setHrefPath({ href: $(v).attr("href") }));
  }, []);

  const clickHandle = useCallback(
    (event) => {
      var $target = $(event.target);

      // if (!madeChanges) return;
      if (
        !$target.closest(".comstyling-parent").length &&
        $(".comstyling-parent").is(":visible") &&
        !$target.closest(".discard-parent").length &&
        !$target.parents(".comstyling-parent").length
      ) {
        if (madeChanges) {
          dispatch(toggleDiscard(true));
        } else {
          if (!$target.is("a") && !$target.is("button")) {
            window.location.href = `/r/${communityState.name}`;
          }
        }
      }
    },
    [madeChanges, communityState?.name]
  );

  const unload = useCallback(() => {
    return "";
  });

  useEffect(() => {
    $(document).ready(() => {
      const a = document.querySelectorAll("a");
      $(document).on("click", clickHandle);

      if (madeChanges) {
        Array.prototype.forEach.call(a, function (r) {
          $(r).on("click", (e) => pdefault(e, r)); //disables anchor from navigating
        });

        $(window).on("beforeunload", unload);
      } else {
        Array.prototype.forEach.call(a, function (r) {
          $(r).off("click", pdefault);
        });

        $(window).off("beforeunload", unload);
      }
    });
    // });

    return () => {
      $(document).off("click", clickHandle); //remove the event listener once we call this again. without this we will get discard popup when we click cancel
      $(window).off("beforeunload", unload);
      // Array.prototype.forEach.call(a, function (r) {
      //   $(r).off("click", pdefault);
      // });
    };
  }, [madeChanges, communityState.name, selectedSection]);

  return (
    <div>
      <div
        className='comstyling-parent'
        style={{ display: !communityStylingState && "none" }}
      >
        <div className='comstyling-inner'>
          <div className='comstyling-backrow'>
            <a
              className='comstyling-goback'
              href={`/${communityState.tag}/about/modqueue`}
            >
              <LeftArrowStyling />
              <div style={{ fontWeight: "400" }}>Back to mod tools</div>
            </a>
            <div className='grow' />
            <XSvgStyling communityState={communityState} />
          </div>

          {selectedSection === "" ? (
            <div>
              <div className='comstyling-appearance'>Appearance</div>

              <a
                className='comstyling-appearanceli'
                onClick={() => setSelectedSection("colortheme")}
              >
                Color theme
                <div className='grow' />
                <RightArrow />
              </a>

              <a
                className='comstyling-appearanceli'
                onClick={() => setSelectedSection("nameicon")}
              >
                Name & icon
                <div className='grow' />
                <RightArrow />
              </a>

              <a
                className='comstyling-appearanceli'
                onClick={() => setSelectedSection("banner")}
              >
                Banner
                <div className='grow' />
                <RightArrow />
              </a>

              <a className='comstyling-appearanceli'>
                Menu
                <div className='grow' />
                <RightArrow />
              </a>

              <a className='comstyling-appearanceli'>
                Posts
                <div className='grow' />
                <RightArrow />
              </a>
            </div>
          ) : selectedSection === "colortheme" ? (
            <ColorTheme
              community={communityState}
              setSelectedSection={setSelectedSection}
            />
          ) : selectedSection === "nameicon" ? (
            <NameIcon
              community={communityState}
              setSelectedSection={setSelectedSection}
            />
          ) : selectedSection === "banner" ? (
            <Banner
              community={communityState}
              setSelectedSection={setSelectedSection}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityStyling;
