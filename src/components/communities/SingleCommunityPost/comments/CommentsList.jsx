import React, { useEffect } from "react";
import "./comments.scss";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";

//note
//equation to center the threadline is (width of icon container / 2) - (width of line container /2)  + any padding on the left

//idarr is the array of ids for the current level
//level is how many times we have looped so far
//toggle is the function to toggle show

import $ from "jquery";

const CommentsList = ({ which, post, top, level, idarr, toggle, margin }) => {
  const dispatch = useDispatch();
  const commentsState = useSelector((state) => state.comments);

  useEffect(() => {
    if (level > 0) {
      $(`.${idarr[level - 1]}`)
        .off()
        .hover(
          () => {
            $(`.${idarr[level - 1]}`)
              .children("div")
              .css("background-color", "#0079D3");
          },
          () => {
            $(`.${idarr[level - 1]}`)
              .children("div")
              .css("background-color", "");
          }
        );
    }
  }, [commentsState]);

  return (
    <div
      className='commentlist-parent'
      style={{ paddingLeft: !top ? (level === 1 ? "16px" : "23px") : "" }}
      id={level && `prev-${idarr[level - 1]}`}
    >
      {commentsState[which]?.map((v) => (
        <Comment
          comment={v}
          commentsMap={commentsState}
          top={which === null ? true : false}
          post={post}
          level={level || 0}
          idarr={idarr || []}
          margin={margin ? margin + 7 : 16}
        />
      ))}

      {level > 0 && (
        <div
          className={`threadline ${idarr[level - 1]}`}
          style={{
            left: level === 1 ? "6px" : 8 + 6 + "px",
            height: "100%",
          }}
          onClick={() => toggle()}
        >
          <div className='line'></div>
        </div>
      )}
    </div>
  );
};

export default CommentsList;
