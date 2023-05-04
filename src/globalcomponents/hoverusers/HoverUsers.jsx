import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { dispatchSetHuState } from "./hoverUserStates";

import $ from "jquery";

import HoverUsersMod from "./HoverUsersMod";
import HoverUsersNoMod from "./HoverUsersNoMod";

import "./hu.scss";

const HoverUsers = () => {
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const huState = useSelector((state) => state.huState);

  useEffect(() => {
    let timer = "";

    $(`.hov-user-${huState?.id}, .hu-parent`)
      .hover(function (e) {
        if (timer) clearTimeout(timer);
      })
      .mouseleave(function (e) {
        timer = setTimeout(function () {
          dispatch(dispatchSetHuState({ display: false }));
        }, 50);
      });

    return () => {
      //removes previous mouseleave event listeners
      $(`.hov-user-${huState?.id}, .hu-parent`).off("mouseleave");
      $(`.hov-user-${huState?.id}, .hu-parent`).off("hover");
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
