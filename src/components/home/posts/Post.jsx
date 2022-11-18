import React, { useEffect, useState } from "react";
import "./post.scss";

import { communities } from "../newcommunities/newcommunitiesobj";

import $ from "jquery";

import CommentSvg from "./postssvgs/CommentSvg";
import AwardSvg from "./postssvgs/AwardSvg";
import ShareSvg from "./postssvgs/ShareSvg";
import ThreeDotSvg from "./postssvgs/ThreeDotSvg";
import UpVoteSvg from "./postssvgs/arrowicons/UpVoteSvg";
import DownVoteSvg from "./postssvgs/arrowicons/DownVoteSvg";
//all posts

const Post = ({
  post,
  setOverlayTop,
  setOverlayLeft,
  setShowOverlay,
  setOverlayId,
  overlayId,
  showOverlay,
  val,
}) => {
  const community = communities.find((i) => i.id === post.communityid);
  const [upvoteActive, setUpvoteActive] = useState(false); //change to userid later when sql
  const [downvoteActive, setDownvoteActive] = useState(false);

  function fillRed() {
    if (downvoteActive) {
      setDownvoteActive(false);
    }
    setUpvoteActive((prev) => !prev);
  }

  function fillRed2() {
    if (upvoteActive) {
      setUpvoteActive(false);
    }
    setDownvoteActive((prev) => !prev);
  }

  function set() {
    // if (!showOverlay) {
    //   val = 0;
    // } else {
    //   val = 1;
    // }
    if (overlayId === post.id && showOverlay) {
      setShowOverlay(false);
      val = 0;

      return;
    } else if (overlayId !== post.id && showOverlay) {
      val = 1;
      const v = document
        .getElementById(`share-${post.id}`)
        .getBoundingClientRect();
      setOverlayLeft(v.left);
      setOverlayTop(v.top + v.height);
      setOverlayId(post.id);
      setShowOverlay(true);
      return;
    }

    val = 1;
    const v = document
      .getElementById(`share-${post.id}`)
      .getBoundingClientRect();
    setOverlayLeft(v.left);
    setOverlayTop(v.top + v.height);
    setOverlayId(post.id);
    setShowOverlay(true);
  }

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
    <div className='single-postcontainer' id={post.id}>
      <div className='posts-vote post-voteleft'>
        <div className='posts-upvote post-votebut' onClick={() => fillRed()}>
          <UpVoteSvg id={post.id} upvoteActive={upvoteActive} />
        </div>
        <div className='posts-votecount'>111</div>
        <div className='posts-downvote post-votebut' onClick={() => fillRed2()}>
          <DownVoteSvg id={post.id} downvoteActive={downvoteActive} />
        </div>
      </div>

      <div className='posts-maincontainer'>
        <div className='posts-serveranduser'>
          <img src={community.image} className='post-communityicon' />
          <div className='posts-communityname'>{community.name}</div>
          <div className='dot-posts'>•</div>
          <div className='post-topdesc' style={{ marginRight: "3px" }}>
            Post by
          </div>
          <a
            href=''
            className='post-topdesc user-anchor'
            style={{ marginRight: "3px" }}
          >
            {post.user}
          </a>
          <div className='post-topdesc'>5 hours ago</div>
        </div>

        <div className='container-titleanddesc'>
          <div className='posttitle-container'>{post.title}</div>
          {post.description !== "" && (
            <div className='postdesc-container' id={`${post.id}-title`}>
              {post.description}
            </div>
          )}
        </div>

        <div className='posts-bottomcontainer'>
          <div className='vote-smallscreen'>
            <div
              className='post-votebut posts-upvote'
              onClick={() => fillRed()}
            >
              <UpVoteSvg id={post.id} upvoteActive={upvoteActive} />
            </div>
            <div>82.5k</div>
            <div
              className='post-votebut posts-downvote'
              onClick={() => fillRed2()}
            >
              <DownVoteSvg id={post.id} downvoteActive={downvoteActive} />
            </div>
          </div>
          <div className='posts-comment'>
            <CommentSvg />
            <span className='span-comemnt'>33 Comment</span>
          </div>

          <div className='posts-comment post-award'>
            <AwardSvg />
            <span className='span-comemnt'>Award</span>
          </div>

          <div
            className='posts-comment post-share'
            id={`share-${post.id}`}
            style={{ padding: "5.5px 8px 5.5px 8px" }}
            onClick={() => set()}
          >
            <ShareSvg />
            <span className='span-comemnt'>Share</span>
          </div>

          <div className='threedot' id={`threedot-${post.id}`}>
            <ThreeDotSvg />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
