import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";

import { fetchCommunity } from "../../../../store/posts-individualcommunity";
import { hexToRgb } from "../../../../requests/rgbHexFunctions";
import { setSelectedPost } from "../../../../store/scp/selectedPost";
import { dispatchSetAOS } from "../../../../globalcomponents/authoverlaysignup/authOverlaySignupStates";
import { dispatchAddCommentNew } from "../../../../store/comments/newComments";
import { dispatchFilterAComment } from "../../../../store/comments/comments";
import { handleAddComment } from "../../../../store/scp/selectedPost";
import { setComments } from "../../../../store/comments/comments";
import { dispatchSortComments } from "../../../../store/comments/comments";
import { dispatchRemoveNewCommentDuplicates } from "../../../../store/comments/comments";
import { setCommentIdFind } from "../../../../store/comments/commentIdFind";
import { setOverlayState } from "../../../../store/postoverlays/shareOverlay";
import { setThreeState } from "../../../../store/postoverlays/threeDotOverlay";
import {
  handleSelectedPostUpvote,
  handleSelectedPostDownvote,
  handleSelectedPostRemoveDownvote,
  handleSelectedPostRemoveUpvote,
} from "../../../../store/scp/selectedPost";
import { makePutRequest } from "../../../../requests/helperFunction";
import { setLinkToCopy } from "../../../../store/shareoverlay/copyLink";
import { dispatchSetCommentSearchQuery } from "../../../../store/comments/searchQuery";
import { timeConvert } from "../../../../requests/timeConvert";

import "./scpno.scss";

import $ from "jquery";

import UpVoteSvg from "../../../home/posts/postssvgs/arrowicons/UpVoteSvg";
import DownVoteSvg from "../../../home/posts/postssvgs/arrowicons/DownVoteSvg";
import DefaultCommunitiesIcon from "../../communitiessvg/DefaultCommunitiesIcon";
import CommentSvg from "../../../home/posts/postssvgs/CommentSvg";
import ShareSvg from "../../../home/posts/postssvgs/ShareSvg";
import ApproveSvg from "../scpsvgs/ApproveSvg";
import RemoveSvg from "../scpsvgs/RemoveSvg";
import SpamSvg from "../scpsvgs/SpamSvg";
import ShieldSvg from "../scpsvgs/ShieldSvg";
import ThreeDot from "../scpsvgs/ThreeDot";
import TextStylesReply from "../comments/textstylescomponent/TextStylesReply";
import SortCommentsMain from "../sortcomments/SortCommentsMain";
import NoCommentsyet from "../nocomment/NoCommentsyet";
import CommentsList from "../comments/CommentsList";
import SortCommentsListPopup from "../sortcomments/SortCommentsListPopup";
import ScpnoRight from "./ScpnoRight";
import PlanetIcon from "./svg/PlanetIcon";
import NothingHere from "../comments/NothingHere";
import CommentSearch from "../comments/searchcomponent/CommentSearch";
import ShareOverlay from "../../../home/overlays/ShareOverlay";
import ThreeDotOverlay from "../../../home/overlays/ThreeDotOverlay";

