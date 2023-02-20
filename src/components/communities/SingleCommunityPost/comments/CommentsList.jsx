import React from "react";
import "./comments.scss";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";

const CommentsList = ({ which, post, top }) => {
  const dispatch = useDispatch();
  const commentsState = useSelector((state) => state.comments);

  return (
    <div className='commentlist-parent' style={{ marginLeft: !top && "28px" }}>
      {commentsState[which]?.map((v) => (
        <Comment
          comment={v}
          commentsMap={commentsState}
          top={which === null ? true : false}
          post={post}
        />
      ))}
    </div>
  );
};

export default CommentsList;
