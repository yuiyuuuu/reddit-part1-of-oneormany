import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./post.scss";

import { communities } from "../newcommunities/newcommunitiesobj";

import $ from "jquery";

import CommentSvg from "./postssvgs/CommentSvg";
import AwardSvg from "./postssvgs/AwardSvg";
import ShareSvg from "./postssvgs/ShareSvg";
import ThreeDotSvg from "./postssvgs/ThreeDotSvg";
import UpVoteSvg from "./postssvgs/arrowicons/UpVoteSvg";
import DownVoteSvg from "./postssvgs/arrowicons/DownVoteSvg";
import SaveSvg from "./postssvgs/SaveSvg";

import {
  downvote,
  removeDownvote,
  removeUpvote,
  upvote,
} from "../../../store/posts";
import { useNavigate } from "react-router-dom";

//all posts
const Post = ({
  post,
  setOverlayTop,
  setOverlayLeft,
  setShowOverlay,
  setOverlayId,
  overlayId,
  showOverlay,
  setOverlayTop2,
  setOverlayLeft2,
  setShowOverlay2,
  setOverlayId2,
  overlayId2,
  showOverlay2,
  setScrollpos,
  authState,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleUpvote() {
    const info = {
      postid: post.id,
      userid: authState.id,
    };
    dispatch(upvote(info));
  }

  function handleDownvote() {
    const info = {
      postid: post.id,
      userid: authState.id,
    };

    dispatch(downvote(info));
  }

  function handleRemoveUpvote() {
    const info = {
      postid: post.id,
      userid: authState.id,
    };

    dispatch(removeUpvote(info));
  }

  function handleRemoveDownvote() {
    const info = {
      postid: post.id,
      userid: authState.id,
    };

    dispatch(removeDownvote(info));
  }

  function set() {
    if (overlayId === post.id && showOverlay) {
      setShowOverlay(false);

      return;
    } else if (overlayId !== post.id && showOverlay) {
      setScrollpos(window.scrollY);
      const v = document
        .getElementById(`share-${post.id}`)
        .getBoundingClientRect();
      setOverlayLeft(v.left);
      setOverlayTop(v.top + v.height);
      setOverlayId(post.id);
      setShowOverlay(true);
      return;
    }

    setScrollpos(window.scrollY);
    const v = document
      .getElementById(`share-${post.id}`)
      .getBoundingClientRect();
    setOverlayLeft(v.left);
    setOverlayTop(v.top + v.height);
    setOverlayId(post.id);
    setShowOverlay2(false);
    setShowOverlay(true);
  }

  function set2() {
    if (overlayId2 === post.id && showOverlay2) {
      setShowOverlay2(false);
      return;
    }

    setScrollpos(window.scrollY);

    const v = document
      .getElementById(`threedot-${post.id}`)
      .getBoundingClientRect();

    setOverlayLeft2(v.left);
    setOverlayTop2(v.top + v.height);
    setOverlayId2(post.id);
    setShowOverlay(false); //sets other one to false
    setShowOverlay2(true);
  }

  useEffect(() => {
    //function to prevent event bubbling
    $(document).ready((e) => {
      $(`#single-container${post.id}`).click(function () {
        $(this).children(".children").toggle();
      });
      $(`#single-container${post.id}` + ".bubbleprevent").click(function (e) {
        e.stopPropagation(); //if clicked on an element that has bubbleprevent class, dont run parent navigate function
      });
    });
  }, []);

  useEffect(() => {
    const height = $(`#${post.id}-title`).height();

    if (height > 30) {
      $(`#${post.id}-title`).css(
        "-webkit-mask-image",
        "linear-gradient(183deg, #000 60%, transparent)"
      );

      $(`#${post.id}-title`).css(
        "mask-image",
        "linear-gradient(183deg, #000 60%, transparent)"
      );
    }
  }, []);

  return (
    <div
      className='single-postcontainer'
      id={`single-container${post.id}`}
      onClick={(e) => {
        navigate(`/r/${post.community.name}/comment/${post.id}`);
      }}
    >
      <div className='posts-vote post-voteleft'>
        <div
          className='posts-upvote post-votebut'
          onClick={(e) => {
            e.stopPropagation();
            if (post.upvotes.includes(authState?.id)) {
              handleRemoveUpvote();
              return;
            }
            handleUpvote();
          }}
        >
          <UpVoteSvg id={post.id} post={post} authState={authState} />
        </div>
        <div className='posts-votecount'>
          {post.upvotes.length - post.downvotes.length}
        </div>
        <div
          className='posts-downvote post-votebut'
          onClick={(e) => {
            e.stopPropagation();
            if (post.downvotes.includes(authState.id)) {
              handleRemoveDownvote();
              return;
            }
            handleDownvote();
          }}
        >
          <DownVoteSvg id={post.id} post={post} authState={authState} />
        </div>
      </div>

      <div className='posts-maincontainer'>
        <div className='posts-serveranduser'>
          <img src={communities[1]?.image} className='post-communityicon' />
          <a
            href={`/${post.community.tag}`}
            className='posts-communityname'
            onClick={(e) => e.stopPropagation()}
          >
            {post.community.tag}
          </a>
          <div className='dot-posts'>•</div>
          <div className='post-topdesc' style={{ marginRight: "3px" }}>
            Post by
          </div>
          <a
            href=''
            className='post-topdesc user-anchor'
            style={{ marginRight: "3px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {post.user.name}
          </a>
          <div className='post-topdesc'>5 hours ago</div>
        </div>

        <div className='container-titleanddesc'>
          <div className='posttitle-container'>{post.title}</div>
          {post.body !== "" && (
            <div className='postdesc-container' id={`${post.id}-title`}>
              {post.body}
            </div>
          )}

          {post.image && (
            <div className='center' style={{ width: "100%" }}>
              <img
                src={`data:image/png;base64,${post.image}`}
                className='posts-mainimage'
              />
            </div>
          )}
        </div>

        <div className='posts-bottomcontainer'>
          <div className='vote-smallscreen'>
            <div
              className='post-votebut posts-upvote'
              onClick={(e) => {
                e.stopPropagation();
                fillRed();
              }}
            >
              <UpVoteSvg id={post.id} />
            </div>
            <div>82.5k</div>
            <div
              className='post-votebut posts-downvote'
              onClick={(e) => {
                e.stopPropagation();
                fillRed2();
              }}
            >
              <DownVoteSvg id={post.id} />
            </div>
          </div>
          <div className='posts-comment' onClick={(e) => e.stopPropagation()}>
            <CommentSvg />
            <span className='span-comment'>
              {post.comments.length} Comments
            </span>
          </div>

          <div
            className='posts-comment post-award '
            onClick={(e) => e.stopPropagation()}
          >
            <AwardSvg />
            <span className='span-comment'>Award</span>
          </div>

          <div
            className='posts-comment post-share'
            id={`share-${post.id}`}
            style={{ padding: "5.5px 8px 5.5px 8px" }}
            onClick={(e) => {
              e.stopPropagation();
              set();
            }}
          >
            <ShareSvg />
            <span className='span-comment'>Share</span>
          </div>

          <div
            className='posts-comment post-save'
            onClick={(e) => e.stopPropagation()}
          >
            <SaveSvg />
            <span className='span-comment'>Save</span>
          </div>

          <div
            className='threedot'
            id={`threedot-${post.id}`}
            onClick={(e) => {
              e.stopPropagation();
              set2();
            }}
          >
            <ThreeDotSvg />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
