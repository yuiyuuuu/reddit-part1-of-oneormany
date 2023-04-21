import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useParams } from "react-router";
import "./comments.scss";

import $ from "jquery";

import gsap from "gsap";

import ReplyIcon from "./svgs/ReplyIcon";
import ThreeDot from "./svgs/ThreeDot";
import ModSvg from "./svgs/ModSvg";
import DistinguishSvg from "./svgs/DistinguishSvg";
import DownVoteSvg from "../../../home/posts/postssvgs/arrowicons/DownVoteSvg";
import UpVoteSvg from "../../../home/posts/postssvgs/arrowicons/UpVoteSvg";
import TextStylesReply from "./textstylescomponent/TextStylesReply";
import NoShow from "./noshow/NoShow";
import CommentsList from "./CommentsList";

import { handleAddComment } from "../../../../store/scp/selectedPost";
import { dispatchSetAOS } from "../../../../globalcomponents/authoverlaysignup/authOverlaySignupStates";
import {
  handleCommentDownvote,
  handleCommentUpvote,
  handleRemoveCommentDownvote,
  handleRemoveCommentUpvote,
} from "../../../../store/comments/comments";
import {
  handleNewCommentDownvote,
  handleNewCommentUpvote,
  handleRemoveNewCommentDownvote,
  handleRemoveNewCommentUpvote,
} from "../../../../store/comments/newComments";
import { setLinkToCopy } from "../../../../store/shareoverlay/copyLink";
import { setOverlayState } from "../../../../store/postoverlays/shareOverlay";
import { setThreeState } from "../../../../store/postoverlays/threeDotOverlay";
import { setOverlayStateSCP } from "../../../../store/postoverlays/shareOverlayScp";
import { setThreeStateSCP } from "../../../../store/postoverlays/threeDotoverlaySCP";

const Comment = ({
  comment,
  commentsMap,
  top,
  post,
  level,
  idarr,
  margin,
  newComment,
  newComments,
  commentsState,
}) => {
  const dispatch = useDispatch();
  const styleRef = useRef();
  const authState = useSelector((state) => state.auth);
  const shareOverlayState = useSelector((state) => state.shareOverlay);
  const params = useParams();
  const scpState = useSelector((state) => state.scp);

  const match = useMatch({
    path: "/r/:id/comments/:postid/comment/:commentid",
  });

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

    dispatch(handleAddComment(obj)).then((res) => {
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
      dispatch(dispatchSetAOS({ display: true, which: "vote" }));
      return;
    }

    const obj = {
      postid: post?.id,
      userid: authState?.id,
      commentid: comment?.id,
    };

    if (newComment) {
      if (comment.upvotes?.map((v) => v.id)?.includes(authState.id)) {
        dispatch(handleRemoveNewCommentUpvote(obj));
      } else {
        dispatch(handleNewCommentUpvote(obj));
      }
    } else {
      if (comment.upvotes?.map((v) => v.id)?.includes(authState.id)) {
        dispatch(handleRemoveCommentUpvote(obj, comment.parentId));
      } else {
        dispatch(handleCommentUpvote(obj, comment.parentId));
      }
    }
  }

  function handleDownvote() {
    if (!authState?.id) {
      dispatch(dispatchSetAOS({ display: true, which: "vote" }));
      return;
    }

    const obj = {
      postid: post?.id,
      userid: authState?.id,
      commentid: comment?.id,
    };

    if (newComment) {
      if (comment.downvotes?.map((v) => v.id)?.includes(authState.id)) {
        dispatch(handleRemoveNewCommentDownvote(obj));
      } else {
        dispatch(handleNewCommentDownvote(obj));
      }
    } else {
      if (comment.downvotes?.map((v) => v.id)?.includes(authState.id)) {
        dispatch(handleRemoveCommentDownvote(obj, comment.parentId));
      } else {
        dispatch(handleCommentDownvote(obj, comment.parentId));
      }
    }
  }

  function handleShareClick() {
    dispatch(
      setLinkToCopy(
        `${window.location.host}/r/${post.community.name}/comments/${post.id}/comment/${comment.id}/?context=3`
      )
    );

    const scrollpos = window.scrollY;
    //if the one we clicked on was the same one as before, we set the display to none.
    if (shareOverlayState.id === comment.id && shareOverlayState.display) {
      if (scpState) {
        dispatch(setOverlayStateSCP({ display: false }));
        return;
      }

      dispatch(setOverlayState({ display: false }));

      return;
    } else if (
      shareOverlayState.id !== comment.id &&
      shareOverlayState.display
    ) {
      //if the one we clicked was not the one we clicked before, we keep the display active but set the top and left of the new one clicked
      const v = document
        .getElementById(`share-${comment.id}`)
        .getBoundingClientRect();

      if (scpState) {
        dispatch(
          setOverlayStateSCP({
            left: v.left,
            top: v.top + v.height - 48,
            id: comment.id,
            display: true,
            scroll: $(".scp-parent").scrollTop(),
          })
        );

        dispatch(setThreeStateSCP({ display: false }));
        return;
      }

      dispatch(
        setOverlayState({
          left: v.left,
          top: v.top + v.height,
          id: comment.id,
          display: true,
          scroll: scrollpos,
        })
      );
      return;
    }

    //else we just set the display to true and update id for next click

    const v = document
      .getElementById(`share-${comment.id}`)
      .getBoundingClientRect();

    if (scpState) {
      dispatch(
        setOverlayStateSCP({
          left: v.left,
          top: v.top + v.height - 48,
          id: comment.id,
          display: true,
          scroll: $(".scp-parent").scrollTop(),
        })
      );

      dispatch(setThreeStateSCP({ display: false }));
      return;
    }

    dispatch(
      setOverlayState({
        display: true,
        left: v.left,
        top: v.top + v.height,
        id: comment.id,
        scroll: scrollpos,
      })
    );
    dispatch(setThreeState({ display: false }));
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
            backgroundColor:
              (comment.id === params.commentid ||
                match?.params?.commentid === comment.id) &&
              "rgba(0,121,211,0.05)",
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
            href={`/user/${comment.user?.name}`}
            id={`icon-${comment?.id}`}
          >
            <img
              src={
                comment.user?.photo
                  ? `data:image/png;base64,${comment?.user?.photo}`
                  : "/assets/defaultpfp.png"
              }
              className='comment-pfp'
            />
          </a>

          <div className='comment-right'>
            <div className='comment-username' id={`username-${comment?.id}`}>
              <a href={`/user/${comment.user?.name}`} className='comment-u'>
                {comment.user?.name}
              </a>
              <span
                style={{
                  marginLeft: "4px",
                  display: comment.user?.id === post?.userId ? "" : "none",
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
                    color: comment?.upvotes?.includes(authState?.id)
                      ? "red"
                      : comment?.downvotes?.includes(authState?.id)
                      ? "#7193ff"
                      : "",
                  }}
                >
                  {comment.upvotes?.length - comment.downvotes?.length}
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

              <button
                className='comment-hover comment-but scp-share post-share'
                id={`share-${comment.id}`}
                onClick={() => handleShareClick()}
              >
                Share
              </button>
              <button className='comment-hover comment-but comment-al threedot'>
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
          commentsState={commentsState}
          newComments={newComments}
        />
      )}
    </div>
  );
};

export default Comment;
