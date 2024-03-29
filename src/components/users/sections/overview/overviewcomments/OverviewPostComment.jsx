import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import "./ov.scss";

import { timeConvert } from "../../../../../requests/timeConvert";
import { hoverUserInit } from "../../../../../requests/hoverInformation/hoverUserInitFunction";

import $ from "jquery";

import OverviewPostCommentList from "./OverviewPostCommentList";

const OverviewPostComment = ({ object, top, post, level, idEquals }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const time = timeConvert(object?.data?.createdAt);

  useEffect(() => {
    $(document).ready(() => {
      hoverUserInit(
        dispatch,
        `.hov-user-${object?.data?.id}-ovcommentch`,
        object?.data?.post,
        object?.data?.user?.id
      );
    });
  }, []);

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
              onClick={(e) => {
                e.stopPropagation();
                nav(`/user/${object.data.user.name}`);
              }}
              className={`ov-username hov-user-${object?.data?.id}-ovcommentch`}
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

            <div className='ov-time'>{time}</div>
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
