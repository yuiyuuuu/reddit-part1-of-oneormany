import $ from "jquery";
import { makeGetRequest } from "../helperFunction";
import { dispatchSetHcState } from "../../globalcomponents/hovercommunities/hovercommunitiesstate";

export function hoverCommunitiesInitFunction(
  dispatch,
  userClass,
  postOrComment
) {
  $(userClass).mouseover(async () => {
    const coordinates = $(userClass)[0].getBoundingClientRect();

    await makeGetRequest(
      `communities/fetchbyid/${postOrComment?.community?.id}`
    ).then((res) => {
      dispatch(
        dispatchSetHcState({
          display: true,
          top: coordinates.top + $(userClass).height(),
          left: coordinates.left,
          community: res,
          id: postOrComment?.id,
          class: userClass,
        })
      );
    });
  });
}

export function removeHoverCommunities(userClass) {
  console.log("rann");
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
