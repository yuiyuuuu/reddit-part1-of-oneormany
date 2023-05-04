import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setScp } from "../../../store/scp/scpConditional";
import { setSelectedPost } from "../../../store/scp/selectedPost";
import { setLinkToCopy } from "../../../store/shareoverlay/copyLink";
import { setOverlayState } from "../../../store/postoverlays/shareOverlay";
import { setThreeState } from "../../../store/postoverlays/threeDotOverlay";
import { handleRecent } from "../../../requests/handleRecent";
import { handleSaved } from "../../../requests/handleSavedPosts";
import { handleSetPrevHref } from "../../../store/users/prevHrefBeforeOverlay";
import { timeConvert } from "../../../requests/timeConvert";
import { hoverCommunitiesInitFunction } from "../../../requests/hoverInformation/hoverCommunitiesInitFunction";
import { hoverUserInit } from "../../../requests/hoverInformation/hoverUserInitFunction";

import "./post.scss";

import $ from "jquery";

import CommentSvg from "./postssvgs/CommentSvg";
import AwardSvg from "./postssvgs/AwardSvg";
import ShareSvg from "./postssvgs/ShareSvg";
import ThreeDotSvg from "./postssvgs/ThreeDotSvg";
import UpVoteSvg from "./postssvgs/arrowicons/UpVoteSvg";
import DownVoteSvg from "./postssvgs/arrowicons/DownVoteSvg";
import SaveSvg from "./postssvgs/SaveSvg";
import DefaultCommunitiesIcon from "../../communities/communitiessvg/DefaultCommunitiesIcon";
import UnsaveSvg from "./postssvgs/UnsaveSvg";

