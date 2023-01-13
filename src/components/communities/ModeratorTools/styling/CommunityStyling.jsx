import React, { useState } from "react";
import { useSelector } from "react-redux";
import LeftArrowStyling from "../modtoolssvgs/LeftArrowStyling";
import RightArrow from "../modtoolssvgs/RightArrow";
import XSvgStyling from "../modtoolssvgs/XSvgStyling";
import ColorTheme from "./colortheme/ColorTheme";
import "./communitystyling.scss";

const CommunityStyling = () => {
  const communityStylingState = useSelector((state) => state.communityStyling);
  const communityState = useSelector((state) => state.postsindividualcommunity);

  const [selectedSection, setSelectedSection] = useState("");

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
              <div>Back to mod tools</div>
            </a>
            <div className='grow' />
            <XSvgStyling communityState={communityState} />
          </div>

          {selectedSection === "" ? (
            <div>
              <div className='comstyling-appearance'>Appearance</div>

              <div
                className='comstyling-appearanceli'
                onClick={() => setSelectedSection("colortheme")}
              >
                Color theme
                <div className='grow' />
                <RightArrow />
              </div>

              <div className='comstyling-appearanceli'>
                Name & icon
                <div className='grow' />
                <RightArrow />
              </div>

              <div className='comstyling-appearanceli'>
                Banner
                <div className='grow' />
                <RightArrow />
              </div>

              <div className='comstyling-appearanceli'>
                Menu
                <div className='grow' />
                <RightArrow />
              </div>

              <div className='comstyling-appearanceli'>
                Posts
                <div className='grow' />
                <RightArrow />
              </div>
            </div>
          ) : selectedSection === "colortheme" ? (
            <ColorTheme
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
