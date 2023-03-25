//sdgdkjvdtklvsd - fix key

import React from "react";
import { useNavigate } from "react-router";

import CoinSvg from "../svg/CoinSvg";
import Notifications from "../svg/Notifications";
import Avatar from "../svg/Avatar";
import Premium from "../svg/Premium";

const Other = ({ auth, inputValue }) => {
  const nav = useNavigate();

  function showOthers() {
    if (inputValue.length < 1) return {};

    const query = inputValue.toLowerCase();

    const result = {};

    if ("user settings".includes(query)) {
      result.usersettings = true;
    }

    if ("messages".includes(query)) {
      result.messages = true;
    }

    if ("create post".includes(query)) {
      result.createpost = true;
    }

    if ("notifications".includes(query)) {
      result.notifications = true;
    }

    if ("community hubs".includes(query)) {
      result.communityhubs = true;
    }

    if ("coins".includes(query)) {
      result.coins = true;
    }

    if ("premium".includes(query)) {
      result.premium = true;
    }

    if ("avatar".includes(query)) {
      result.avatar = true;
    }

    return Object.keys(result).length > 0 ? result : null;
  }

  return (
    <div>
      <div
        className='ln-subtitle'
        style={{
          display: !showOthers() && inputValue.length > 0 && "none",
        }}
      >
        OTHER
      </div>

      <div
        className='ln-sub'
        style={{
          display:
            inputValue.length > 0 && !showOthers()?.usersettings && "none",
        }}
      >
        <img className='ln-pfp' src='/assets/defaultpfp.png' />
        <span className='ln-des'>User Settings</span>
      </div>

      <div
        className='ln-sub'
        style={{
          display: inputValue.length > 0 && !showOthers()?.messages && "none",
        }}
      >
        <img className='ln-pfp' src='/assets/defaultpfp.png' />
        <span className='ln-des'>Messages</span>
      </div>

      <div
        className='ln-sub'
        onClick={() => nav("/submit")}
        style={{
          display: inputValue.length > 0 && !showOthers()?.createpost && "none",
        }}
      >
        <div className='ln-plus' />
        <span className='ln-des'>Create Post</span>
      </div>

      <div
        className='ln-sub'
        style={{
          display:
            inputValue.length > 0 && !showOthers()?.notifications && "none",
        }}
      >
        <Notifications />
        <span className='ln-des'>Notifications</span>
      </div>

      <div
        className='ln-sub'
        style={{
          display:
            inputValue.length > 0 && !showOthers()?.communityhubs && "none",
        }}
      >
        <img
          src='/assets/global/CommunityHubs.png'
          style={{ width: "20px", height: "20px" }}
        />
        <span className='ln-des'>Community Hubs</span>
      </div>

      <div
        className='ln-sub'
        style={{
          display: inputValue.length > 0 && !showOthers()?.coins && "none",
        }}
      >
        <CoinSvg />
        <span className='ln-des'>Coins</span>
      </div>

      <div
        className='ln-sub'
        style={{
          display: inputValue.length > 0 && !showOthers()?.premium && "none",
        }}
      >
        <Premium />
        <span className='ln-des'>Premium</span>
      </div>

      <div
        className='ln-sub'
        style={{
          display: inputValue.length > 0 && !showOthers()?.avatar && "none",
        }}
      >
        <Avatar />
        <span className='ln-des'>Avatar</span>
      </div>
    </div>
  );
};

export default Other;