//all posts
const Post = ({
  post,
  authState,
  handleUpvote,
  handleDownvote,
  handleRemoveDownvote,
  handleRemoveUpvote,
  scp,
  m,
  fromOverview, //edge case
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shareOverlayState = useSelector((state) => state.shareOverlay);
  const threeState = useSelector((state) => state.threeDotOverlay);
  const hcState = useSelector((state) => state.hcState);

  const time = timeConvert(post.createdAt);

  //share overlay set
  function set() {
    const scrollpos = window.scrollY;
    //if the one we clicked on was the same one as before, we set the display to none.
    if (shareOverlayState.id === post.id && shareOverlayState.display) {
      dispatch(setOverlayState({ display: false }));

      return;
    } else if (shareOverlayState.id !== post.id && shareOverlayState.display) {
      //if the one we clicked was not the one we clicked before, we keep the display active but set the top and left of the new one clicked
      const v = document
        .getElementById(`share-${post.id}`)
        .getBoundingClientRect();

      dispatch(
        setOverlayState({
          left: v.left,
          top: v.top + v.height,
          id: post.id,
          display: true,
          scroll: scrollpos,
        })
      );
      return;
    }

    //else we just set the display to true and update id for next click

    const v = document
      .getElementById(`share-${post.id}`)
      .getBoundingClientRect();

    dispatch(
      setOverlayState({
        display: true,
        left: v.left,
        top: v.top + v.height,
        id: post.id,
        scroll: scrollpos,
      })
    );
    dispatch(setThreeState({ display: false }));
  }

  //three state set
  function set2() {
    const scrollpos = window.scrollY;

    if (threeState.id === post.id && threeState.display) {
      dispatch(setThreeState({ display: false }));
      return;
    }

    const v = document
      .getElementById(`threedot-${post.id}`)
      .getBoundingClientRect();

    dispatch(
      setThreeState({
        display: true,
        left: v.left,
        top: v.top + v.height,
        id: post.id,
        scroll: scrollpos,
      })
    );

    dispatch(setOverlayState({ display: false }));
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

  useEffect(() => {
    $(document).ready(() => {
      hoverCommunitiesInitFunction(
        dispatch,
        `.community-hov-${post?.id}`,
        post
      );

      hoverUserInit(dispatch, `.hov-user-${post?.id}`, post);
    });
  }, []);

  return (
    <div
      className='single-postcontainer'
      id={`single-container${post.id}`}
      onClick={(e) => {
        handleRecent(authState, post);
        dispatch(setScp(scp || null));
        dispatch(setSelectedPost(post));
        dispatch(handleSetPrevHref(window.location.pathname));
        navigate(`/r/${post.community.name}/comments/${post.id}`);
      }}
      style={{
        marginBottom: fromOverview && 0,
        borderRadius: m && "4px 4px 0 0",
        border: fromOverview && "1px solid transparent",
      }}
    >
      <div
        className='posts-vote post-voteleft'
        style={{ backgroundColor: fromOverview && "white" }}
      >
        <div
          className='posts-upvote post-votebut'
          onClick={(e) => {
            e.stopPropagation();
            if (post.upvotes?.map((v) => v.id)?.includes(authState?.id)) {
              handleRemoveUpvote(post);
              return;
            }
            handleUpvote(post);
          }}
        >
          <UpVoteSvg id={post.id} post={post} authState={authState} />
        </div>
        <div
          className='posts-votecount'
          style={{
            color: post?.upvotes?.includes(authState?.id)
              ? "red"
              : post?.downvotes?.includes(authState?.id)
              ? "#7193ff"
              : "",
          }}
        >
          {post.upvotes?.length - post.downvotes?.length}
        </div>
        <div
          className='posts-downvote post-votebut'
          onClick={(e) => {
            e.stopPropagation();
            if (post.downvotes?.map((v) => v.id)?.includes(authState.id)) {
              handleRemoveDownvote(post);
              return;
            }
            handleDownvote(post);
          }}
        >
          <DownVoteSvg id={post.id} post={post} authState={authState} />
        </div>
      </div>

      <div className='posts-maincontainer'>
        <div className='posts-serveranduser'>
          {post.community?.iconImage ? (
            <img
              src={`data:image/png;base64,${post.community?.iconImage}`}
              className='post-communityicon'
            />
          ) : (
            <DefaultCommunitiesIcon
              fillcolor={"#" + post.community?.themeBaseColor}
              height={20}
              community={post.community}
            />
          )}
          <a
            href={`/${post.community?.tag}`}
            className={`posts-communityname community-hov-${post?.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            {post.community?.tag}
          </a>
          <div className='dot-posts'>•</div>
          <div className='post-topdesc' style={{ marginRight: "3px" }}>
            Post by
          </div>
          <a
            href={`/user/${post?.user?.name}`}
            className={`post-topdesc user-anchor hov-user-${post?.id}`}
            style={{ marginRight: "3px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {post.user?.name}
          </a>
          <div className='post-topdesc'>{time}</div>
        </div>

        <div className='container-titleanddesc'>
          <div className='posttitle-container'>{post?.title}</div>
          {post.body !== "" && (
            <div className='postdesc-container' id={`${post.id}-title`}>
              <pre>{post?.body}</pre>
            </div>
          )}

          {post.image && (
            <div className='center' style={{ width: "100%" }}>
              <img
                src={`data:image/png;base64,${post?.image}`}
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
          <div
            className='posts-comment'
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setScp(scp || null));
              dispatch(setSelectedPost(post));
              navigate(`/r/${post.community.name}/comments/${post.id}`);
            }}
          >
            <CommentSvg />
            <span className='span-comment'>
              {post.comments?.length} Comments
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
              dispatch(
                setLinkToCopy(
                  `${window.location.host}/r/${post.community.name}/comments/${post.id}`
                )
              );
            }}
          >
            <ShareSvg />
            <span className='span-comment'>Share</span>
          </div>

          {authState?.savedPosts?.map((v) => v.id).includes(post?.id) ? (
            <div
              className='posts-comment post-save'
              onClick={(e) => {
                e.stopPropagation();
                handleSaved(
                  authState?.savedPosts.map((v) => v.id).includes(post.id)
                    ? "remove"
                    : "add",
                  "post",
                  post?.id,
                  authState?.id,
                  dispatch
                );
              }}
            >
              <UnsaveSvg idv={post?.id} />
              <span className='span-comment'>Unsave</span>
            </div>
          ) : (
            <div
              className='posts-comment post-save'
              onClick={(e) => {
                e.stopPropagation();
                handleSaved(
                  authState?.savedPosts.map((v) => v.id).includes(post.id)
                    ? "remove"
                    : "add",
                  "post",
                  post?.id,
                  authState?.id,
                  dispatch
                );
              }}
            >
              <SaveSvg />
              <span className='span-comment'>Save</span>
            </div>
          )}

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
