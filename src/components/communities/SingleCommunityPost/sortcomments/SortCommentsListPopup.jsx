import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchPushNewComments,
  dispatchSortBest,
  dispatchSortControversial,
  dispatchSortNew,
  dispatchSortOld,
  dispatchSortTop,
} from "../../../../store/comments/comments";
import { dispatchClearNewCommentState } from "../../../../store/comments/newComments";

import $ from "jquery";

const SortCommentsListPopup = ({
  selectedSort,
  setSelectedSort,
  showCommentSortOverlay,
  setShowCommentSortOverlay,
}) => {
  const dispatch = useDispatch();
  const newCommentState = useSelector((state) => state.newComments);

  const clickout = useCallback(() => {
    var $target = $(event.target);

    if (
      !$target.closest(".scl-parent").length &&
      $(".scl-parent").is(":visible") &&
      !$target.closest(".sc-sortby").length
    ) {
      setShowCommentSortOverlay(false);
    }
  }, []);

  $(document).off("click", document, clickout).click(clickout);

  return (
    <div>
      <div
        className='scl-parent'
        style={{ display: !showCommentSortOverlay && "none" }}
      >
        <div
          className='scl-sub'
          onClick={() => {
            setSelectedSort("Best");
            setShowCommentSortOverlay(false);
            if (newCommentState.length !== 0) {
              dispatch(dispatchPushNewComments(newCommentState));
              dispatch(dispatchClearNewCommentState());
            }
            dispatch(dispatchSortBest());
          }}
          style={{ color: selectedSort === "Best" && "#0079D3" }}
        >
          Best
        </div>
        <div
          className='scl-sub'
          onClick={() => {
            setSelectedSort("Top");
            setShowCommentSortOverlay(false);
            if (newCommentState.length !== 0) {
              dispatch(dispatchPushNewComments(newCommentState));
              dispatch(dispatchClearNewCommentState());
            }
            dispatch(dispatchSortTop());
          }}
          style={{ color: selectedSort === "Top" && "#0079D3" }}
        >
          Top
        </div>
        <div
          className='scl-sub'
          onClick={() => {
            setSelectedSort("New");
            setShowCommentSortOverlay(false);
            if (newCommentState.length !== 0) {
              dispatch(dispatchPushNewComments(newCommentState));
              dispatch(dispatchClearNewCommentState());
            }
            dispatch(dispatchSortNew());
          }}
          style={{ color: selectedSort === "New" && "#0079D3" }}
        >
          New
        </div>
        <div
          className='scl-sub'
          onClick={() => {
            setSelectedSort("Controversial");
            setShowCommentSortOverlay(false);
            if (newCommentState.length !== 0) {
              dispatch(dispatchPushNewComments(newCommentState));
              dispatch(dispatchClearNewCommentState());
            }
            dispatch(dispatchSortControversial());
          }}
          style={{ color: selectedSort === "Controversial" && "#0079D3" }}
        >
          Controversial
        </div>
        <div
          className='scl-sub'
          onClick={() => {
            setSelectedSort("Old");
            setShowCommentSortOverlay(false);
            if (newCommentState.length !== 0) {
              dispatch(dispatchPushNewComments(newCommentState));
              dispatch(dispatchClearNewCommentState());
            }
            dispatch(dispatchSortOld());
          }}
          style={{ color: selectedSort === "Old" && "#0079D3" }}
        >
          Old
        </div>
        <div
          className='scl-sub'
          onClick={() => {
            setSelectedSort("Q&A");
            setShowCommentSortOverlay(false);
            if (newCommentState.length !== 0) {
              dispatch(dispatchPushNewComments(newCommentState));
              dispatch(dispatchClearNewCommentState());
            }
          }}
          style={{ color: selectedSort === "Q&A" && "#0079D3" }}
        >
          Q&A
        </div>
      </div>
    </div>
  );
};

export default SortCommentsListPopup;
