import React from "react";
import { useSelector } from "react-redux";
import "./right.scss";

const Moderators = ({ community }) => {
  const bodyBrightness = useSelector((state) => state.bodyBrightness);
  return (
    <div>
      <div className='rightmod-parent'>
        <div
          className='rightmod-banner'
          id={`rightmod-banner-${community?.id}`}
          style={{
            backgroundColor: "#" + community.themeBaseColor,
            color: bodyBrightness === "dark" ? "rgb(252,252,252)" : "#7c7c7c",
          }}
        >
          <span>Moderators</span>
        </div>

        <div className='rightmod-second'>
          <div
            className='rightmod-message blueborder-button'
            id={`rightmod-message-${community.id}`}
            style={{
              border: "1px solid #" + community.themeHighlightColor,
              color: "#" + community.themeHighlightColor,
            }}
          >
            Message the mods
          </div>

          <div
            className='rightmod-modmap'
            style={{ color: "#" + community.themeHighlightColor }}
            id={`right-owner-${community?.id}`}
          >
            <span style={{ cursor: "pointer" }}>u/{community.owner?.name}</span>
          </div>
          {community?.moderators?.map((user) => (
            <div
              className='rightmod-modmap'
              style={{ color: "#" + community.themeHighlightColor }}
              id={`rightmod-modmap-${community?.id}`}
            >
              <span style={{ cursor: "pointer" }}>u/{user?.name}</span>
            </div>
          ))}

          <div className='rightmod-allmod'>
            <span
              className='rightmod-p'
              id={`rightmod-p-${community?.id}`}
              style={{ color: "#" + community.themeHighlightColor }}
            >
              VIEW ALL MODERATORS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moderators;
