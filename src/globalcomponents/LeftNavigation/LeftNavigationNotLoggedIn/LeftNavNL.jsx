import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import "./lnnl.scss";

import { explore } from "../../../components/nav/popups/sectionobj";

import { dispatchSetAOS } from "../../authoverlaysignup/authOverlaySignupStates";

import HomeIcon from "../svg/HomeIcon";
import PopularIcon from "../svg/PopularIcon";
import LeftNavUpperMap from "./LeftNavUpperMap";
import DefaultCommunityIcon from "../../../components/communities/communitiessvg/DefaultCommunitiesIcon";

const LeftNavNL = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const authState = useSelector((state) => state.auth);

  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const v = JSON.parse(window.localStorage.getItem("nlrecent"));

    if (!v?.length) return;

    setRecent(v.reverse());
  }, [window.localStorage.getItem("nlrecent")]);

  return (
    <div className='lnnl-parent' style={{ display: authState?.id && "none" }}>
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

        <div
          className='ln-subtitle'
          style={{ display: recent.length < 1 && "none" }}
        >
          Recent
        </div>

        {recent.map((community) => (
          <div className='ln-sub' onClick={() => nav(`/r/${community.name}`)}>
            <div className='ln-communityicon'>
              {community?.iconImage ? (
                <img
                  className='ln-img'
                  src={`data:image/png;base64,${community?.iconImage}`}
                />
              ) : (
                <DefaultCommunityIcon
                  fillcolor={"#" + community.themeBaseColor}
                  height={20}
                  community={community}
                />
              )}
            </div>
            <span className='ln-des'>r/{community.name}</span>
          </div>
        ))}

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

        <button
          className='bluebutton-button lnnl-f'
          onClick={() => dispatch(dispatchSetAOS({ display: true, which: "" }))}
        >
          Join Reddit
        </button>

        <div className='lnnl-line' />
      </div>
    </div>
  );
};

export default LeftNavNL;
