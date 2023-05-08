import $ from "jquery";
import { makeGetRequest } from "../helperFunction";
import { dispatchSetHcState } from "../../globalcomponents/hovercommunities/hovercommunitiesstate";
import { dispatchSetHuState } from "../../globalcomponents/hoverusers/hoverUserStates";

export function hoverCommunitiesInitFunction(
  dispatch,
  userClass,
  postOrComment
) {
  $(userClass).mouseover(async () => {
    setTimeout(async () => {
      //sometimes both user and community popup will show at the same time, this should prevent it
      dispatch(dispatchSetHuState({ display: false }));

      const coordinates = $(userClass)[0].getBoundingClientRect();

      await makeGetRequest(
        `communities/fetchbyid/${postOrComment?.community?.id}`
      ).then((res) => {
        //if the user isnt hovering when this function is ran, dont show overlay
        const isHovered = $(userClass).is(":hover");
        if (!isHovered) return;

        dispatch(
          dispatchSetHcState({
            display: true,
            top: coordinates.top + $(userClass).height() + window.scrollY,
            left: coordinates.left,
            community: res,
            id: postOrComment?.id,
            class: userClass,
          })
        );
      });
    }, 500);
  });
}

export function removeHoverCommunities(userClass) {
  $(`${userClass}, .hc-parent`).off("mouseleave");
  $(`${userClass}, .hc-parent`).off("hover");
}

export function initCommunitiesHoverOut(dispatch, userClass) {
  let timer = "";

  $(`${userClass}, .hc-parent`)
    .hover(function (e) {
      if (timer) clearTimeout(timer);
    })
    .mouseleave(function (e) {
      timer = setTimeout(function () {
        dispatch(dispatchSetHcState({ display: false }));
      }, 50);
    });
}
