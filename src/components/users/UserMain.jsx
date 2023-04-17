import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import "./um.scss";

import $ from "jquery";

import { setSelectedUser } from "../../store/users/users";
import { setNavLocation } from "../../store/nav/navLocation";
import { dispatchSetReadyUser } from "./userReadyState";
import { setOverlayState } from "../../store/postoverlays/shareOverlay";
import { setThreeState } from "../../store/postoverlays/threeDotOverlay";
import { addRemoveHiddenPosts } from "../../store/auth";
import { dispatchSetAOL } from "../../globalcomponents/authoverlaylogin/authOverlayLoginStates";

import { usersections, usersectionsNL } from "./usersections";

import UserNotFound from "./notfound/UserNotFound";
import Overview from "./sections/overview/Overview";
import UserHistory from "./sections/userhistory/UserHistory";
import UserComments from "./sections/usercomments/UserComments";
import UserGivenAwards from "./sections/UserGivenAwards";
import UserHidden from "./sections/userhidden/UserHidden";
import UserPosts from "./sections/userposts/UserPosts";
import UserReceivedAwards from "./sections/UserReceviedAwards";
import UserSaved from "./sections/usersaved/UserSaved";
import UserUpvoted from "./sections/userupvoted/UserUpvoted";
import UserDownvoted from "./sections/userdownvoted/UserDownvoted";
import UserRight from "./UserRight/UserRight";

import ShareOverlay from "../home/overlays/ShareOverlay";
import ThreeDotOverlay from "../home/overlays/ThreeDotOverlay";

