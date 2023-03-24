//sdgdkjvdtklvsd - fix key

import React from "react";
import { useNavigate } from "react-router";

import CoinSvg from "../svg/CoinSvg";
import Notifications from "../svg/Notifications";
import Avatar from "../svg/Avatar";
import Premium from "../svg/Premium";

const Other = ({ auth }) => {
  const nav = useNavigate();

  return (
    <div>
      <div className='ln-subtitle'>OTHER</div>

      <div className='ln-sub'>
        <img className='ln-pfp' src='/assets/defaultpfp.png' />
        <span className='ln-des'>User Settings</span>
      </div>

      <div className='ln-sub'>
        <img className='ln-pfp' src='/assets/defaultpfp.png' />
        <span className='ln-des'>Messages</span>
      </div>

      <div className='ln-sub' onClick={() => nav("/submit")}>
        <div className='ln-plus' />
        <span className='ln-des'>Create Post</span>
      </div>

      <div className='ln-sub'>
        <Notifications />
        <span className='ln-des'>Notifications</span>
      </div>

      <div className='ln-sub'>
        <img
          src='/assets/global/CommunityHubs.png'
          style={{ width: "20px", height: "20px" }}
        />
        <span className='ln-des'>Community Hubs</span>
      </div>

      <div className='ln-sub'>
        <CoinSvg />
        <span className='ln-des'>Coins</span>
      </div>

      <div className='ln-sub'>
        <Premium />
        <span className='ln-des'>Premium</span>
      </div>

      <div className='ln-sub'>
        <Avatar />
        <span className='ln-des'>Avatar</span>
      </div>
    </div>
  );
};

export default Other;
