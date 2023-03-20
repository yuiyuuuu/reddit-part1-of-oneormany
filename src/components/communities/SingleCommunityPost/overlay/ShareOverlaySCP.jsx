import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ChatSvg from "../../../home/homesvgs/ChatSvg";
import ClipSvg2 from "../../../home/homesvgs/ClipSvg2";
import CrossPostSvg from "../../../home/homesvgs/CrossPostSvg";
import EmbedSvg from "../../../home/homesvgs/EmbedSvg";

const ShareOverlaySCP = () => {
  const dispatch = useDispatch();
  const shareOverlayState = useSelector((state) => state.shareOverlayScp);

  const selectedPostLink = useSelector((state) => state.copyLink);

  function handleCopyLink() {
    navigator.clipboard.writeText(selectedPostLink);
  }

  return (
    <div
      className='shareoverlay-container'
      id='share-overlay'
      style={{
        display: !shareOverlayState?.display && "none",
        top: shareOverlayState?.top + shareOverlayState?.scroll,
        left: shareOverlayState?.left,
        zIndex: 2,
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

export default ShareOverlaySCP;
