import React from "react";

import ApproveSvg from "../../../communities/SingleCommunityPost/scpsvgs/ApproveSvg";
import RemoveSvg from "../../../communities/SingleCommunityPost/scpsvgs/RemoveSvg";
import SpamSvg from "../../../communities/SingleCommunityPost/scpsvgs/SpamSvg";
import ShieldSvg from "../../../communities/SingleCommunityPost/scpsvgs/ShieldSvg";
import ThreeDot from "../../../communities/SingleCommunityPost/scpsvgs/ThreeDot";

const UserPostModOptions = ({ post }) => {
  return (
    <div className='scp-modoptions'>
      <div className='scp-modrow'>
        <ApproveSvg id={post?.id} />
        <span className='scp-m up-te'>Approve</span>
      </div>

      <div className='scp-modrow'>
        <RemoveSvg id={post?.id} />
        <span className='scp-m up-te'>Remove</span>
      </div>

      <div className='scp-modrow'>
        <SpamSvg id={post?.id} />
        <span className='scp-m up-te'>Spam</span>
      </div>

      <div className='scp-modrow'>
        <ShieldSvg id={post?.id} />
      </div>

      <div
        className='scp-modrow threedot'
        id={`threedot-${post.id}`}
        style={{ padding: "2px 4px", height: "20px" }}
        onClick={() => {
          handleTDotClick();
          dispatch(
            setLinkToCopy(
              `${window.location.host}/r/${post.community.name}/comments/${post.id}`
            )
          );
        }}
      >
        <ThreeDot id={post?.id} />
      </div>
    </div>
  );
};

export default UserPostModOptions;
