import React from "react";

import "./lnnl.scss";

import { explore } from "../../../components/nav/popups/sectionobj";

import HomeIcon from "../svg/HomeIcon";
import PopularIcon from "../svg/PopularIcon";
import LeftNavUpperMap from "./LeftNavUpperMap";

const LeftNavNL = () => {
  return (
    <div className='lnnl-parent'>
      <div className='lnnl-inner'>
        <div className='ln-subtitle'>Feeds</div>
        <div className='ln-sub'>
          <HomeIcon idv='notloggedin' />
          <span className='ln-des'>Home</span>
        </div>

        <div className='ln-sub'>
          <PopularIcon idv='notloggedin' />
          <span className='ln-des'>Popular</span>
        </div>

        <div className='ln-subtitle'>Recent</div>

        <div className='ln-subtitle'>Topics</div>

        {explore.map((item) => (
          <LeftNavUpperMap stuff={item} />
        ))}
      </div>

      <div className='lnnl-bot'>
        <div className='lnnl-i'>
          Create an account to follow your favorite communities and start taking
          part in conversations.
        </div>

        <button className='bluebutton-button lnnl-f'>Join Reddit</button>

        <div className='lnnl-line' />
      </div>
    </div>
  );
};

export default LeftNavNL;
