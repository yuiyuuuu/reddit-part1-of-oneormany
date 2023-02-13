import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";

import "./home.scss";

import { clearPostState, fetchPosts } from "../../store/posts";
import { addCommunity } from "../../store/auth";
import { toggleCreateCommunity } from "../../store/nav-createcommunity";

import ClipSvg from "./homesvgs/ClipSvg";
import DefaultPfp from "./homesvgs/DefaultPfp";
import ImageIcon from "./homesvgs/ImageIcon";
import { newcommunities } from "./newcommunities/newcommunitiesobj";
import GreenArrow from "./homesvgs/GreenArrow";
import Post from "./posts/Post";
import ShareOverlay from "./overlays/ShareOverlay";
import ThreeDotOverlay from "./overlays/ThreeDotOverlay";
import TOS from "./TOS";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const authState = useSelector((state) => state.auth);

  const [selectedNewCommunity, setSelectedNewCommunity] = useState({});
  const [scrollPos, setScrollpos] = useState(0);

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

  // const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  function joinNewCommunity(communityid) {
    const info = {
      communityid: communityid,
      userid: authState.id,
    };

    dispatch(addCommunity(info));
  }

  function navigateSubmit(y) {
    if (authState.id) {
      if (y) {
        window.location.href = "/submit/" + y;
      } else {
        window.location.href = "/submit";
      }
    } else {
      window.location.href = "/login";
    }
  }

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    const v = dispatch(fetchPosts());

    return () => {
      dispatch(clearPostState()); //set posts to empty array
    };
  }, []);

  //when shareoverlay or threedotoverlay is visible and user clicks elsewhere
  //we will close the overlay
  useEffect(() => {
    $(document)
      .off()
      .click(function (event) {
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

  //top communities random generator
  useEffect(() => {
    const v = randomIntFromInterval(1, 4);

    switch (v) {
      case 1:
        setSelectedNewCommunity(newcommunities.news);
        break;
      case 2:
        setSelectedNewCommunity(newcommunities.aww);
        break;

      case 3:
        setSelectedNewCommunity(newcommunities.gaming);
        break;

      case 4:
        setSelectedNewCommunity(newcommunities.sports);
        break;
    }
  }, []);

  //create post input
  useEffect(() => {
    $(".input-createpost")
      .off()
      .focus(() => {
        $(".input-createpost").css("background-color", "#ffffff");

        $(".input-createpost").focusout(() => {
          $(".input-createpost").css("background-color", "#f6f7f8");
        });
      });
  }, []);

  $(document).ready(() => {
    setLoading(false);
  });

  if (loading) return "loading";

  return (
    <div>
      <div className='heightholder' />
      <div className='parent-home'>
        <div className='inner-home'>
          <div className='home-feed'>
            <div className='home-createpost'>
              <a className='anchor-createpost'>
                <DefaultPfp />
              </a>

              <div
                onClick={() => navigateSubmit()}
                className='input-createpost'
              >
                <input className='input-con' placeHolder='Create Post' />
              </div>
              <div className='home-iconcontainer'>
                <ImageIcon history={navigate} navigateSubmit={navigateSubmit} />
              </div>

              <div className='home-iconcontainer' style={{ marginLeft: "2px" }}>
                <ClipSvg history={navigate} navigateSubmit={navigateSubmit} />
              </div>
            </div>
            <div className='posts-container'>
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

          <div className='home-newcommunities'>
            <div className='newcommunities'>
              <div
                className='newcommunities-bgimage'
                style={{
                  backgroundImage: `url(${selectedNewCommunity.banner})`,
                }}
              >
                <div className='top-communities'>
                  Top<span>&nbsp; {selectedNewCommunity.name}&nbsp;</span>{" "}
                  Communities
                </div>
              </div>
              {selectedNewCommunity.communities?.map((item) => (
                <div
                  className='li-newcommunities'
                  key={item.id}
                  style={{
                    borderBottom:
                      item.id ===
                      selectedNewCommunity.communities[
                        selectedNewCommunity.communities.length - 1
                      ].id
                        ? "none"
                        : "",
                  }}
                >
                  <a className='anchor-newcommunities' href={`/r/${item.id}`}>
                    <div className='container-li'>
                      <span className='number-list'>{item.index}</span>
                      <GreenArrow />
                      <img
                        src={item.image}
                        className='imageicon-newcommunities'
                      />

                      <div className='name-community'>{item.name}</div>
                    </div>
                  </a>

                  <div
                    className='join-newcommunities'
                    onClick={() => joinNewCommunity(item.id)}
                  >
                    Join
                  </div>
                </div>
              ))}
              <div
                style={{
                  padding: "12px",
                  backgroundColor: "white",
                  borderBottomRightRadius: "4px",
                  borderBottomLeftRadius: "4px",
                }}
              >
                <div className='viewall-newcommunities'>View All</div>
              </div>
            </div>

            <div className='home-right2'>
              <div className='right2-inner'>
                <div className='banner-right2' />
                <div
                  style={{
                    padding: "12px 12px 12px 12px",
                  }}
                >
                  <div className='right2-imagecontainer'>
                    <div className='right2-image' />
                    <div
                      style={{
                        marginTop: "30px",
                        marginLeft: "10px",
                        fontSize: "16px",
                      }}
                    >
                      Home
                    </div>
                  </div>

                  <div className='right2-text'>
                    Your personal Reddit frontpage. Come here to check in with
                    your favorite communities.
                  </div>

                  <div className='right2-divider' />

                  <div className='right2-buttoncontainer'>
                    {authState.id ? (
                      <a
                        className='right2-button right2-createpost'
                        href='/submit'
                      >
                        Create Post
                      </a>
                    ) : (
                      <a
                        className='right2-button right2-createpost'
                        href='/login'
                      >
                        Create Post
                      </a>
                    )}
                    <div
                      className='right2-button right2-createcommunity'
                      onClick={() => {
                        if (authState?.id) {
                          dispatch(toggleCreateCommunity(true));
                        } else {
                          window.location.href = "/login";
                        }
                      }}
                    >
                      Create Community
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <TOS />
            <div
              className='home-gototop'
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Back to Top
            </div>
          </div>
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
  );
};

export default Home;
