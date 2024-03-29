import React, { useEffect, useState, useCallback } from "react";
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./scp.scss";

import { dispatchSetAOS } from "../../../globalcomponents/authoverlaysignup/authOverlaySignupStates";
import { handleAddComment } from "../../../store/scp/selectedPost";
import { setSelectedPost } from "../../../store/scp/selectedPost";
import {
  dispatchClearCommentState,
  dispatchFilterAComment,
  dispatchRemoveNewCommentDuplicates,
  dispatchSortComments,
  setComments,
} from "../../../store/comments/comments";
import {
  handleSelectedPostUpvote,
  handleSelectedPostDownvote,
  handleSelectedPostRemoveDownvote,
  handleSelectedPostRemoveUpvote,
} from "../../../store/scp/selectedPost";
import { dispatchAddCommentNew } from "../../../store/comments/newComments";
import { setCommentIdFind } from "../../../store/comments/commentIdFind";
import { setScp } from "../../../store/scp/scpConditional";
import { setLinkToCopy } from "../../../store/shareoverlay/copyLink";
import { setOverlayStateSCP } from "../../../store/postoverlays/shareOverlayScp";
import { setThreeStateSCP } from "../../../store/postoverlays/threeDotoverlaySCP";
import { makePutRequest } from "../../../requests/helperFunction";
import { handleSetPrevHref } from "../../../store/users/prevHrefBeforeOverlay";
import { timeConvert } from "../../../requests/timeConvert";

import $ from "jquery";

import UpVoteSvg from "../../home/posts/postssvgs/arrowicons/UpVoteSvg";
import DownVoteSvg from "../../home/posts/postssvgs/arrowicons/DownVoteSvg";
import ImageIcon from "./scpsvgs/ImageIcon";
import TextIcon from "./scpsvgs/TextIcon";
import CloseIcon from "./scpsvgs/CloseIcon";
import CommunityInformation from "../../submit/cominfo/CommunityInformation";
import DefaultCommunitiesIcon from "../communitiessvg/DefaultCommunitiesIcon";
import CommentSvg from "../../home/posts/postssvgs/CommentSvg";
import ShareSvg from "../../home/posts/postssvgs/ShareSvg";
import ApproveSvg from "./scpsvgs/ApproveSvg";
import RemoveSvg from "./scpsvgs/RemoveSvg";
import SpamSvg from "./scpsvgs/SpamSvg";
import ShieldSvg from "./scpsvgs/ShieldSvg";
import ThreeDot from "./scpsvgs/ThreeDot";
import NoCommentsyet from "./nocomment/NoCommentsyet";
import CommentsList from "./comments/CommentsList";
import TextStylesReply from "./comments/textstylescomponent/TextStylesReply";
import SortCommentsMain from "./sortcomments/SortCommentsMain";
import SortCommentsListPopup from "./sortcomments/SortCommentsListPopup";
import CommentSearch from "./comments/searchcomponent/CommentSearch";
import ShareOverlaySCP from "./overlay/ShareOverlaySCP";
import ThreeDotOverlaySCP from "./overlay/ThreeDotOverlaySCP";
import { hoverUserInit } from "../../../requests/hoverInformation/hoverUserInitFunction";
import { hoverCommunitiesInitFunction } from "../../../requests/hoverInformation/hoverCommunitiesInitFunction";

