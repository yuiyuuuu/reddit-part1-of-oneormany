import React from "react";
import ChatSvg from "./homesvgs/ChatSvg";
import ClipSvg2 from "./homesvgs/ClipSvg2";
import CrossPostSvg from "./homesvgs/CrossPostSvg";
import EmbedSvg from "./homesvgs/EmbedSvg";

const ShareOverlay = ({ showOverlay, overlayLeft, overlayTop }) => {
  return (
    <div
      className='shareoverlay-container'
      id='share-overlay'
      style={{
        display: showOverlay ? "" : "none",
        top: overlayTop,
        left: overlayLeft,
      }}
    >
      <div className='shareoverlay-inner' style={{ borderTop: "none" }}>
        <ClipSvg2 />
        <span className='text-shareoverlay'>Copy Link</span>
      </div>
      <div className='shareoverlay-inner'>
        <CrossPostSvg />
        <span className='text-shareoverlay'>Crosspost</span>
      </div>
      <div className='shareoverlay-inner'>
        <EmbedSvg />
        <span className='text-shareoverlay'>Embed</span>
      </div>
      <div className='shareoverlay-inner'>
        <ChatSvg />
        <span className='text-shareoverlay'>Share To Chat</span>
      </div>
    </div>
  );
};

export default ShareOverlay;
