import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./comments.scss";
import CommentsList from "./CommentsList";

import $ from "jquery";
import NoShow from "./noshow/NoShow";

import gsap from "gsap";

import ReplyIcon from "./svgs/ReplyIcon";
import ThreeDot from "./svgs/ThreeDot";
import ModSvg from "./svgs/ModSvg";
import DistinguishSvg from "./svgs/DistinguishSvg";
import DownVoteSvg from "../../../home/posts/postssvgs/arrowicons/DownVoteSvg";
import UpVoteSvg from "../../../home/posts/postssvgs/arrowicons/UpVoteSvg";
import TextStylesReply from "./textstylescomponent/TextStylesReply";

import {
  handleAddComment,
  handleCommentDownvote,
  handleCommentUpvote,
  handleRemoveCommentDownvote,
  handleRemoveCommentUpvote,
} from "../../../../store/posts-individualcommunity";

import { dispatchSetAOS } from "../../../../globalcomponents/authoverlaysignup/authOverlaySignupStates";

const Comment = ({ comment, commentsMap, top, post, level, idarr, margin }) => {
  const dispatch = useDispatch();
  const styleRef = useRef();
  const authState = useSelector((state) => state.auth);

  const [show, setShow] = useState(true);
  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState("");

  function handleReply() {
    if (!authState?.id) {
      dispatch(dispatchSetAOS({ display: true, which: "comment" }));
      return;
    }

    if (!reply.length) return;
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
    if (!authState?.id) {
      dispatch(dispatchSetAOS({ display: true, which: "comment" }));
      return;
    }

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
    if (!authState?.id) {
      dispatch(dispatchSetAOS({ display: true, which: "comment" }));
      return;
    }

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
    $(document).ready(() => {
      $(".comment-m").focus(() => {
        $(".comment-m")
          .parents(".comment-i-border")
          .css("border", "1px solid #1a1a1b");
      });

      $(".comment-m").focusout(() => {
        $(".comment-m")
          .parents(".comment-i-border")
          .css("border", "1px solid #edeff1");
      });
    });
  }, []);

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
                style={{ marginRight: "4px" }}
              >
                <ReplyIcon />
                <span style={{ marginLeft: "6px" }}>Reply</span>
              </button>

              <button className='comment-hover comment-but'>Share</button>
              <button className='comment-hover comment-but comment-al'>
                <ThreeDot />
              </button>
              <button
                className='comment-hover comment-but'
                style={{ padding: "4px 4px" }}
              >
                <ModSvg />
              </button>

              <button
                className='comment-hover comment-but'
                style={{ padding: "4px 4px" }}
              >
                <DistinguishSvg />
              </button>
            </div>

            <div
              className='comment-input'
              style={{ display: !showReply && "none" }}
              ref={styleRef}
            >
              <div className='comment-i-border'>
                <textarea
                  className='comment-m'
                  placeholder='What are your thoughts?'
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />

                <div style={{ width: "100%" }}>
                  <div
                    className='comment-inputbot'
                    onClick={() => handleReply()}
                    id={`tsc-${comment?.id}-co`}
                  >
                    <TextStylesReply
                      idv={comment.id}
                      show={showReply}
                      reference={styleRef}
                      post={post}
                    />
                    <div className='grow' />
                    <button className='scp-markdown'>Markdown Mode</button>
                    <button
                      className='comment-replybutton2 comment-f'
                      onClick={() => {
                        setShowReply(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className='comment-replybutton comment-f'
                      style={{
                        cursor: !reply.length && "not-allowed",
                        filter: !reply.length && "grayscale(1)",
                      }}
                    >
                      Reply
                    </button>
                  </div>
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
