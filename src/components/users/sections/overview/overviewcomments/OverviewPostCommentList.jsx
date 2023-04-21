import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { setScp } from "../../../../../store/scp/scpConditional";
import { setSelectedPost } from "../../../../../store/scp/selectedPost";
import { handleSetPrevHref } from "../../../../../store/users/prevHrefBeforeOverlay";

import OverviewPostComment from "./OverviewPostComment";

import $ from "jquery";

const OverviewPostCommentList = ({ top, object, post, level, idEquals }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (top) {
      $(`#ov-${object.data.id}`).hover(
        () => {
          $(`#ov-${object.data.id}`).css("border", " 1px solid black");
        },
        () => {
          $(`#ov-${object.data.id}`).css("border", "1px solid transparent");
        }
      );
    }
  }, []);

  return (
    <div
      className='ov-commentlistparent'
      onClick={() => {
        if (!object.top) return;

        dispatch(setScp("user"));
        dispatch(setSelectedPost(post));
        dispatch(handleSetPrevHref(window.location.pathname));
        navigate(
          `/r/${post?.community?.name}/comments/${post?.id}/comment/${object.data.id}/?context=3`
        );
      }}
    >
      <div
        className='ov-commentlist'
        id={`ov-${object.data.id}`}
        style={{ border: !top && "none" }}
      >
        <OverviewPostComment
          object={object}
          top={top}
          post={post}
          level={0}
          idEquals={idEquals}
        />
      </div>

      {level > 0 && (
        <div className='ov-threadline'>
          <div className='ov-line'></div>
        </div>
      )}
    </div>
  );
};

export default OverviewPostCommentList;
