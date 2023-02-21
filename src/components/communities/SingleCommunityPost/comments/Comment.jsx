import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DownVoteSvg from "../../../home/posts/postssvgs/arrowicons/DownVoteSvg";
import UpVoteSvg from "../../../home/posts/postssvgs/arrowicons/UpVoteSvg";
import "./comments.scss";
import CommentsList from "./CommentsList";

import ToggleIcon from "./svgs/ToggleIcon";

import $ from "jquery";
import NoShow from "./noshow/NoShow";

import gsap from "gsap";
import {
  handleAddComment,
  handleCommentDownvote,
  handleCommentUpvote,
  handleRemoveCommentDownvote,
  handleRemoveCommentUpvote,
} from "../../../../store/posts-individualcommunity";
import ReplyIcon from "./svgs/ReplyIcon";

const Comment = ({ comment, commentsMap, top, post, level, idarr, margin }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const [show, setShow] = useState(true);
  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState("");

  function handleReply() {
    const obj = {
      message: reply,
      userId: authState.id,
      postId: post.id,
      parentId: comment.id,
    };

    dispatch(handleAddComment(obj)).then(() => {
      setShowReply(false);
      setReply("");
    });
  }

  function toggleShow() {
    if (show) {
      $(`#prev-${comment.id}`).css("display", "none");
      setShow(false);
    } else {
      $(`#prev-${comment.id}`).css("display", "");
      gsap.fromTo(`#icon-${comment.id}`, { x: 12 }, { x: 0, duration: 0.15 });
      gsap.fromTo(
        `#username-${comment.id}`,
        { x: 12 },
        { x: 0, duration: 0.15 }
      );
      setShow(true);
    }
  }

  function handleUpvote() {
    const obj = {
      postid: post?.id,
      userid: authState?.id,
      commentid: comment?.id,
    };

    if (comment.upvotes.includes(authState.id)) {
      dispatch(handleRemoveCommentUpvote(obj));
    } else {
      dispatch(handleCommentUpvote(obj));
    }
  }

  function handleDownvote() {
    const obj = {
      postid: post?.id,
      userid: authState?.id,
      commentid: comment?.id,
    };

    if (comment.downvotes.includes(authState.id)) {
      dispatch(handleRemoveCommentDownvote(obj));
    } else {
      dispatch(handleCommentDownvote(obj));
    }
  }

  useEffect(() => {
    $(`.${comment.id}`)
      .off()
      .hover(
        () => {
          $(`.${comment.id}`)
            .children("div")
            .css("background-color", "#0079D3");
        },
        () => {
          $(`.${comment.id}`).children("div").css("background-color", "");
        }
      );
  }, [commentsMap]);

  return (
    <div>
      <div id={comment.id}>
        <div
          className='comment-parent'
          style={{
            marginTop: top && "16px",
            padding: top && "8px 0 0 0px",
            display: !show && "none",
          }}
        >
          <div
            className={`threadline ${comment.id} comment-hoverc`}
            style={{ left: !top && 8 + 6 + "px" }}
            onClick={() => toggleShow()}
          >
            <div className='line'></div>
          </div>

          <a
            className='comment-icon'
            href={`/user/${comment.user.name}`}
            id={`icon-${comment.id}`}
          >
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
            <div className='comment-username' id={`username-${comment.id}`}>
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

            <div className='comment-body' style={{ display: !show && "none" }}>
              {comment?.message}
            </div>
            <div
              className='comment-bottomrow'
              style={{ display: !show && "none" }}
            >
              <div className='comment-votesrow'>
                <div
                  className='comment-voteicon comment-hover'
                  onClick={() => handleUpvote()}
                >
                  <UpVoteSvg
                    id={comment.id}
                    post={comment}
                    authState={authState}
                  />
                </div>
                <div
                  className='comment-votecount'
                  style={{
                    color: comment?.upvotes.includes(authState?.id)
                      ? "red"
                      : comment?.downvotes.includes(authState?.id)
                      ? "#7193ff"
                      : "",
                  }}
                >
                  {comment.upvotes.length - comment.downvotes.length}
                </div>
                <div
                  className='comment-voteicon comment-hover'
                  onClick={() => handleDownvote()}
                >
                  <DownVoteSvg
                    id={comment.id}
                    post={comment}
                    authState={authState}
                  />
                </div>
              </div>

              <button
                className='comment-rowreply comment-hover'
                onClick={() => setShowReply((prev) => !prev)}
              >
                <ReplyIcon />
                <span style={{ marginLeft: "6px" }}>Reply</span>
              </button>
            </div>

            <div
              className='comment-input'
              style={{ display: !showReply && "none" }}
            >
              <div className='comment-i-border'>
                <textarea
                  className='comment-m'
                  placeholder='What are your thoughts?'
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />

                <div className='comment-inputbot' onClick={() => handleReply()}>
                  <div className='bluebutton-button'>Reply</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NoShow
        comment={comment}
        post={post}
        func={toggleShow}
        display={show}
        idv={comment.id}
        top={top}
      />

      {commentsMap[comment.id] && (
        <CommentsList
          comments={commentsMap[comment.id]}
          which={comment?.id}
          top={false}
          level={level + 1}
          idarr={[...idarr, comment.id]}
          toggle={toggleShow}
          post={post}
          margin={margin}
        />
      )}
    </div>
  );
};

export default Comment;
