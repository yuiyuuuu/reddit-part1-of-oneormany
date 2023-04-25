import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import $ from "jquery";

import { setScp } from "../../../../store/scp/scpConditional";
import { setSelectedPost } from "../../../../store/scp/selectedPost";
import { votesUsers } from "../../../../store/users/users";
import { setLinkToCopy } from "../../../../store/shareoverlay/copyLink";
import { handleSetPrevHref } from "../../../../store/users/prevHrefBeforeOverlay";
import { makeGetRequest } from "../../../../requests/helperFunction";
import { dispatchSetHcState } from "../../../../globalcomponents/hovercommunities/hovercommunitiesstate";

import UpVoteSvg from "../../../home/posts/postssvgs/arrowicons/UpVoteSvg";
import DownVoteSvg from "../../../home/posts/postssvgs/arrowicons/DownVoteSvg";
import TextOnlyPost from "./svg/TextOnlyPost";
import ExpandSvg from "./svg/ExpandSvg";
import UserPostModOptions from "./UserPostModOptions";
import CommentSvg from "../../../home/posts/postssvgs/CommentSvg";
import ShareSvg from "../../../home/posts/postssvgs/ShareSvg";
import CollapseSvg from "./svg/CollapseSvg";

const UserPostMap = ({
  post,
  i,
  length,
  selectedUser,
  usersaved,
  scp,
  set,
  set2,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);

  const [showPostDetails, setShowPostDetails] = useState(false);

  function handleUpvote() {
    const obj = {
      userid: authState.id,
      postid: post.id,
    };

    dispatch(votesUsers(obj, "up"));
  }

  function handleDownvote() {
    const obj = {
      userid: authState.id,
      postid: post.id,
    };

    dispatch(votesUsers(obj, "down"));
  }

  function handleRemoveUpvote() {
    const obj = {
      userid: authState.id,
      postid: post.id,
    };

    dispatch(votesUsers(obj, "up-remove"));
  }

  function handleRemoveDownvote() {
    const obj = {
      userid: authState.id,
      postid: post.id,
    };

    dispatch(votesUsers(obj, "down-remove"));
  }

  useEffect(() => {
    $(document).ready(() => {
      $(`.community-hov-${post?.id}`).mouseover(async () => {
        const coordinates = $(
          `.community-hov-${post?.id}`
        )[0].getBoundingClientRect();

        const community = await makeGetRequest(
          `communities/fetchbyid/${post?.community?.id}`
        ).then((res) => {
          dispatch(
            dispatchSetHcState({
              display: true,
              top: coordinates.top + $(`.community-hov-${post?.id}`).height(),
              left: coordinates.left,
              community: res,
              id: post?.id,
            })
          );
        });
      });
    });
  }, []);

  return (
    <div
      className='up-mapparent'
      style={{
        borderRadius: usersaved
          ? "4px"
          : i === 0 && i === length - 1
          ? "4px"
          : i === 0
          ? "4px 4px 0 0"
          : i === length - 1 && "0 0 4px 4px",
        marginTop: usersaved && "5px",
      }}
      onClick={() => {
        dispatch(setScp("user"));
        dispatch(setSelectedPost(post));
        dispatch(handleSetPrevHref(window.location.pathname));
        navigate(`/r/${post?.community?.name}/comments/${post?.id}`);
      }}
    >
      <div className='up-lin'>
        <div
          className='posts-vote post-voteleft'
          style={{
            borderRadius:
              i === 0 ? "4px 0 0 0" : i === length - 1 && "0 0 0 4px",
          }}
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

        <div style={{ maxWidth: "calc(100% - 48px)", width: "100%" }}>
          <div className='up-mapright'>
            {post?.image ? (
              <div
                className='up-preimg'
                style={{
                  backgroundImage: `url(data:image/png;base64,${post?.image})`,
                }}
              />
            ) : (
              <div className='up-wh'>
                <TextOnlyPost />
              </div>
            )}

            <div className='up-postinfo'>
              <div className='up-title'>{post?.title}</div>
              <div className='up-f'>
                <div
                  className={`up-fc hoverunderline community-hov-${post?.id}`}
                  onClick={() => {
                    window.location.href = `/r/${post?.community?.name}`;
                  }}
                >
                  r/{post?.community?.name}
                </div>
                <div className='dot-posts'>•</div>
                <span>Posted by u/{post?.user?.name}</span>&nbsp;
                <span>1 day ago</span>
              </div>

              <div className='up-botrow'>
                <div
                  className='up-expand'
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPostDetails((prev) => !prev);
                  }}
                >
                  {showPostDetails ? (
                    <CollapseSvg id={post?.id} />
                  ) : (
                    <ExpandSvg id={post?.id} />
                  )}
                </div>

                <div className='up-divide' />

                <div className='up-sd up-2 up-hov'>
                  <CommentSvg id={post?.id} />
                  <span className='up-te'>0</span>
                </div>

                <div
                  className='up-sd up-hov up-share'
                  id={`upshare-${post?.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    set(post?.id);
                    dispatch(
                      setLinkToCopy(
                        `${window.location.host}/r/${post.community.name}/comments/${post.id}`
                      )
                    );
                  }}
                >
                  <ShareSvg id={post?.id} />
                  <span className='up-te'>Share</span>
                </div>

                {authState?.id === selectedUser?.id && (
                  <UserPostModOptions post={post} set2={set2} />
                )}
              </div>
            </div>
          </div>
          <div
            className='up-details'
            style={{
              display: !showPostDetails && "none",
              justifyContent: post?.image && "center",
            }}
          >
            {post?.body && (
              <pre style={{ lineHeight: "20px" }}>{post?.body}</pre>
            )}
            {post?.image && (
              <img
                className='up-detimg'
                src={`data:image/png;base64,${post?.image}`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPostMap;
