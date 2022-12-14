import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommunity,
  joinCommunity,
  leaveCommunity,
} from "../../store/posts-individualcommunity";

import "./communities.scss";

import $ from "jquery";

import DefaultPfp from "../home/homesvgs/DefaultPfp";
import DefaultCommunitiesIcon from "./communitiessvg/DefaultCommunitiesIcon";
import ImageIcon from "../home/homesvgs/ImageIcon";
import ClipSvg from "../home/homesvgs/ClipSvg";
import ThreeDotOverlay from "../home/overlays/ThreeDotOverlay";
import ShareOverlay from "../home/overlays/ShareOverlay";
import Post from "../home/posts/Post";
import { sorting } from "../../requests/sortingfunction";
import Communities404 from "./Communities404";

const SingleCommunity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const postState = useSelector((state) => state.postsindividualcommunity);
  const authState = useSelector((state) => state.auth);

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

  const [posts, setPosts] = useState([]);
  //user ids of community
  const [userIds, setUserIds] = useState([]);

  //loading state
  const [loading, setLoading] = useState(true);

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

  function handleJoinCommunity() {
    dispatch(joinCommunity(authState.id, postState.id));
  }

  function handleLeaveCommunity() {
    dispatch(leaveCommunity(authState.id, postState.id));
  }

  //set userids
  useEffect(() => {
    const userids = postState.users?.map((user) => user.id);
    if (userids) {
      setUserIds(userids);
    }
  }, [postState]);

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

  //set posts in posts usestate
  useEffect(() => {
    if (postState.id) {
      const posts = postState.posts.sort(sorting);
      setPosts(posts);
    }
  }, [postState]);

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
    setLoading(false);
  }, []);

  if (postState !== "not found" && loading) {
    return "loading";
  }

  if (postState === "not found") {
    return <Communities404 />;
  }

  return (
    <div>
      <div className='communities-main'>
        <div className='communities-bannertop' />
        <div style={{ width: "100%", backgroundColor: "white" }}>
          <div className='communities-namecontainer'>
            <div className='communities-nameicon'>
              <div style={{ marginTop: "-14px", marginBottom: "12px" }}>
                <DefaultCommunitiesIcon fillcolor={""} />
              </div>
              <div className='name-flexrow'>
                <div className='name-flexcol'>
                  <div className='communityname-text'>{postState.name}</div>
                  <div className='communitytag-text'>{postState.tag}</div>
                </div>
                <button
                  className='communities-joinbut'
                  onClick={() =>
                    userIds.includes(authState.id)
                      ? handleLeaveCommunity()
                      : handleJoinCommunity()
                  }
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

          <div className='communities-mainbot'>
            <div className='communities-leftcontainer'>
              <div className='home-createpost'>
                <a className='anchor-createpost'>
                  <DefaultPfp />
                </a>

                <a href='/submit' className='input-createpost'>
                  <input className='input-con' placeHolder='Create Post' />
                </a>
                <div className='home-iconcontainer'>
                  <ImageIcon history={navigate} />
                </div>

                <div
                  className='home-iconcontainer'
                  style={{ marginLeft: "2px" }}
                >
                  <ClipSvg history={navigate} />
                </div>
              </div>

              <div style={{ marginTop: "16px" }}>
                {posts.map((item) => (
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
                  />
                ))}
              </div>
            </div>
            <div className='communities-rightcontainer'>L</div>
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
    </div>
  );
};

export default SingleCommunity;
