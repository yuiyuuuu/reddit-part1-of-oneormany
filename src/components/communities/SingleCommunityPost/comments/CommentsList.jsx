import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setComments } from "../../../../store/comments/comments";
import Comment from "./Comment";

const CommentsList = ({ which }) => {
  const dispatch = useDispatch();
  const commentsState = useSelector((state) => state.comments);

  return (
    <div>
      {commentsState[which]?.map((v) => (
        <Comment comment={v} commentsMap={commentsState} />
      ))}
    </div>
  );
};

export default CommentsList;
