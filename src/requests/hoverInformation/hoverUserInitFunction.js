import $ from "jquery";
import { makeGetRequest } from "../helperFunction";
import { dispatchSetHuState } from "../../globalcomponents/hoverusers/hoverUserStates";

export function hoverUserInit(dispatch, userClass, postOrComment) {
  $(userClass).mouseover(async () => {
    const coordinates = $(userClass)[0].getBoundingClientRect();

    await makeGetRequest(`users/fetchbyid/${postOrComment?.user?.id}`).then(
      (res) => {
        dispatch(
          dispatchSetHuState({
            display: true,
            top: coordinates.top + $(userClass).height(),
            left: coordinates.left,
            community: postOrComment?.community,
            user: res,
            id: postOrComment.id,
            class: userClass,
          })
        );
      }
    );
  });
}

export function removeHoverUser(userClass) {
  $(`${userClass}, .hu-parent`).off("mouseleave");
  $(`${userClass}, .hu-parent`).off("hover");
}

export function initUserHoverOut(dispatch, userClass) {
  let timer = "";

  $(`${userClass}, .hu-parent`)
    .hover(function (e) {
      if (timer) clearTimeout(timer);
    })
    .mouseleave(function (e) {
      timer = setTimeout(function () {
        dispatch(dispatchSetHuState({ display: false }));
      }, 50);
    });
}
