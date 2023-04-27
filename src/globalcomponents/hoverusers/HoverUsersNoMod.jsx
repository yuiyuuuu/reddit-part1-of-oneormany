import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { intToAbbrv } from "../../requests/intToAbbrv";
import { unfollowUser, followUser } from "../../store/auth";
import { addAlert } from "../alerts/addAlertsFunctions";
import { dispatchSetHuState } from "./hoverUserStates";

import $ from "jquery";

import DefaultPfp from "../../components/users/svg/DefaultPfp";

const HoverUsersNoMod = ({ huState }) => {
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  function handleFollowUser() {
    if (!authState?.id) {
      dispatch(dispatchSetAOS({ display: true, which: "" }));
      return;
    }

    const obj = {
      userFollowing: authState.id,
      userFollowed: huState.user.id,
    };

    dispatch(followUser(obj)).then(() => {
      addAlert(`Successfully followed ${huState?.user?.name}`, dispatch);
      dispatch(dispatchSetHuState({ display: false }));
    });
  }

  function handleUnfollowUser() {
    const obj = {
      userFollowing: authState.id,
      userFollowed: huState.user.id,
    };

    dispatch(unfollowUser(obj)).then(() => {
      addAlert(`Successfully unfollowed ${huState?.user?.name}`, dispatch);
      dispatch(dispatchSetHuState({ display: false }));
    });
  }

  useEffect(() => {
    if (authState?.following?.map((v) => v.id).includes(huState?.user?.id)) {
      $(".hun-uf").hover(
        () => {
          $(".hun-uf").html("Unfollow");
        },
        () => {
          $(".hun-uf").html("Following");
        }
      );
    }
  }, [$(".hun-uf")]);

  return (
    <div className='hun-parent'>
      <div className='hun-toprow'>
        {huState?.user?.photo ? (
          <img
            className='hun-pfpimg'
            src={`data:image/png;base64,${huState?.user?.photo}`}
          />
        ) : (
          <div style={{ marginRight: "8px", marginTop: "3px" }}>
            <DefaultPfp
              size={"32px"}
              background={"#d7dfe2"}
              fill={"white"}
              borderRadius={0}
            />
          </div>
        )}
        <div className='hun-toprowr'>
          {huState?.user?.displayName || huState?.user?.name}
          <div className='hun-f'>
            {huState?.user?.name}{" "}
            <span className='dot-posts' style={{ fontSize: "10px" }}>
              •
            </span>{" "}
            1 year ago
          </div>
        </div>
      </div>

      <div className='hun-botrow'>
        <div className='hun-ch'>
          {intToAbbrv(huState?.user?.postKarma)}
          <div className='hun-p'>Post Karma</div>
        </div>
        <div className='hun-ch'>
          {intToAbbrv(huState?.user?.commentKarma)}{" "}
          <div className='hun-p'>Comment Karma</div>
        </div>
      </div>

      {authState?.id !== huState?.user?.id && (
        <div>
          <div className='blueborder-button' style={{ margin: "4px 0" }}>
            Start Chat
          </div>
          {authState?.following
            ?.map((v) => v.id)
            .includes(huState?.user?.id) ? (
            <div
              className='blueborder-button hun-uf'
              onClick={() => handleUnfollowUser()}
            >
              Following
            </div>
          ) : (
            <div
              className='bluebutton-button'
              onClick={() => handleFollowUser()}
            >
              Follow
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HoverUsersNoMod;
