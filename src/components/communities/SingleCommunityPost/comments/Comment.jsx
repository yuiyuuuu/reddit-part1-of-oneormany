import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DownVoteSvg from "../../../home/posts/postssvgs/arrowicons/DownVoteSvg";
import UpVoteSvg from "../../../home/posts/postssvgs/arrowicons/UpVoteSvg";
import "./comments.scss";
import CommentsList from "./CommentsList";

const Comment = ({ comment, commentsMap, top, post }) => {
  const authState = useSelector((state) => state.auth);
  console.log(comment);

  return (
    <div>
      <div>
        <div className='comment-parent' style={{ marginTop: top && "16px" }}>
          <a className='comment-icon' href={`/user/${comment.user.name}`}>
            <img
              src={
                comment.user?.photo
                  ? `data:image/png;base64,${comment?.user.photo}`
                  : "/assets/defaultpfp.png"
              }
              className='comment-pfp'
            />
          </a>

          <div className='comment-right'>
            <div className='comment-username'>
              <a href={`/user/${comment.user.name}`} className='comment-u'>
                {comment.user.name}
              </a>
              <span
                style={{
                  marginLeft: "4px",
                  display: comment.user.id === post?.userId ? "" : "none",
                  color: "#0079D3",
                }}
              >
                OP
              </span>

              <div className='dot-posts'>•</div>

              <div className='comment-time'>1 day ago</div>
            </div>

            <div className='comment-body'>{comment?.message}</div>
            <div className='comment-bottomrow'>
              <div className='comment-votesrow'>
                <div className='comment-voteicon'>
                  <UpVoteSvg
                    id={comment.id}
                    post={comment}
                    authState={authState}
                  />
                </div>
                <div className='comment-votecount'>
                  {comment.upvotes.length - comment.downvotes.length}
                </div>
                <div className='comment-voteicon'>
                  <DownVoteSvg />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {commentsMap[comment.id] && (
        <CommentsList
          comments={commentsMap[comment.id]}
          which={comment?.id}
          top={false}
        />
      )}
    </div>
  );
};

export default Comment;