const SingleCommunityPost = () => {
  const params = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const loc = useLocation();
  const match = useMatch({
    path: "/r/:id/comments/:postid/comment/:commentid",
  });
  const postidmatch = useMatch({ path: "/r/:id/comments/:postid" });
  const postidmatchwithid = useMatch({
    path: "/r/:id/comments/:postid/comment/:commentid",
  });

  const authState = useSelector((state) => state.auth);
  const newCommentState = useSelector((state) => state.newComments);
  const commentsState = useSelector((state) => state.comments);
  const scpState = useSelector((state) => state.scp);
  const selectedPost = useSelector((state) => state.selectedPost);
  const searchQuery = useSelector((state) => state.searchQueryComment);
  const shareOverlayState = useSelector((state) => state.shareOverlayScp);
  const threeState = useSelector((state) => state.threeDotOverlaySCP);
  const prevHref = useSelector((state) => state.prevHref);

  const time = timeConvert(selectedPost?.createdAt);

  const [commentInput, setCommentInput] = useState("");
  const [commentImage, setCommentImage] = useState(null);
  const [firstCommentId, setFirstCommentId] = useState(null); //if the first comment of the list is not group[null]

  const [showCommentSortOverlay, setShowCommentSortOverlay] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");

  //search comment state
  const [searchValue, setSearchValue] = useState("");
  const [isTherePreviousQuery, setIsTherePreviousQuery] = useState(false);
  const [commentSearchActive, setCommentSearchActive] = useState(false);
  const [commentResults, setCommentResults] = useState([]);
  const [disablePreviousCsTop, setDisablePreviousCsTop] = useState(false);

  //scroll position
  const scrollPos = useSelector((state) => state.scrollPosition);

  function handleCloseOverlay() {
    if (prevHref) {
      nav(prevHref);
      dispatch(handleSetPrevHref(null));
      return;
    }

    if (scpState !== "scpno") {
      dispatch(setSelectedPost({}));
    } else {
      dispatch(setScp(null));
    }

    //search query will only not be falsy if a search was made on the scpno component
    if (searchQuery) {
      nav(
        `/r/${selectedPost.community.name}/comments/${selectedPost.id}/?q=${searchQuery}`
      );
      return;
    }

    if (scpState === "home") {
      nav("/");
    } else if (scpState === "singleCommunity") {
      nav(`/r/${selectedPost.community.name}`);
    } else if (scpState === "scpno") {
      //i dont think this will ever get ran, but i will just keep it here just in case
      //wont get ran because the only reason this overlay will every be active on this route is when a search is made
      //which is already handled above
      nav(`/r/${selectedPost.community.name}/comments/${selectedPost.id}`);
    } else {
      nav(-1);
    }
  }

  //----------------HANDLING VOTES FUNCTIONS BELOW---------------------\\

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

  //used for when a user has a selected comment and they want to see all comments
  function setAllComments() {
    dispatch(dispatchClearCommentState());
    setIsTherePreviousQuery(false);

    nav(`/r/${selectedPost.community.name}/comments/${selectedPost.id}`);
    const v = window.localStorage.getItem("commentsort");

    dispatch(setComments(selectedPost?.comments));

    dispatch(dispatchSortComments(selectedPost?.comments, v));

    if (newCommentState.length !== 0) {
      dispatch(dispatchRemoveNewCommentDuplicates(newCommentState));
    }
  }

  function handleCommentSearchQuery(value) {
    if (!selectedPost?.comments) return;
    setDisablePreviousCsTop(true); //disable the cs top div that was from previous state
    if (!value) return;
    selectedPost?.comments?.forEach((c) => {
      const split = c.message.split(" ").map((q) => q.toLowerCase().trim());
      if (split.includes(value.toLowerCase())) {
        setCommentResults((prev) => [...prev, c]);
      }
    });
  }

  //---------------------HANDLING VOTES FUNCTIONS ABOVE---------------------\\

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

  function handleShareClick() {
    const scrollpos = $(".scp-parent").scrollTop();
    //if the one we clicked on was the same one as before, we set the display to none.
    if (shareOverlayState.id === selectedPost.id && shareOverlayState.display) {
      dispatch(setOverlayStateSCP({ display: false }));

      return;
    } else if (
      shareOverlayState.id !== selectedPost.id &&
      shareOverlayState.display
    ) {
      //if the one we clicked was not the one we clicked before, we keep the display active but set the top and left of the new one clicked

      const v = document
        .getElementById(`share-${selectedPost.id}`)
        .getBoundingClientRect();
      dispatch(
        setOverlayStateSCP({
          left: v.left,
          top: v.top + v.height - 48,
          id: selectedPost.id,
          display: true,
          scroll: scrollpos,
        })
      );
      return;
    }

    //else we just set the display to true and update id for next click

    const v = document
      .getElementById(`share-${selectedPost.id}`)
      .getBoundingClientRect();

    dispatch(
      setOverlayStateSCP({
        display: true,
        left: v.left,
        top: v.top + v.height - 48,
        id: selectedPost.id,
        scroll: scrollpos,
      })
    );

    dispatch(setThreeStateSCP({ display: false }));
  }

  function handleTDotClick() {
    const scrollpos = $(".scp-parent").scrollTop();

    if (threeState.id === selectedPost.id && threeState.display) {
      dispatch(setThreeStateSCP({ display: false }));
      return;
    }

    const v = document
      .getElementById(`threedot-${selectedPost?.id}`)
      .getBoundingClientRect();

    dispatch(
      setThreeStateSCP({
        display: true,
        left: v.left,
        top: v.top + v.height - 48,
        id: selectedPost.id,
        scroll: scrollpos,
      })
    );

    dispatch(setOverlayStateSCP({ display: false }));
  }

  //-------------------USE EFFECTS BELOW----------------------\\

  useEffect(() => {
    const v = window.localStorage.getItem("commentsort");
    if (v) {
      setSelectedSort(v);
    } else {
      setSelectedSort("Best");
    }
  }, []);

  useEffect(() => {
    $(document).ready(() => {
      $(".scp-input").focus(() => {
        $(".scp-inputparent").css("border", "1px solid #1a1a1b");

        $(".scp-input").focusout(() => {
          $(".scp-inputparent").css("border", "1px solid #EDEFF1");
        });
      });
    });
  }, []);

  useEffect(() => {
    //sets scp component to the top of the page, so when the user selects another post, it wont start at the old scroll position
    return () => {
      $(".scp-parent").scrollTop(0);
      setCommentImage("");
    };
  }, [window.location.href]);

  useEffect(() => {
    if (!selectedPost?.comments) return;
    if (match?.params?.commentid) return;

    const v = window.localStorage.getItem("commentsort");

    dispatch(setComments(selectedPost?.comments));

    dispatch(dispatchSortComments(selectedPost?.comments, v));

    if (newCommentState.length !== 0) {
      dispatch(dispatchRemoveNewCommentDuplicates(newCommentState));
    }
  }, [selectedPost?.comments]);

  //if there is a selected comment we set comments with this function
  useEffect(() => {
    const commentid = match?.params?.commentid;
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

  //check for previous query
  useEffect(() => {
    const query = loc.state?.from;
    if (query) {
      setIsTherePreviousQuery(true);
    }
  }, []);

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

    if (!commentQuery && match?.params?.commentid) {
      setDisablePreviousCsTop(false);
    }
  }, [window.location.href, selectedPost?.comments]);

  //cleanup
  useEffect(() => {
    if (!selectedPost?.id) {
      setShowCommentSortOverlay(false);
      dispatch(dispatchClearCommentState());
    }
  }, [selectedPost]);

  useEffect(() => {
    if (selectedPost?.id) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedPost]);

  useEffect(() => {
    if (!postidmatch?.params?.postid && !postidmatchwithid?.params?.postid) {
      dispatch(setSelectedPost({}));
    }
  }, [window.location.href]);

  const clickout = useCallback(() => {
    let run = true;
    let run2 = true;
    var $target = $(event.target);

    //prevents run if the element clicked is another share button
    const l = document.getElementsByClassName("post-share");
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
      dispatch(setThreeStateSCP({ display: false }));
    }

    if (
      !$target.closest("#share-overlay").length &&
      $("#share-overlay").is(":visible") &&
      run
    ) {
      dispatch(setOverlayStateSCP({ display: false }));
    }
  }, []);

  $(document).off("click", document, clickout).click(clickout);

  const resizeShare = useCallback(() => {
    dispatch(setOverlayStateSCP({ display: false }));
  }, []);

  const resizeTDot = useCallback(() => {
    dispatch(setThreeStateSCP({ display: false }));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeShare);
    window.addEventListener("resize", resizeTDot);

    return () => {
      window.removeEventListener("resize", resizeShare);
      window.removeEventListener("resize", resizeTDot);
    };
  }, []);

  useEffect(() => {
    if (!selectedPost?.id || !authState?.id) return;

    makePutRequest("users/history", {
      userid: authState?.id,
      postid: selectedPost?.id,
    });
  }, [authState, selectedPost]);

  useEffect(() => {
    hoverUserInit(dispatch, `.hov-user-${selectedPost?.id}-scp`, selectedPost);
    hoverCommunitiesInitFunction(
      dispatch,
      `.community-hov-${selectedPost?.id}-scp`,
      selectedPost
    );
  }, []);

  return (
    <div
      style={{ display: (!selectedPost?.id || scpState === null) && "none" }}
    >
      <div className='scp-parent' style={{ top: scrollPos + 48 + "px" }}>
        <div className='scp-banner'>
          <div className='scp-bannerrow'>
            <div className='scp-irow'>
              <div className='scp-votes'>
                <div
                  className='posts-upvote post-votebut'
                  onClick={() => {
                    if (
                      selectedPost.upvotes
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
                    color: selectedPost?.upvotes.includes(authState?.id)
                      ? "red"
                      : selectedPost?.downvotes.includes(authState?.id)
                      ? "#7193ff"
                      : "",
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
                        .includes(authState?.id)
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

              <div className='scp-info'>
                {selectedPost?.image ? <ImageIcon /> : <TextIcon />}
                <div className='scp-title'>{selectedPost?.title}</div>
              </div>
            </div>

            <div
              className='scp-irow2'
              onClick={() => {
                handleCloseOverlay();
              }}
            >
              <CloseIcon />
              Close
            </div>
          </div>
        </div>
        <div
          className='scp-inner'
          style={{
            backgroundColor: "#" + selectedPost.community?.themeBodyColor,
          }}
        >
          <div className='scp-main'>
            <div className='scp-postcontainer'>
              <div className='scp-posttop'>
                <div className='scp-vote'>
                  <div
                    className='posts-upvote post-votebut'
                    onClick={() => {
                      if (
                        selectedPost.upvotes
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
                      color: selectedPost?.upvotes
                        ?.map((v) => v.id)
                        ?.includes(authState?.id)
                        ? "red"
                        : selectedPost?.downvotes.includes(authState?.id)
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

                    <div
                      className={`scp-comanchor community-hov-${selectedPost?.id}-scp`}
                    >
                      {selectedPost?.community?.tag}
                    </div>
                  </div>

                  <div className='dot-posts'>•</div>

                  <div className='scp-y'>
                    <span>Posted by </span>
                    <span
                      className={`scp-yp hov-user-${selectedPost?.id}-scp`}
                      style={{ marginRight: "4px" }}
                    >
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

                <div
                  className='scp-selectionrow'
                  style={{ userSelect: "none" }}
                >
                  <div className='scp-comment scp-selectionaligncenter'>
                    <CommentSvg id={selectedPost?.id} />
                    <span>{selectedPost?.comments?.length}</span>
                  </div>

                  <div
                    className='scp-share scp-selectionaligncenter scp-but post-share'
                    id={`share-${selectedPost.id}`}
                    onClick={() => {
                      handleShareClick();
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
                      className='scp-modrow threedot'
                      id={`threedot-${selectedPost.id}`}
                      style={{ padding: "2px 4px", height: "20px" }}
                      onClick={() => {
                        handleTDotClick();
                        dispatch(
                          setLinkToCopy(
                            `${window.location.host}/r/${selectedPost.community.name}/comments/${selectedPost.id}`
                          )
                        );
                      }}
                    >
                      <ThreeDot idv={selectedPost?.id} />
                    </div>
                  </div>
                </div>

                <div className='scp-commentparent'>
                  {!commentSearchActive && authState?.id && (
                    <div style={{ marginBottom: "4px" }}>
                      Comment as{" "}
                      <span
                        className='scp-blue'
                        onClick={() =>
                          (window.location.href = `/user/${authState?.name}`)
                        }
                      >
                        u/{authState?.name}
                      </span>
                    </div>
                  )}

                  {authState?.id && (
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
                            cursor: !commentInput.length && "not-allowed",
                            filter: !commentInput.length && "grayscale(1)",
                          }}
                          onClick={() => handleCommentSubmit()}
                        >
                          Comment
                        </button>
                      </div>
                    </div>
                  )}

                  <div className='scp-sortmain'>
                    <SortCommentsMain
                      selectedSort={selectedSort}
                      setShowCommentSortOverlay={setShowCommentSortOverlay}
                      value={searchValue}
                      onchange={setSearchValue}
                    />
                  </div>
                </div>
                {(isTherePreviousQuery || match?.params?.commentid) &&
                  !disablePreviousCsTop && (
                    <div className='cs-top'>
                      <div
                        className='cs-all'
                        style={{ display: !isTherePreviousQuery && "none" }}
                        onClick={() => {
                          nav(-1);
                          dispatch(setScp(null));
                        }}
                      >
                        Back to comments with "{loc.state?.from}"
                      </div>
                      <div
                        className='cs-divider'
                        style={{ display: !isTherePreviousQuery && "none" }}
                      >
                        |
                      </div>

                      <div className='cs-all' onClick={() => setAllComments()}>
                        All comments
                      </div>
                    </div>
                  )}
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
                      ogComment={match?.params?.commentid || null}
                    />
                  </div>
                )
              )}
            </div>

            <a className='scp-cominfocontainer'>
              <CommunityInformation
                selectedCommunity={selectedPost.community}
                anchor={true}
              />
            </a>
          </div>
        </div>

        <div className='scp-clickback' onClick={() => handleCloseOverlay()} />

        <SortCommentsListPopup
          selectedSort={selectedSort}
          setSelectedSort={sortByWhichComments}
          showCommentSortOverlay={showCommentSortOverlay}
          setShowCommentSortOverlay={setShowCommentSortOverlay}
        />

        {shareOverlayState?.display && (
          <ShareOverlaySCP set={setOverlayStateSCP} />
        )}
        {threeState?.display && <ThreeDotOverlaySCP />}
      </div>
    </div>
  );
};

export default SingleCommunityPost;
