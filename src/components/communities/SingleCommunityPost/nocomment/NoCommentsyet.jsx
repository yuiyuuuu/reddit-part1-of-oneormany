import React from "react";
import "./nocomment.scss";
import NoCommentSvg from "./NoCommentSvg";

const NoCommentsyet = () => {
  return (
    <div>
      <div className='nocomment-parent'>
        <NoCommentSvg />
        <div style={{ opacity: 0.6, marginBottom: "12px" }}>
          No Comments Yet
        </div>
        <div style={{ opacity: 0.6, fontSize: "14px" }}>
          Be the first to share what you think!
        </div>
      </div>
    </div>
  );
};

export default NoCommentsyet;
