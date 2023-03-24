import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { dispatchSetLeftNavState } from "./leftnavigationstates";

import "./leftnav.scss";

import XIconIdColor from "../../globalsvg/XIconIdColor";
import ModQueue from "./svg/ModQueue";
import ModMail from "./svg/ModMail";
import DefaultCommunityIcon from "../../components/communities/communitiessvg/DefaultCommunitiesIcon";
import YourCommunities from "./smallcomponents/YourCommunities";
import Feeds from "./smallcomponents/Feeds";
import Other from "./smallcomponents/Other";

const LeftNavigation = ({ lnState }) => {
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  const [inputValue, setInputValue] = useState("");

  function sortAlphabetically(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  return (
    <div>
      <div
        className='ln-parent'
        style={{ display: (!lnState || !authState?.id) && "none" }}
      >
        <div className='ln-x'>
          <XIconIdColor
            f={dispatchSetLeftNavState}
            v={false}
            color={"#878a8c"}
            size={20}
            dis={true}
            id='leftnav'
          />
        </div>

        <div className='ln-inner'>
          <div className='ln-input'>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='Filter'
              className='ln-in'
            />
          </div>

          <div className='ln-subtitle'>MODERATING</div>
          <a className='ln-sub' href='/r/mod/about/modqueue'>
            <ModQueue />
            <span className='ln-des'>Mod Queue</span>
          </a>

          <div className='ln-sub'>
            <ModMail />
            <span className='ln-des'>Modmail</span>
          </div>

          <a className='ln-sub' href='/r/mod'>
            <ModQueue />
            <span className='ln-des'>r/Mod</span>
          </a>

          {authState?.moderatorCommunities
            ?.concat(authState?.communityOwner)
            .sort(sortAlphabetically)
            .map((community) => (
              <a className='ln-sub' href={`/r/${community.name}`}>
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
              </a>
            ))}

          <YourCommunities
            auth={authState}
            sortAlphabetically={sortAlphabetically}
          />

          <Feeds />

          <Other auth={authState} />
        </div>
      </div>
    </div>
  );
};

export default LeftNavigation;