const SingleCommunityPostNotOverlay = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const nav = useNavigate();
  const loc = useLocation();

  const authState = useSelector((state) => state.auth);
  const communityState = useSelector((state) => state.postsindividualcommunity);
  const selectedPost = useSelector((state) => state.selectedPost);
  const newCommentState = useSelector((state) => state.newComments);
  const commentsState = useSelector((state) => state.comments);
  const scp = useSelector((state) => state.scp);
  const shareOverlayState = useSelector((state) => state.shareOverlay);
  const lnState = useSelector((state) => state.lnState);
  const lnnlState = useSelector((state) => state.lnnl);

  const time = timeConvert(selectedPost?.createdAt);

  const [themeBaseColorRgba, setThemeBaseColorRgba] = useState("");

  const [commentInput, setCommentInput] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [showCommentSortOverlay, setShowCommentSortOverlay] = useState(false);
  const [firstCommentId, setFirstCommentId] = useState(null); //if the first comment of the list is not group[null]

  //error states
  const [commentNotFound, setCommentNotFound] = useState(false);

  const [isThereSelectedComment, setIsThereSelectedComment] = useState(
    params?.commentid ? true : false
  );

  const [isThereQuery, setIsThereQuery] = useState(
    new URLSearchParams(new URL(window.location.href).search).getAll("q")[0]
      ? true
      : false
  );

  //search comment state
  const [searchValue, setSearchValue] = useState("");
  const [commentSearchActive, setCommentSearchActive] = useState(false);
  const [commentResults, setCommentResults] = useState([]);

  function handleCommentSubmit() {
    if (!authState.id) {
      dispatch(dispatchSetAOS({ display: true, which: "comment" }));
      return;
    }
    if (!commentInput.length) return;
    //this one has no parent id since its root comment
    const obj = {
      communityid: selectedPost.community.id,
      message: commentInput,
      userId: authState.id,
      postId: selectedPost.id,
      parentId: null,
    };

    dispatch(handleAddComment(obj)).then((res) => {
      setCommentInput("");
      dispatch(dispatchAddCommentNew(res.comment));
      dispatch(dispatchFilterAComment(res.comment.id));
    });
  }

  function sortByWhichComments(which) {
    setSelectedSort(which);
    window.localStorage.removeItem("commentsort");

    window.localStorage.setItem("commentsort", which);
  }

  function handleCommentSearchQuery(value) {
    if (!selectedPost?.comments) return;
    selectedPost?.comments?.forEach((c) => {
      const split = c.message.split(" ").map((q) => q.toLowerCase().trim());
      if (split.includes(value.toLowerCase())) {
        setCommentResults((prev) => [...prev, c]);
      }
    });
  }

  function handleShareOverlayClick(id) {
    const scrollpos = window.scrollY;
    //if the one we clicked on was the same one as before, we set the display to none.
    if (shareOverlayState.id === id && shareOverlayState.display) {
      dispatch(setOverlayState({ display: false }));

      return;
    } else if (shareOverlayState.id !== id && shareOverlayState.display) {
      //if the one we clicked was not the one we clicked before, we keep the display active but set the top and left of the new one clicked
      const v = document.getElementById(`share-${id}`).getBoundingClientRect();
      dispatch(
        setOverlayState({
          left: v.left,
          top: v.top + v.height,
          id: id,
          display: true,
          scroll: scrollpos,
        })
      );
      return;
    }

    //else we just set the display to true and update id for next click

    const v = document.getElementById(`share-${id}`).getBoundingClientRect();

    dispatch(
      setOverlayState({
        display: true,
        left: v.left,
        top: v.top + v.height,
        id: id,
        scroll: scrollpos,
      })
    );
    dispatch(setThreeState({ display: false }));
  }

  //-----------------HANDLE VOTES BELOW---------------------\\

  function handleUpvote() {
    if (!authState?.id) {
      dispatch(dispatchSetAOS({ display: true, which: "vote" }));
      return;
    }

    const info = {
      postid: selectedPost.id,
      userid: authState.id,
      communityid: selectedPost.community.id,
    };
    dispatch(handleSelectedPostUpvote(info)).then((res) => {
      dispatch(setSelectedPost(res));
    });
  }

  function handleDownvote() {
    if (!authState?.id) {
      dispatch(dispatchSetAOS({ display: true, which: "vote" }));
      return;
    }

    const info = {
      postid: selectedPost.id,
      userid: authState.id,
      communityid: selectedPost.community.id,
    };
    dispatch(handleSelectedPostDownvote(info)).then((res) => {
      dispatch(setSelectedPost(res));
    });
  }

  function handleRemoveUpvote() {
    if (!authState?.id) {
      dispatch(dispatchSetAOS({ display: true, which: "vote" }));
      return;
    }

    const info = {
      postid: selectedPost.id,
      userid: authState.id,
    };

    dispatch(handleSelectedPostRemoveUpvote(info)).then((res) => {
      dispatch(setSelectedPost(res));
    });
  }

  function handleRemoveDownvote() {
    if (!authState?.id) {
      dispatch(dispatchSetAOS({ display: true, which: "vote" }));
      return;
    }

    const info = {
      postid: selectedPost.id,
      userid: authState.id,
    };

    dispatch(handleSelectedPostRemoveDownvote(info)).then((res) => {
      dispatch(setSelectedPost(res));
    });
  }

  useEffect(() => {
    const id = params.id;
    dispatch(fetchCommunity(id));

    $(".hide").css("display", "none");

    //set selected sort
    const v = window.localStorage.getItem("commentsort");
    if (v) {
      setSelectedSort(v);
    } else {
      setSelectedSort("Best");
    }
  }, [window.location.href]);

  useEffect(() => {
    $(document)
      .off()
      .click(function (event) {
        let run = true;
        let run2 = true;
        var $target = $(event.target);

        //prevents run if the element clicked is another share button
        const l = document.getElementsByClassName("scp-share");
        const m = document.getElementsByClassName("threedot");
        Array.prototype.forEach.call(l, function (r) {
          if ($target.closest(r).length) {
            run = false;
            return false;
          }
        });

        Array.prototype.forEach.call(m, function (r) {
          if ($target.closest(r).length) {
            run2 = false;
            return false;
          }
        });

        if (
          !$target.closest("#tdot-overlay").length &&
          $("#tdot-overlay").is(":visible") &&
          run2
        ) {
          dispatch(setThreeState({ display: false }));
        }

        if (
          !$target.closest("#share-overlay").length &&
          $("#share-overlay").is(":visible") &&
          run
        ) {
          dispatch(setOverlayState({ display: false }));
        }
      });
  }, []);

  //set themebasecolor rgba
  useEffect(() => {
    if (!communityState?.id) return;
    //sets value of nav posts, .15 opacity of theme base color
    const value = hexToRgb(communityState.themeBaseColor);
    setThemeBaseColorRgba(`rgba(${value.r}, ${value.g}, ${value.b}, 0.5)`);

    //sets min height of main bottom
    const windowheight = window.innerHeight;
    const bannerheight = document
      .querySelector(".communities-bannertop")
      .getBoundingClientRect().height;
    const navheight = document
      .querySelector(".scpno-navigateposts")
      .getBoundingClientRect().height;
    $(".scpno-mainbottom").css(
      "min-height",
      windowheight - bannerheight - navheight - 48 + "px"
    );

    const post = communityState.posts.find((f) => f.id === params.postid);
    dispatch(setSelectedPost(post));
  }, [communityState]);

  //if there is no selected comment then we run this function
  useEffect(() => {
    if (!selectedPost?.comments) return;
    const commentid = params.commentid;
    if (commentid) return;

    const v = window.localStorage.getItem("commentsort");

    dispatch(setComments(selectedPost?.comments));

    dispatch(dispatchSortComments(selectedPost?.comments, v));

    if (newCommentState.length !== 0) {
      dispatch(dispatchRemoveNewCommentDuplicates(newCommentState));
    }
  }, [selectedPost?.comments, window.location.href]);

  //if there is a selected comment we set comments with this function
  useEffect(() => {
    const commentid = params.commentid;
    if (!commentid) return;
    if (!selectedPost?.comments) return;

    let parentCommentsWithOgComment = { result: [], top: false };
    const context =
      new URLSearchParams(new URL(window.location.href).search).getAll(
        "context"
      )[0] || null;

    //find comment based off id
    const cur = selectedPost?.comments?.find((v) => v.id === commentid);
    if (!cur) {
      //if no comment found
      setCommentNotFound(true);
      return;
    }

    if (context != 0) {
      parentCommentsWithOgComment = dispatch(
        setCommentIdFind(
          selectedPost?.comments,
          cur,
          context == null ? Number.MAX_SAFE_INTEGER : context //null is equal to 0 when using >= or <= operator
        )
      );
    }

    const childrenComments = [];

    function findChildrenComments(commentState, startingComment) {
      const cur = startingComment;
      const filter = commentState.filter(
        (comment) => comment?.parentId === cur?.id
      );

      childrenComments.push(...filter);

      if (filter.length > 0) {
        filter.slice().forEach((c) => {
          return findChildrenComments(selectedPost?.comments, c);
        });
      }
    }

    findChildrenComments(selectedPost?.comments, cur);

    if (
      !parentCommentsWithOgComment.top &&
      parentCommentsWithOgComment?.result
    ) {
      setFirstCommentId(
        parentCommentsWithOgComment?.result[
          parentCommentsWithOgComment.result.length - 1
        ]?.parentId
      );
    } else {
      setFirstCommentId(null);
    }

    if (context == 0) {
      setFirstCommentId(cur.parentId);
    }

    dispatch(
      setComments([
        ...parentCommentsWithOgComment.result,
        cur,
        ...childrenComments,
      ])
    );
  }, [selectedPost?.comments, window.location.href]);

  //comment search enter event listener
  useEffect(() => {
    $(document).ready(() => {
      document.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && $(".sc-input").val().length > 0) {
          const isInputFocused = $(".sc-input").is(":focus");

          if (isInputFocused) {
            nav(loc.pathname + `?q=${$(".sc-input").val()}`);
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    //only want the query to refresh is the popup is not active
    if (scp !== null) return;
    const commentQuery = new URLSearchParams(
      new URL(window.location.href).search
    ).getAll("q")[0];

    if (commentQuery) {
      setCommentResults([]);
      setCommentSearchActive(true);
      handleCommentSearchQuery(commentQuery);
    } else {
      setCommentResults([]);
      setCommentSearchActive(false);
    }

    if (!scp && commentQuery) {
      dispatch(dispatchSetCommentSearchQuery(commentQuery));
    }
  }, [window.location.href, selectedPost?.comments, scp]);

  useEffect(() => {
    if (!selectedPost?.id || !authState?.id) return;

    makePutRequest("users/history", {
      userid: authState?.id,
      postid: selectedPost?.id,
    });
  }, [authState, selectedPost]);

  if (commentNotFound) {
    return <NothingHere />;
  }

  return (
    <div>
      <div className='heightholder'></div>
      <div
        className='scpno-parent'
        style={{
          boxSizing: "border-box",
          paddingLeft: (lnnlState || lnState) && "270px",
        }}
      >
        <div
          style={{
            backgroundColor:
              "#" +
              (communityState?.bannerColor
                ? communityState?.bannerColor
                : communityState.themeBaseColor),
            height:
              communityState?.communityBannerSize === "small"
                ? "64px"
                : communityState?.communityBannerSize === "medium"
                ? "128px"
                : "192px",
            padding: "8px 16px",
          }}
        >
          <a
            className='communities-bannertop'
            id={`communities-banner${communityState.id}`}
            style={{
              maxWidth: "1200px",
              margin: " 0 auto",
              padding: 0,
              display: "flex",
              cursor: "pointer",
            }}
            href={`/r/${communityState?.name}`}
          >
            <div className='scpno-b'>
              <PlanetIcon
                backgroundcolor={
                  !communityState?.bannerImage &&
                  hexToRgb(
                    communityState?.bannerColor
                      ? communityState?.bannerColor
                      : communityState?.themeBaseColor
                  )
                }
              />
              <span className='scpno-e'>
                {communityState?.communityNameFormat
                  ? communityState?.communityNameFormat
                  : ""}
              </span>
            </div>
          </a>
        </div>

        <div
          className='scpno-navigateposts'
          style={{ background: themeBaseColorRgba }}
        >
          <div className='scpno-navigatepostsinner'>
            <a className='scpno-a-posts' href={`/r/${communityState.name}`}>
              Posts
            </a>
          </div>
        </div>

        <div
          className='scpno-mainbottom'
          style={{
            backgroundColor:
              !communityState.image && "#" + communityState.themeBodyColor,
          }}
        >
          <div className='scp-postcontainer' style={{ marginTop: 0 }}>
            <div className='scp-posttop'>
              <div className='scp-vote'>
                <div
                  className='posts-upvote post-votebut'
                  onClick={() => {
                    if (
                      selectedPost?.upvotes
                        ?.map((v) => v.id)
                        ?.includes(authState?.id)
                    ) {
                      handleRemoveUpvote();
                      return;
                    }
                    handleUpvote();
                  }}
                  style={{ marginTop: "-2px" }}
                >
                  <UpVoteSvg
                    id={selectedPost?.id}
                    post={selectedPost}
                    authState={authState}
                  />
                </div>

                <div
                  className='scp-num'
                  style={{
                    color: selectedPost?.upvotes?.includes(authState?.id)
                      ? "red"
                      : selectedPost?.downvotes?.includes(authState?.id)
                      ? "#7193ff"
                      : "#1c1c1c",
                    margin: "4px 0",
                  }}
                >
                  {selectedPost?.upvotes?.length -
                    selectedPost?.downvotes?.length}
                </div>

                <div
                  className='posts-upvote post-votebut'
                  onClick={() => {
                    if (
                      selectedPost.downvotes
                        ?.map((v) => v.id)
                        ?.includes(authState?.id)
                    ) {
                      handleRemoveDownvote();
                      return;
                    }
                    handleDownvote();
                  }}
                  style={{ marginTop: "-2px" }}
                >
                  <DownVoteSvg
                    id={selectedPost?.id}
                    post={selectedPost}
                    authState={authState}
                  />
                </div>
              </div>

              <div className='scp-cominforow'>
                <div
                  className='scp-q'
                  onClick={() => {
                    dispatch(setSelectedPost({}));
                    nav(`/r/${selectedPost.community.name}`);
                  }}
                >
                  <div className='scp-compfp'>
                    {!selectedPost?.community?.iconImage ? (
                      <DefaultCommunitiesIcon
                        fillcolor={
                          "#" + selectedPost?.community?.themeBaseColor
                        }
                        height={20}
                        community={selectedPost?.community}
                      />
                    ) : (
                      <img
                        src={`data:image/png;base64,${selectedPost?.community?.iconImage}`}
                        className='post-communityicon'
                      />
                    )}
                  </div>

                  <div className='scp-comanchor'>
                    {selectedPost?.community?.tag}
                  </div>
                </div>

                <div className='dot-posts'>•</div>

                <div className='scp-y'>
                  <span>Posted by </span>
                  <span className='scp-yp' style={{ marginRight: "4px" }}>
                    <a
                      href={`/user/${selectedPost?.user?.name}`}
                      style={{ color: "rgb(120, 124, 126)" }}
                    >
                      u/{selectedPost?.user?.name}
                    </a>
                  </span>
                  <span>{time}</span>
                </div>
              </div>

              <div className='scp-title2'>{selectedPost?.title}</div>

              {selectedPost?.image && (
                <div className='scp-mnimg'>
                  <img
                    src={`data:image/png;base64,${selectedPost?.image}`}
                    className='scp-podpsf'
                  />
                </div>
              )}

              {selectedPost?.body && (
                <div className='scp-desc'>
                  <pre>{selectedPost?.body}</pre>
                </div>
              )}

              <div className='scp-selectionrow' style={{ userSelect: "none" }}>
                <div className='scp-comment scp-selectionaligncenter'>
                  <CommentSvg id={selectedPost?.id} />
                  <span>{selectedPost?.comments?.length}</span>
                </div>

                <div
                  className={`scp-share scp-selectionaligncenter scp-but`}
                  id={`share-${selectedPost.id}`}
                  onClick={() => {
                    handleShareOverlayClick(selectedPost.id);
                    //set the link to copy
                    dispatch(
                      setLinkToCopy(
                        `${window.location.host}/r/${selectedPost.community.name}/comments/${selectedPost.id}`
                      )
                    );
                  }}
                >
                  <ShareSvg id={selectedPost?.id} />
                  <span>Share</span>
                </div>

                <div className='scp-modoptions'>
                  <div className='scp-modrow'>
                    <ApproveSvg id={selectedPost?.id} />
                    <span className='scp-m'>Approve</span>
                  </div>

                  <div className='scp-modrow'>
                    <RemoveSvg id={selectedPost?.id} />
                    <span className='scp-m'>Remove</span>
                  </div>

                  <div className='scp-modrow'>
                    <SpamSvg id={selectedPost?.id} />
                    <span className='scp-m'>Spam</span>
                  </div>

                  <div className='scp-modrow'>
                    <ShieldSvg id={selectedPost?.id} />
                  </div>

                  <div
                    className='scp-modrow'
                    style={{ padding: "2px 4px", height: "20px" }}
                  >
                    <ThreeDot />
                  </div>
                </div>
              </div>

              <div className='scp-commentparent'>
                {!commentSearchActive && (
                  <div style={{ marginBottom: "4px" }}>
                    Comment as{" "}
                    <span className='scp-blue'>u/{authState?.name}</span>
                  </div>
                )}

                <div
                  className='scp-inputparent'
                  style={{ display: commentSearchActive && "none" }}
                >
                  <textarea
                    className='scp-input'
                    placeholder='What are your thoughts?'
                    onChange={(e) => setCommentInput(e.target.value)}
                    value={commentInput}
                  />

                  <div className='scp-inputstylebox' id={`tsc-main-co`}>
                    <TextStylesReply idv='main' show={true} />

                    <div className='grow' />

                    <button className='scp-markdown'>Markdown Mode</button>
                    <button
                      className='scp-commentbutton'
                      style={{
                        cursor: !commentInput?.length && "not-allowed",
                        filter: !commentInput?.length && "grayscale(1)",
                      }}
                      onClick={() => handleCommentSubmit()}
                    >
                      Comment
                    </button>
                  </div>
                </div>

                <div className='scp-sortmain'>
                  <SortCommentsMain
                    selectedSort={selectedSort}
                    setShowCommentSortOverlay={setShowCommentSortOverlay}
                    value={searchValue}
                    onchange={setSearchValue}
                  />
                </div>

                {isThereSelectedComment && (
                  <a
                    className='scp-allcomments'
                    href={`/r/${communityState?.name}/comments/${selectedPost?.id}`}
                  >
                    View all comments
                  </a>
                )}
              </div>

              {!selectedPost?.comments?.length && <NoCommentsyet />}
            </div>
            {commentSearchActive ? (
              <CommentSearch
                commentResults={commentResults}
                selectedPost={selectedPost}
                query={
                  new URLSearchParams(
                    new URL(window.location.href).search
                  ).getAll("q")[0]
                }
              />
            ) : (
              selectedPost?.comments?.length && (
                <div className='comment-mla'>
                  <CommentsList
                    comments={selectedPost?.comments}
                    which={firstCommentId}
                    post={selectedPost}
                    top={true}
                    newComments={newCommentState}
                    commentsState={commentsState}
                  />
                </div>
              )
            )}
          </div>

          <ScpnoRight communityState={communityState} />
        </div>

        <SortCommentsListPopup
          selectedSort={selectedSort}
          setSelectedSort={sortByWhichComments}
          showCommentSortOverlay={showCommentSortOverlay}
          setShowCommentSortOverlay={setShowCommentSortOverlay}
        />

        <ShareOverlay />
        <ThreeDotOverlay />
      </div>
    </div>
  );
};

export default SingleCommunityPostNotOverlay;
