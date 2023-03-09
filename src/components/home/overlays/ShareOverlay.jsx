import React from "react";
import { useSelector } from "react-redux";
import ChatSvg from "../homesvgs/ChatSvg";
import ClipSvg2 from "../homesvgs/ClipSvg2";
import CrossPostSvg from "../homesvgs/CrossPostSvg";
import EmbedSvg from "../homesvgs/EmbedSvg";

import "./overlay.scss";

const ShareOverlay = () => {
  const selectedPostLink = useSelector((state) => state.copyLink);
  const shareOverlayState = useSelector((state) => state.shareOverlay);
  const scrollPosition = useSelector((state) => state.scrollPosition);

  function handleCopyLink() {
    navigator.clipboard.writeText(
      `${window.location.host}/r/${selectedPostLink.community.name}/comment/${selectedPostLink.id}`
    );
  }

  return (
    <div
      className='shareoverlay-container'
      id='share-overlay'
      style={{
        display: !shareOverlayState.display && "none",
        top: shareOverlayState.top + shareOverlayState.scroll,
        left: shareOverlayState.left,
      }}
    >
      <div
        className='shareoverlay-inner'
        style={{ borderTop: "none" }}
        onClick={() => handleCopyLink()}
      >
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
