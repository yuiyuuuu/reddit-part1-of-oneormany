import React from "react";
import { useDispatch } from "react-redux";
import {
  dispatchSortBest,
  dispatchSortControversial,
  dispatchSortNew,
  dispatchSortOld,
  dispatchSortTop,
} from "../../../../store/comments/comments";

const SortCommentsListPopup = ({
  selectedSort,
  setSelectedSort,
  showCommentSortOverlay,
  setShowCommentSortOverlay,
}) => {
  const dispatch = useDispatch();

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
