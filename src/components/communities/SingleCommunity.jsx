import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommunity,
  handleCommunityDownvote,
  handleCommunityRemoveDownvote,
  handleCommunityRemoveUpvote,
  joinCommunity,
  leaveCommunity,
} from "../../store/posts-individualcommunity";
import CommunityStyling from "./ModeratorTools/styling/CommunityStyling";

import { toggleCommunityStyling } from "../../store/communitystyling";

import "./communities.scss";

import $ from "jquery";

import DefaultPfp from "../home/homesvgs/DefaultPfp";
import DefaultCommunityIconBig from "./communitiessvg/DefaultCommunityIconBig";
import ImageIcon from "../home/homesvgs/ImageIcon";
import ClipSvg from "../home/homesvgs/ClipSvg";
import ThreeDotOverlay from "../home/overlays/ThreeDotOverlay";
import ShareOverlay from "../home/overlays/ShareOverlay";
import Post from "../home/posts/Post";
import Communities404 from "./Communities404";
import { clearPostState, fetchSpecificCommunityPosts } from "../../store/posts";
import SingleCommunityRight from "./SingleCommunityRight/SingleCommunityRight";
import SingleCommunityPost from "./SingleCommunityPost/SingleCommunityPost";
import { handleCommunityUpvote } from "../../store/posts-individualcommunity";
import { sorting } from "../../requests/sortingfunction";
import { dispatchSetAOS } from "../../globalcomponents/authoverlaysignup/authOverlaySignupStates";

