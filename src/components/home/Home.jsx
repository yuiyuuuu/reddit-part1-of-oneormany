import React, { useCallback, useEffect, useState } from "react";
import "./home.scss";
import ClipSvg from "./homesvgs/ClipSvg";
import DefaultPfp from "./homesvgs/DefaultPfp";
import ImageIcon from "./homesvgs/ImageIcon";

import { newcommunities } from "./newcommunities/newcommunitiesobj";

import $ from "jquery";
import GreenArrow from "./homesvgs/GreenArrow";
import Post from "./posts/Post";

import { postsobj } from "./posts/postsobj";
import ShareOverlay from "./overlays/ShareOverlay";
import ThreeDotOverlay from "./overlays/ThreeDotOverlay";
import TOS from "./TOS";
import { useNavigate } from "react-router-dom";
import { makeGetRequest } from "../../requests/helperFunction";

const Home = () => {
  const navigate = useNavigate();

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

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(posts);
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(async () => {
    const v = await makeGetRequest("posts");

    setPosts(v);
    setLoading(false);
  }, []);

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
    $(".input-createpost").focus(() => {
      $(".input-createpost").css("background-color", "#ffffff");

      $(".input-createpost").focusout(() => {
        $(".input-createpost").css("background-color", "#f6f7f8");
      });
    });
  }, []);

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

              <a href='/submit' className='input-createpost'>
                <input className='input-con' placeHolder='Create Post' />
              </a>
              <div className='home-iconcontainer'>
                <ImageIcon history={navigate} />
              </div>

              <div className='home-iconcontainer' style={{ marginLeft: "2px" }}>
                <ClipSvg history={navigate} />
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
                  <a className='anchor-newcommunities'>
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

                  <a href={`/r/${item.id}`} className='join-newcommunities'>
                    Join
                  </a>
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
                    <div className='right2-button right2-createpost'>
                      Create Post
                    </div>
                    <div className='right2-button right2-createcommunity'>
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
