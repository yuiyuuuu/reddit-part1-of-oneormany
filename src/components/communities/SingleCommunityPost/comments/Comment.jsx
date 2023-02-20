import React, { useEffect, useState } from "react";
import "./comments.scss";
import CommentsList from "./CommentsList";

const Comment = ({ comment, commentsMap }) => {
  const [replies, setReplies] = useState(null);
  console.log(commentsMap[comment.id]);

  useEffect(() => {
    //replies
    // const child = commentsMap[comment.id];
    // if (child) {
    //   setReplies(child);
    // }

    setReplies("");
  }, []);

  //   console.log(replies, "repliessss");

  useEffect(() => {});
  return (
    <div>
      <div>{comment?.message}</div>
      {commentsMap[comment.id] && (
        <CommentsList comments={commentsMap[comment.id]} which={comment?.id} />
      )}
    </div>
  );
};

export default Comment;
