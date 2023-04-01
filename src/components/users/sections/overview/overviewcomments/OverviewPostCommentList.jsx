import React, { useEffect } from "react";
import OverviewPostComment from "./OverviewPostComment";

import $ from "jquery";

const OverviewPostCommentList = ({ top, object, post, level, idEquals }) => {
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
    <div className='ov-commentlistparent'>
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
