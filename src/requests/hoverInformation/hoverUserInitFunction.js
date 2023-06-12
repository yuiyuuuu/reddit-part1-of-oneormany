import $ from "jquery";
import { makeGetRequest } from "../helperFunction";
import { dispatchSetHuState } from "../../globalcomponents/hoverusers/hoverUserStates";
import { dispatchSetHcState } from "../../globalcomponents/hovercommunities/hovercommunitiesstate";

//sdlkghjfsdklfjlksdf - add feature where the popup will show on top if the element is below the half of the page when hovered

export function hoverUserInit(dispatch, userClass, postOrComment, userid) {
  $(userClass).mouseover(async () => {
    setTimeout(async () => {
      //sometimes both user and community popup will show at the same time, this should prevent it
      dispatch(dispatchSetHcState({ display: false }));

      const coordinates = $(userClass)[0].getBoundingClientRect();

      await makeGetRequest(
        `users/fetchbyid/${userid ? userid : postOrComment?.user?.id}`
      ).then((res) => {
        const isHovered = $(userClass).is(":hover");

        if (!isHovered) return;

        const offsettop = $(userClass).offset().top - $(window).scrollTop();
        const windowheight = window.innerHeight;

        dispatch(
          dispatchSetHuState({
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
            community: postOrComment?.community,
            user: res,
            id: postOrComment.id,
            class: userClass,
          })
        );
      });
    }, 500);
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
