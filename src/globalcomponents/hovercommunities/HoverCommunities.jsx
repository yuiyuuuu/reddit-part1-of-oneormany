import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { dispatchSetHcState } from "./hovercommunitiesstate";

import DefaultCommunitiesIcon from "../../components/communities/communitiessvg/DefaultCommunitiesIcon";

import $ from "jquery";

import "./hc.scss";

const HoverCommunities = () => {
  const dispatch = useDispatch();

  const hcState = useSelector((state) => state.hcState);

  useEffect(() => {
    let timer = "";

    $(`.community-hov-${hcState?.id}, .hc-parent`)
      .hover(function (e) {
        if (timer) clearTimeout(timer);
      })
      .mouseleave(function (e) {
        timer = setTimeout(function () {
          dispatch(dispatchSetHcState({ display: false }));
        }, 50);
      });

    return () => {
      //removes previous mouseleave event listeners
      $(`.community-hov-${hcState?.id}, .hc-parent`).off("mouseleave");
      $(`.community-hov-${hcState?.id}, .hc-parent`).off("hover");
    };
  }, [hcState]);

  return (
    <div
      className='hc-parent'
      style={{
        display: !hcState.display && "none",
        top: hcState?.top,
        left: hcState?.left,
      }}
    >
      <div className='hc-inner'>
        <div className='hc-top'>
          <div className='hc-imgcontainer'>
            {hcState?.community?.iconImage ? (
              <img
                className='hc-icon'
                src={`data:image/png;base64,${hcState?.community?.iconImage}`}
              />
            ) : (
              <DefaultCommunitiesIcon
                height={32}
                fillcolor={`#${hcState?.community?.themeBaseColor}`}
              />
            )}
          </div>

          <div className='hc-comname'>r/{hcState?.community?.name}</div>
        </div>

        <div className='hc-mem'>
          <div
            className='hc-memcol'
            style={{ borderRight: "1px solid #edeff1" }}
          >
            <div>{hcState?.community?.users?.length}</div>
            <div className='hc-st'>Members</div>
          </div>
          <div className='hc-memcol' style={{ paddingLeft: "12px" }}>
            <div>1.2k</div>
            <div className='hc-st'>Online</div>
          </div>
        </div>

        <div className='hc-desc'>{hcState?.community?.description}</div>

        <div
          className='bluebutton-button'
          style={{
            backgroundColor: `#${hcState?.community?.themeHighlightColor}`,
          }}
          onClick={() =>
            (window.location.href = `/r/${hcState?.community?.name}`)
          }
        >
          View Community
        </div>
      </div>
    </div>
  );
};

export default HoverCommunities;
