import React from "react";
import OverviewPostCommentList from "./OverviewPostCommentList";

import "./ov.scss";
import { useNavigate } from "react-router";

const OverviewPostComment = ({ object, top, post, level, idEquals }) => {
  const nav = useNavigate();

  return (
    <div
      className='ov-comment'
      style={{
        borderTop: top && "2px solid #edeff1",
        paddingBottom: top && "8px",
        margin: !top && "0 0 0 8px",
      }}
    >
      <div className='ov-c'>
        <div className='ov-divider' />
        <div
          className='ov-inner'
          style={{
            backgroundColor: !idEquals
              ? object.data.user.id === post.user.id && "rgba(0,121,211,.05)"
              : object.data.user.id === idEquals && "rgba(0,121,211,.05)",
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
              {object.data.upvotes?.length - object.data.downvotes?.length}{" "}
              {Math.abs(
                object.data.upvotes?.length - object.data.downvotes?.length
              ) > 1
                ? "points"
                : "point"}
            </div>

            <div className='ov-dot'>•</div>

            <div className='ov-time'>1 day ago</div>
          </div>
          <span className='ov-message'>{object.data?.message}</span>

          {!idEquals
            ? object.data.user.id === post.user.id && (
                <div className='ov-reply'>
                  <div
                    className='ov-re'
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Reply
                  </div>
                  <div
                    className='ov-re'
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Share
                  </div>
                </div>
              )
            : object.data.user.id === idEquals && (
                <div className='ov-reply'>
                  <div
                    className='ov-re'
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Reply
                  </div>
                  <div
                    className='ov-re'
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Share
                  </div>
                </div>
              )}
        </div>
      </div>

      {object.children && (
        <OverviewPostCommentList
          top={false}
          object={object.children}
          post={post}
          level={level + 1}
          idEquals={idEquals}
        />
      )}
    </div>
  );
};

export default OverviewPostComment;
