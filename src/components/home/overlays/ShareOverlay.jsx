import React from "react";
import ChatSvg from "../homesvgs/ChatSvg";
import ClipSvg2 from "../homesvgs/ClipSvg2";
import CrossPostSvg from "../homesvgs/CrossPostSvg";
import EmbedSvg from "../homesvgs/EmbedSvg";

import "./overlay.scss";

const ShareOverlay = ({ showOverlay, overlayLeft, overlayTop, scrollPos }) => {
  return (
    <div
      className='shareoverlay-container'
      id='share-overlay'
      style={{
        display: showOverlay ? "" : "none",
        top: overlayTop + scrollPos,
        left: overlayLeft,
      }}
    >
      <div className='shareoverlay-inner' style={{ borderTop: "none" }}>
        <ClipSvg2 />
        <span className='text-shareoverlay2'>Copy Link</span>
      </div>
      <div className='shareoverlay-inner'>
        <CrossPostSvg />
        <span className='text-shareoverlay2'>Crosspost</span>
      </div>
      <div className='shareoverlay-inner'>
        <EmbedSvg />
        <span className='text-shareoverlay2'>Embed</span>
      </div>
      <div className='shareoverlay-inner'>
        <ChatSvg />
        <span className='text-shareoverlay2'>Share To Chat</span>
      </div>
    </div>
  );
};

export default ShareOverlay;
