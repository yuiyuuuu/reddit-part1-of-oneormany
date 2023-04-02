import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import $ from "jquery";

import { dispatchSetAOS } from "../../../globalcomponents/authoverlaysignup/authOverlaySignupStates";
import { addAlert } from "../../../globalcomponents/alerts/addAlertsFunctions";
import {
  joinCommunityAuth,
  leaveCommunityAuth,
} from "../../../store/users/users";

const ModJoin = ({ authState, community, selectedUser }) => {
  const dispatch = useDispatch();

  const [userids, setUserids] = useState([]);

  function handleJoinCommunity() {
    if (!authState?.id) {
      dispatch(dispatchSetAOS({ display: true, which: "joincommunity" }));
    } else {
      dispatch(
        joinCommunityAuth({
          userid: authState.id,
          communityid: community.id,
          selected: selectedUser.id,
        })
      );
      addAlert(`Successfully joined ${community.tag}`, dispatch);
    }
  }

  function handleLeaveCommunity() {
    dispatch(
      leaveCommunityAuth({
        userid: authState.id,
        communityid: community.id,
        selected: selectedUser.id,
      })
    );
    addAlert(`Successfully left ${community.tag}`, dispatch);
  }

  useEffect(() => {
    $(`#ur-joinbut-${community?.id}`)
      .off() //remove all event listeners, no need to pass in specifics since we only have one anyways
      .hover(
        () => {
          if (userids.includes(authState?.id)) {
            $(`#ur-joinbut-${community?.id}`).html("Leave");
          }
        },

        () => {
          if (userids.includes(authState?.id)) {
            $(`#ur-joinbut-${community?.id}`).html("Joined");
          }
        }
      );
  }, [userids]);

  useEffect(() => {
    setUserids(community.users.map((v) => v.id));
  }, [selectedUser]);

  return (
    <div
      className={
        userids.includes(authState?.id)
          ? "blueborder-button"
          : "bluebutton-button"
      }
      id={`ur-joinbut-${community?.id}`}
      style={{ width: "106px" }}
      onClick={() =>
        userids.includes(authState.id)
          ? handleLeaveCommunity()
          : handleJoinCommunity()
      }
    >
      {userids.includes(authState?.id) ? "Joined" : "Join"}
    </div>
  );
};

export default ModJoin;
