import React, { useEffect } from "react";
import "./home.scss";
import ClipSvg from "./homesvgs/ClipSvg";
import DefaultPfp from "./homesvgs/DefaultPfp";
import ImageIcon from "./homesvgs/ImageIcon";

import $ from "jquery";

const Home = () => {
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
          </div>

          <div className='home-newcommunities'>Right</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
