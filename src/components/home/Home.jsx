import React, { useEffect, useState } from "react";
import "./home.scss";
import ClipSvg from "./homesvgs/ClipSvg";
import DefaultPfp from "./homesvgs/DefaultPfp";
import ImageIcon from "./homesvgs/ImageIcon";

import { newcommunities } from "./newcommunities/newcommunitiesobj";

import $ from "jquery";
import GreenArrow from "./homesvgs/GreenArrow";
import Post from "./posts/Post";

import { postsobj } from "./posts/postsobj";
import ShareOverlay from "./ShareOverlay";

const Home = () => {
  const [selectedNewCommunity, setSelectedNewCommunity] = useState({});

  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayId, setOverlayId] = useState("");
  const [overlayTop, setOverlayTop] = useState(0);
  const [overlayLeft, setOverlayLeft] = useState(0);

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    let v = 0;
    $(document).click(function (event) {
      var $target = $(event.target);
      if (
        !$target.closest("#share-overlay").length &&
        $("#share-overlay").is(":visible")
      ) {
        if (v === 0) {
          v += 1;
          return;
        } else {
          v = 0;
          setShowOverlay(false);
        }
      }
    });
  }, []);
  console.log(showOverlay);
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

  useEffect(() => {
    $(".input-createpost").focus(() => {
      $(".input-createpost").css("background-color", "#ffffff");

      $(".input-createpost").focusout(() => {
        $(".input-createpost").css("background-color", "#f6f7f8");
      });
    });
  }, []);
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

              <input className='input-createpost' placeHolder='Create Post' />
              <div className='home-iconcontainer'>
                <ImageIcon />
              </div>

              <div className='home-iconcontainer' style={{ marginLeft: "2px" }}>
                <ClipSvg />
              </div>
            </div>
            <div className='posts-container'>
              {postsobj.map((item) => (
                <Post
                  post={item}
                  setOverlayLeft={setOverlayLeft}
                  setOverlayTop={setOverlayTop}
                  setShowOverlay={setShowOverlay}
                  setOverlayId={setOverlayId}
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
          </div>
          <ShareOverlay
            showOverlay={showOverlay}
            overlayLeft={overlayLeft}
            overlayTop={overlayTop}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