const SingleCommunity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const communityState = useSelector((state) => state.postsindividualcommunity);
  const authState = useSelector((state) => state.auth);
  const postState = useSelector((state) => state.posts);
  const communityStylingState = useSelector((state) => state.communityStyling);
  const iconImageState = useSelector((state) => state.iconImage);

  //share overlay
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayId, setOverlayId] = useState("");
  const [overlayTop, setOverlayTop] = useState(0);
  const [overlayLeft, setOverlayLeft] = useState(0);

  //three dots overlay
  const [showOverlay2, setShowOverlay2] = useState(false);
  const [overlayId2, setOverlayId2] = useState("");
  const [overlayTop2, setOverlayTop2] = useState(0);
  const [overlayLeft2, setOverlayLeft2] = useState(0);

  //scroll position
  const [scrollPos, setScrollpos] = useState(0);

  //user ids of community
  const [userIds, setUserIds] = useState([]);

  //loading state
  const [loading, setLoading] = useState(true);
  const [postLoad, setPostLoad] = useState(true);

  //single community post
  const [selectedPost, setSelectedPost] = useState(null);

  //resize handling
  const resizeShare = useCallback(() => {
    setShowOverlay(false);
  }, []);

  const resizeTdot = useCallback(() => {
    setShowOverlay2(false);
  }, []);

  const scroll = useCallback(() => {
    //prevent scrollpos being updated if either overlay is visible
    if (
      $("#share-overlay").is(":visible") ||
      $("#tdot-overlay").is(":visible")
    ) {
      return;
    }

    setScrollpos(window.scrollY);
  }, []);

  function navigateSubmit(y) {
    if (authState.id) {
      if (y) {
        window.location.href = `/submit/r/${communityState.name}/` + y;
      } else {
        window.location.href = `/submit/r/${communityState.name}`;
      }
    } else {
      window.location.href = "/login";
    }
  }

  function handleJoinCommunity() {
    if (!authState?.id) {
      dispatch(dispatchSetAOS({ display: true, which: "joincommunity" }));
    } else {
      dispatch(joinCommunity(authState.id, communityState.id));
    }
  }

  function handleLeaveCommunity() {
    dispatch(leaveCommunity(authState.id, communityState.id));
  }

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
    dispatch(handleCommunityUpvote(info)).then((res) => {
      setSelectedPost(res);
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
    dispatch(handleCommunityDownvote(info)).then((res) => {
      setSelectedPost(res);
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

    dispatch(handleCommunityRemoveUpvote(info)).then((res) => {
      setSelectedPost(res);
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

    dispatch(handleCommunityRemoveDownvote(info)).then((res) => {
      setSelectedPost(res);
    });
  }

  function handleUpvote2(post) {
    if (!authState?.id) {
      dispatch(dispatchSetAOS({ display: true, which: "vote" }));
      return;
    }

    const info = {
      postid: post.id,
      userid: authState.id,
      communityid: post.community.id,
    };
    dispatch(handleCommunityUpvote(info));
  }

  function handleDownvote2(post) {
    if (!authState?.id) {
      dispatch(dispatchSetAOS({ display: true, which: "vote" }));
      return;
    }

    const info = {
      postid: post.id,
      userid: authState.id,
      communityid: post.community.id,
    };
    dispatch(handleCommunityDownvote(info));
  }

  function handleRemoveUpvote2(post) {
    if (!authState?.id) {
      dispatch(dispatchSetAOS({ display: true, which: "vote" }));
      return;
    }

    const info = {
      postid: post.id,
      userid: authState.id,
    };

    dispatch(handleCommunityRemoveUpvote(info));
  }

  function handleRemoveDownvote2(post) {
    if (!authState?.id) {
      dispatch(dispatchSetAOS({ display: true, which: "vote" }));
      return;
    }

    const info = {
      postid: post.id,
      userid: authState.id,
    };

    dispatch(handleCommunityRemoveDownvote(info));
  }

  //set userids
  useEffect(() => {
    const userids = communityState.users?.map((user) => user.id);
    if (userids) {
      setUserIds(userids);
    }
  }, [communityState]);

  // $(window).on("load", () => {
  //   $(".hide").css("display", "none");
  // });

  $(document).ready(() => {
    $(".hide").css("display", "none");
  });

  //change button text to leave when hovered
  //only runs if current user is joined
  useEffect(() => {
    if (userIds.includes(authState.id)) {
      $(document).ready(() => {
        $(".communities-joinbut").hover(
          () => {
            $("#joined-hover").html("Leave");
          },
          () => {
            $("#joined-hover").html("Joined");
          }
        );
      });
    }
  }, [userIds]);

  useEffect(() => {
    window.addEventListener("resize", resizeShare);
    window.addEventListener("resize", resizeTdot);
    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("resize", resizeShare);
      window.removeEventListener("resize", resizeTdot);
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  //when shareoverlay or threedotoverlay is visible and user clicks elsewhere
  //we will close the overlay
  useEffect(() => {
    $(document).click(function (event) {
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
        setShowOverlay2(false);
      }

      if (
        !$target.closest("#share-overlay").length &&
        $("#share-overlay").is(":visible") &&
        run
      ) {
        setShowOverlay(false);
      }
    });
  }, []);

  useEffect(() => {
    const id = params.id;
    dispatch(fetchCommunity(id));
    dispatch(fetchSpecificCommunityPosts(id));

    return () => {
      dispatch(clearPostState()); //clear post state
    };
  }, []);

  useEffect(() => {
    const postid = params?.postid;

    if (postid) {
      setSelectedPost(communityState.posts?.find((p) => p.id === postid));
    } else {
      setSelectedPost(null);
    }

    setPostLoad(false);
  }, [communityState, window.location.href]);

  //set min height of mainbot
  useEffect(() => {
    document.addEventListener("readystatechange", () => {
      const windowheight = window.innerHeight;
      const bannerheight = document
        .querySelector(".communities-bannertop")
        .getBoundingClientRect().height;
      const nameContainerHeight = document
        .querySelector(".communities-namecontainer")
        .getBoundingClientRect().height;

      $(".communities-mainbot").css(
        "min-height",
        windowheight - bannerheight - nameContainerHeight - 48 + "px"
      );

      $(".communities-backgroundimage").css(
        "height",
        windowheight - bannerheight - nameContainerHeight - 48 + "px"
      );
    });
  }, []);

  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedPost]);

  useEffect(() => {
    if (loading) return;

    const mainbot = document
      .querySelector(".communities-mainbot")
      ?.getBoundingClientRect();

    const bannerheight = document
      .querySelector(".communities-bannertop")
      ?.getBoundingClientRect()?.height;
    const nameContainerHeight = document
      .querySelector(".communities-namecontainer")
      ?.getBoundingClientRect()?.height;

    $(".communities-backgroundimage").css("width", mainbot?.width);

    $(".communities-backgroundimage").css(
      "height",
      mainbot?.height + bannerheight + nameContainerHeight + "px"
    );

    $(".communities-backgroundimage").css("left", mainbot?.left);

    $(".communities-backgroundimage").css("top", "48px");
  }, [
    postState,
    communityState,
    document.querySelector(".communities-mainbot")?.getBoundingClientRect()
      .height,
    loading,
  ]);

  useEffect(() => {
    if (loading) return;
    $(document).ready(() => {
      if (!window.localStorage.getItem("token")) {
        dispatch(toggleCommunityStyling(false));
        return;
      }

      if (!communityState.id) return;

      if (
        authState.id !== communityState?.owner?.id &&
        !communityState.moderators?.includes(authState.id)
      ) {
        dispatch(toggleCommunityStyling(false));
        return;
      } else {
        const styleParms = new URLSearchParams(
          new URL(window.location.href).search
        ).getAll("styling")[0];

        dispatch(toggleCommunityStyling(styleParms === "true"));
      }
    });
  }, [loading, authState, communityState]);

  $(document).ready(() => {
    setLoading(false);
  });

  if (communityState !== "not found" && (loading || postLoad)) {
    return "loading";
  }

  if (communityState === "not found") {
    return <Communities404 />;
  }

  return (
    <div style={{ overflow: "hidden" }}>
      {communityStylingState && <CommunityStyling />}
      <div
        className='communities-main'
        style={{ marginLeft: communityStylingState && "284px" }}
      >
        <div
          className='communities-bannertop'
          id={`communities-banner${communityState.id}`}
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
          }}
        />
        <div style={{ width: "100%", backgroundColor: "white" }}>
          <img
            className='communities-backgroundimage'
            style={{
              backgroundImage:
                communityState.image &&
                `url(data:image/png;base64,${communityState.image})`,
            }}
          />
          <div style={{ width: "100%" }}>
            <div className='communities-namecontainer'>
              <div className='communities-nameicon'>
                <div style={{ marginTop: "-14px", marginBottom: "12px" }}>
                  {!communityState?.iconImage && !iconImageState ? (
                    <DefaultCommunityIconBig
                      fillcolor={"#" + communityState?.themeBaseColor}
                      height={70}
                      community={communityState}
                    />
                  ) : (
                    <img
                      src={`data:image/png;base64,${
                        iconImageState || communityState?.iconImage
                      }`}
                      className='communities-iconimg'
                    />
                  )}
                </div>
                <div className='name-flexrow'>
                  <div className='name-flexcol'>
                    <div className='communityname-text'>
                      {communityState.name}
                    </div>
                    <div className='communitytag-text'>
                      {communityState.tag}
                    </div>
                  </div>
                  <button
                    className='communities-joinbut'
                    onClick={() =>
                      userIds.includes(authState.id)
                        ? handleLeaveCommunity()
                        : handleJoinCommunity()
                    }
                    style={{
                      backgroundColor: userIds.includes(authState.id)
                        ? "transparent"
                        : "#" + communityState.themeHighlightColor,
                      color: !userIds.includes(authState.id)
                        ? "#FFFFFF"
                        : "#" + communityState.themeHighlightColor,
                      border: !userIds.includes(authState.id)
                        ? "none"
                        : "1px solid" +
                          "#" +
                          communityState.themeHighlightColor,
                    }}
                  >
                    {userIds.includes(authState.id) ? (
                      <span id='joined-hover'>Joined</span>
                    ) : (
                      "Join"
                    )}
                  </button>
                </div>
              </div>

              <div className='communities-postsoption'>Posts</div>
            </div>
          </div>

          <div
            className='communities-mainbot'
            style={{
              backgroundColor:
                !communityState.image && "#" + communityState.themeBodyColor,
            }}
          >
            <div className='communities-leftcontainer'>
              <div className='home-createpost'>
                <a className='anchor-createpost'>
                  {authState.photo ? (
                    <img src={authState.photo} />
                  ) : (
                    <DefaultPfp />
                  )}
                </a>

                <a
                  href={`/submit/r/${communityState.name}`}
                  className='input-createpost'
                  state={{ from: communityState.tag }}
                >
                  <input className='input-con' placeHolder='Create Post' />
                </a>
                <div className='home-iconcontainer'>
                  <ImageIcon navigateSubmit={navigateSubmit} />
                </div>

                <div
                  className='home-iconcontainer'
                  style={{ marginLeft: "2px" }}
                >
                  <ClipSvg navigateSubmit={navigateSubmit} />
                </div>
              </div>

              <div style={{ marginTop: "16px" }}>
                {communityState.posts?.sort(sorting).map((item) => (
                  <Post
                    post={item}
                    setOverlayLeft={setOverlayLeft}
                    setOverlayTop={setOverlayTop}
                    setShowOverlay={setShowOverlay}
                    setOverlayId={setOverlayId}
                    overlayId={overlayId}
                    showOverlay={showOverlay}
                    setOverlayLeft2={setOverlayLeft2}
                    setOverlayTop2={setOverlayTop2}
                    setShowOverlay2={setShowOverlay2}
                    setOverlayId2={setOverlayId2}
                    overlayId2={overlayId2}
                    showOverlay2={showOverlay2}
                    setScrollpos={setScrollpos}
                    authState={authState}
                    handleUpvote={handleUpvote2}
                    handleRemoveUpvote={handleRemoveUpvote2}
                    handleDownvote={handleDownvote2}
                    handleRemoveDownvote={handleRemoveDownvote2}
                  />
                ))}
              </div>
            </div>
            <SingleCommunityRight communityState={communityState} />
            <ShareOverlay
              showOverlay={showOverlay}
              overlayLeft={overlayLeft}
              overlayTop={overlayTop}
              scrollPos={scrollPos}
            />

            <ThreeDotOverlay
              showOverlay2={showOverlay2}
              overlayTop2={overlayTop2}
              overlayLeft2={overlayLeft2}
              scrollPos={scrollPos}
            />
          </div>
        </div>
      </div>
      <SingleCommunityPost
        selectedPost={selectedPost}
        nav={navigate}
        selectedCommunity={communityState}
        handleUpvote={handleUpvote}
        handleDownvote={handleDownvote}
        handleRemoveUpvote={handleRemoveUpvote}
        handleRemoveDownvote={handleRemoveDownvote}
        scrollPos={scrollPos}
      />
    </div>
  );
};

export default SingleCommunity;
