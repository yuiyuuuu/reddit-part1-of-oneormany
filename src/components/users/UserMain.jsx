import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import "./um.scss";

import { setSelectedUser } from "../../store/users/users";
import { setNavLocation } from "../../store/nav/navLocation";

import { usersections } from "./usersections";

import UserNotFound from "./notfound/UserNotFound";
import Overview from "./sections/overview/Overview";
import UserHistory from "./sections/userhistory/UserHistory";
import UserComments from "./sections/usercomments/UserComments";
import UserGivenAwards from "./sections/UserGivenAwards";
import UserHidden from "./sections/UserHidden";
import UserPosts from "./sections/userposts/UserPosts";
import UserReceivedAwards from "./sections/UserReceviedAwards";
import UserSaved from "./sections/UserSaved";
import UserUpvoted from "./sections/UserUpvoted";
import UserDownvoted from "./sections/UserDownvoted";
import UserRight from "./UserRight/UserRight";

const UserMain = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const selectedUser = useSelector((state) => state.selectedUser);
  const lnState = useSelector((state) => state.lnState);
  const lnnlState = useSelector((state) => state.lnnl);
  const selectedPost = useSelector((state) => state.selectedPost);

  const [ready, setReady] = useState(false);

  const [selectedSection, setSelectedSection] = useState(params.section);

  useEffect(() => {
    if (selectedPost?.id) return;
    const name = params.userid;

    dispatch(setSelectedUser(name)).then(() => setReady(true));
  }, [window.location.href]);

  useEffect(() => {
    if (!ready) return;

    const section = params.section;

    if (!section) {
      setSelectedSection("overview");
    } else {
      setSelectedSection(section.toLowerCase());
    }
  }, [ready, window.location.href]);

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
          {usersections.map((section) => (
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
                  selectedSection === "history") &&
                "100%",
            }}
          >
            {selectedSection === "overview" && <Overview />}
            {selectedSection === "posts" && <UserPosts />}
            {selectedSection === "comments" && <UserComments />}
            {selectedSection === "history" && <UserHistory />}
            {selectedSection === "saved" && <UserSaved />}
            {selectedSection === "hidden" && <UserHidden />}
            {selectedSection === "upvoted" && <UserUpvoted />}
            {selectedSection === "downvoted" && <UserDownvoted />}
            {selectedSection === "awards received" && <UserReceivedAwards />}
            {selectedSection === "awards given" && <UserGivenAwards />}
          </div>

          <UserRight />
        </div>
      </div>
    </div>
  );
};

export default UserMain;
