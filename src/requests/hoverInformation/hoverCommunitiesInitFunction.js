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

        const offsettop = $(userClass).offset().top - $(window).scrollTop();
        const windowheight = window.innerHeight;

        dispatch(
          dispatchSetHcState({
            display: true,
            top:
              offsettop < windowheight / 2
                ? coordinates.top + $(userClass).height() + window.scrollY
                : "unset",

            bottom:
              offsettop >= windowheight / 2
                ? windowheight -
                  coordinates.bottom +
                  $(userClass).height() -
                  window.scrollY
                : "unset",
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
