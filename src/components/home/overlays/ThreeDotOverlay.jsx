import React from "react";
import { useSelector } from "react-redux";

import ClipSvg from "../posts/postssvgs/ClipSvg";
import EmbedSvg from "../posts/postssvgs/EmbedSvg";
import AwardSvg2 from "../posts/postssvgs/AwardSvg2";
import HideSvg from "../posts/postssvgs/HideSvg";
import SaveSvg2 from "../posts/postssvgs/SaveSvg2";
import ReportSvg from "../posts/postssvgs/ReportSvg";

const ThreeDotOverlay = () => {
  const threeState = useSelector((state) => state.threeDotOverlay);
  return (
    <div
      className='shareoverlay-container'
      id='tdot-overlay'
      style={{
        display: !threeState.display && "none",
        top: threeState.top + threeState.scroll,
        left: threeState.left,
      }}
    >
      <div
        className='shareoverlay-inner tdot-award'
        style={{ borderTop: "none" }}
      >
        <AwardSvg2 />
        <span className='text-shareoverlay'>Give Award</span>
      </div>
      <div className='shareoverlay-inner tdot-share'>
        <ClipSvg />
        <span className='text-shareoverlay'>Copy Link</span>
      </div>
      <div className='shareoverlay-inner tdot-share'>
        <EmbedSvg />
        <span className='text-shareoverlay'>Embed</span>
      </div>
      <div className='shareoverlay-inner tdot-save'>
        <SaveSvg2 />
        <span className='text-shareoverlay'>Save</span>
      </div>

      <div className='shareoverlay-inner'>
        <HideSvg />
        <span className='text-shareoverlay'>Hide</span>
      </div>
      <div className='shareoverlay-inner'>
        <ReportSvg />
        <span className='text-shareoverlay'>Report</span>
      </div>
    </div>
  );
};

export default ThreeDotOverlay;
