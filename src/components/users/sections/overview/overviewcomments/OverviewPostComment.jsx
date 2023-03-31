import React from "react";
import OverviewPostCommentList from "./OverviewPostCommentList";

import "./ov.scss";
import { useNavigate } from "react-router";

const OverviewPostComment = ({ object, top, post, level }) => {
  const nav = useNavigate();

  return (
    <div
      className='ov-comment'
      style={{
        borderTop: top && "2px solid #edeff1",
        paddingBottom: top && "8px",
      }}
    >
      <div className='ov-c'>
        <div className='ov-divider' />
        <div
          className='ov-inner'
          style={{
            backgroundColor:
              object.data.user.id === post.user.id && "rgba(0,121,211,.05)",
          }}
        >
          <div className='ov-row'>
            <div
              onClick={() => nav(`/user/${object.data.user.name}`)}
              className='ov-username'
            >
              {object.data.user.name}
            </div>

            <div
              className='ov-op'
              style={{
                display: post.user.id !== object.data.user.id && "none",
              }}
            >
              OP
            </div>

            <div className='ov-vote'>
              {object.data.upvotes.length - object.data.downvotes.length} point
            </div>

            <div className='ov-dot'>•</div>

            <div className='ov-time'>1 day ago</div>
          </div>
          <span className='ov-message'>{object.data.message}</span>

          <div className='ov-reply'>
            <div className='ov-re'>Reply</div>
            <div className='ov-re'>Share</div>
          </div>
        </div>
      </div>

      {object.children && (
        <OverviewPostCommentList
          top={false}
          object={object.children}
          post={post}
          level={level + 1}
        />
      )}
    </div>
  );
};

export default OverviewPostComment;
