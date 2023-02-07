import React from "react";
import { useDispatch, useSelector } from "react-redux";
import XIcon from "../globalsvg/XIcon";
import { setHrefPath } from "../store/comstyling/hrefpath";
import { toggleDiscard } from "../store/discard/discardChanges";
import "./discard.scss";

import $ from "jquery";

const DiscardChanges = ({ display }) => {
  const dispatch = useDispatch();
  const communityState = useSelector((state) => state.postsindividualcommunity);

  const hrefpath = useSelector((state) => state.hrefpath);
  return (
    <div style={{ display: display ? "block" : "none" }}>
      <div className='discard-parent'>
        <div className='discard-messagecontainer'>
          <div className='discard-i'>
            Discard unsaved changes before leaving?
            <div className='grow' />
            <XIcon f={toggleDiscard} value={false} />
          </div>
          <div className='discard-q'>
            You have made some changes to your community, do you wish to leave
            this menu without saving?
          </div>

          <div className='discard-row'>
            <div
              className='blueborder-button discard-cancel'
              onClick={() => {
                dispatch(toggleDiscard(false));
                dispatch(setHrefPath({}));
              }}
            >
              Cancel
            </div>
            <div
              className='bluebutton-button'
              onClick={() => {
                $(window).unbind("beforeunload"); //unbind the leave message so it does not show

                if (hrefpath?.href) {
                  window.location.href = hrefpath.href;
                } else if (hrefpath?.func) {
                  hrefpath.func(hrefpath?.parameter || "");
                } else {
                  window.location.href = `/r/${communityState.name}`;
                }
              }}
            >
              Discard
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscardChanges;