const UserMain = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const selectedUser = useSelector((state) => state.selectedUser);
  const lnState = useSelector((state) => state.lnState);
  const lnnlState = useSelector((state) => state.lnnl);
  const selectedPost = useSelector((state) => state.selectedPost);
  const authState = useSelector((state) => state.auth);
  const userReadyState = useSelector((state) => state.userReadyState);
  const shareOverlayState = useSelector((state) => state.shareOverlay);
  const threeState = useSelector((state) => state.threeDotOverlay);

  const [selectedSection, setSelectedSection] = useState(params.section);

  const clickout = useCallback(() => {
    var $target = $(event.target);

    if (
      !$target.closest("#tdot-overlay").length &&
      $("#tdot-overlay").is(":visible") &&
      !$target.closest(".up-tdot").length &&
      !$target.closest("threedot").length
    ) {
      dispatch(setOverlayState({ display: false }));
    }

    if (
      !$target.closest(".shareoverlay-container").length &&
      $(".shareoverlay-container").is(":visible") &&
      !$target.closest(".up-share").length &&
      !$target.closest(".post-share").length
    ) {
      dispatch(setThreeState({ display: false }));
    }
  }, []);

  $(document).off("click", document, clickout).click(clickout);

  function set(postid) {
    const scrollpos = window.scrollY;
    //if the one we clicked on was the same one as before, we set the display to none.
    if (shareOverlayState.id === postid && shareOverlayState.display) {
      dispatch(setOverlayState({ display: false }));

      return;
    } else if (shareOverlayState.id !== postid && shareOverlayState.display) {
      //if the one we clicked was not the one we clicked before, we keep the display active but set the top and left of the new one clicked
      const v = document
        .getElementById(`upshare-${postid}`)
        .getBoundingClientRect();

      dispatch(
        setOverlayState({
          left: v.left,
          top: v.top + v.height,
          id: postid,
          display: true,
          scroll: scrollpos,
        })
      );
      return;
    }

    //else we just set the display to true and update id for next click

    const v = document
      .getElementById(`upshare-${postid}`)
      .getBoundingClientRect();

    dispatch(
      setOverlayState({
        display: true,
        left: v.left,
        top: v.top + v.height,
        id: postid,
        scroll: scrollpos,
      })
    );
    dispatch(setThreeState({ display: false }));
  }

  function set2(postid) {
    const scrollpos = window.scrollY;

    if (threeState.id === postid && threeState.display) {
      dispatch(setThreeState({ display: false }));
      return;
    }

    const v = document
      .getElementById(`threedot-${postid}`)
      .getBoundingClientRect();

    dispatch(
      setThreeState({
        display: true,
        left: v.left,
        top: v.top + v.height,
        id: postid,
        scroll: scrollpos,
      })
    );

    dispatch(setOverlayState({ display: false }));
  }

  function hideFunction() {
    if (!authState?.id) {
      dispatch(dispatchSetAOL({ display: true, which: "" }));
      return;
    }

    const obj = {
      userid: authState.id,
      postid: threeState.id,
      addOrRemove: authState?.hiddenPosts
        ?.map((v) => v.id)
        .includes(threeState?.id)
        ? "remove"
        : "add",
    };

    dispatch(addRemoveHiddenPosts(obj)).then(() => {
      dispatch(setThreeState({ display: false }));
    });
  }

  useEffect(() => {
    if (selectedPost?.id) return;
    const name = params.userid;

    dispatch(setSelectedUser(name)).then(() =>
      dispatch(dispatchSetReadyUser(true))
    );
  }, [window.location.href]);

  useEffect(() => {
    if (!userReadyState) return;

    const section = params.section;

    if (!section) {
      setSelectedSection("overview");
    } else {
      setSelectedSection(section.toLowerCase());
    }
  }, [userReadyState, window.location.href]);

  useEffect(() => {
    dispatch(
      setNavLocation({ name: `u/${selectedUser?.name}`, user: selectedUser })
    );
  }, [selectedUser]);

  if (selectedUser === "does not exist") {
    return <UserNotFound />;
  }

  return (
    <div>
      <div
        style={{ paddingLeft: (lnState || lnnlState) && "270px" }}
        className='um-parent'
      >
        <div
          className='um-nav'
          style={{
            justifyContent: selectedSection === "overview" && "center",
            paddingLeft: selectedSection === "overview" && 0,
          }}
        >
          {authState?.id === selectedUser?.id &&
            usersections.map((section) => (
              <div
                className='um-sectionchild'
                onClick={() =>
                  section.toLowerCase() === "overview"
                    ? nav(`/user/${selectedUser.name}`)
                    : nav(`/user/${selectedUser.name}/${section.toLowerCase()}`)
                }
                style={{
                  color: section.toLowerCase() === selectedSection && "#0079d3",
                  borderBottom:
                    section.toLowerCase() === selectedSection &&
                    "2px solid #0079d3",
                }}
              >
                {section}
              </div>
            ))}

          {authState?.id !== selectedUser?.id &&
            usersectionsNL.map((section) => (
              <div
                className='um-sectionchild'
                onClick={() =>
                  section.toLowerCase() === "overview"
                    ? nav(`/user/${selectedUser.name}`)
                    : nav(`/user/${selectedUser.name}/${section.toLowerCase()}`)
                }
                style={{
                  color: section.toLowerCase() === selectedSection && "#0079d3",
                  borderBottom:
                    section.toLowerCase() === selectedSection &&
                    "2px solid #0079d3",
                }}
              >
                {section}
              </div>
            ))}
        </div>

        <div className='um-main'>
          <div
            className='um-body'
            style={{
              width:
                (selectedSection === "posts" ||
                  selectedSection === "comments" ||
                  selectedSection === "history" ||
                  selectedSection === "saved" ||
                  selectedSection === "hidden" ||
                  selectedSection === "upvoted" ||
                  selectedSection === "downvoted") &&
                "100%",
            }}
          >
            {selectedSection === "overview" && <Overview />}
            {selectedSection === "posts" && <UserPosts set={set} set2={set2} />}
            {selectedSection === "comments" && <UserComments />}
            {selectedSection === "history" && (
              <UserHistory set={set} set2={set2} />
            )}
            {selectedSection === "saved" && <UserSaved set={set} set2={set2} />}
            {selectedSection === "hidden" && (
              <UserHidden set={set} set2={set2} />
            )}
            {selectedSection === "upvoted" && (
              <UserUpvoted set={set} set2={set2} />
            )}
            {selectedSection === "downvoted" && (
              <UserDownvoted set={set} set2={set2} />
            )}
            {selectedSection === "awards received" && <UserReceivedAwards />}
            {selectedSection === "awards given" && <UserGivenAwards />}
          </div>

          <UserRight />
        </div>
      </div>
      <ShareOverlay />
      <ThreeDotOverlay hideFunction={hideFunction} />
    </div>
  );
};

export default UserMain;
