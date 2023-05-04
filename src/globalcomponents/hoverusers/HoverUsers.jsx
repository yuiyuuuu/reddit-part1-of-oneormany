import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  initUserHoverOut,
  removeHoverUser,
} from "../../requests/hoverInformation/hoverUserInitFunction";

import HoverUsersMod from "./HoverUsersMod";
import HoverUsersNoMod from "./HoverUsersNoMod";

import "./hu.scss";

const HoverUsers = () => {
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const huState = useSelector((state) => state.huState);

  useEffect(() => {
    initUserHoverOut(dispatch, huState?.class);
    return () => {
      //removes previous mouseleave event listeners
      removeHoverUser(huState?.class);
    };
  }, [huState]);

  return (
    <div
      className='hu-parent'
      style={{
        top: huState.top,
        left: huState.left,
        display: !huState.display && "none",
      }}
    >
      {huState?.community?.moderators
        ?.map((v) => v.id)
        ?.includes(authState?.id) ||
      authState?.id === huState?.community?.ownerId ? (
        <HoverUsersMod huState={huState} />
      ) : (
        <HoverUsersNoMod huState={huState} />
      )}
    </div>
  );
};

export default HoverUsers;
