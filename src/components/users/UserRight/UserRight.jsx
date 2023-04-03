import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { followUser, unfollowUser } from "../../../store/auth";
import { addAlert } from "../../../globalcomponents/alerts/addAlertsFunctions";
import { dispatchSetAOS } from "../../../globalcomponents/authoverlaysignup/authOverlaySignupStates";

import "./ur.scss";

import { monthNoAbbr } from "../../submit/cominfo/monthobj";
import { otherprofiles, myprofile } from "./moreOptions";

import UserPfp from "./UserPfp";
import KarmaIcon from "../svg/KarmaIcon";
import CakeDayIcon from "../svg/CakeDayIcon";
import ModeratorCommunities from "./ModeratorCommunities";

const UserRight = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedUser = useSelector((state) => state.selectedUser);
  const authState = useSelector((state) => state.auth);

  const [showMoreOptions, setMoreOptions] = useState(false);

  function handleFollowUser() {
    if (!authState?.id) {
      dispatch(dispatchSetAOS({ display: true, which: "" }));
      return;
    }

    const obj = {
      userFollowing: authState.id,
      userFollowed: selectedUser.id,
    };

    dispatch(followUser(obj)).then(() => {
      addAlert(`Successfully followed ${selectedUser.name}`, dispatch);
    });
  }

  function handleUnfollowUser() {
    const obj = {
      userFollowing: authState.id,
      userFollowed: selectedUser.id,
    };

    dispatch(unfollowUser(obj)).then(() => {
      addAlert(`Successfully unfollowed ${selectedUser.name}`, dispatch);
    });
  }

  return (
    <div>
      <div className='ur-right'>
        <div className='ur-profile'>
          <div
            className='ur-banner'
            style={{ backgroundColor: "#33a8ff" }}
          ></div>

          <UserPfp selectedUser={selectedUser} />

          <div className='ur-body'>
            <div className='ur-user'>u/{selectedUser?.name}</div>
            {authState?.id === selectedUser?.id && (
              <div className='ur-create'>
                Create Avatar
                <div className='ur-caret'></div>
              </div>
            )}

            <div className='ur-vrow'>
              <div className='ur-rowc'>
                <div className='ur-ti'>Karma</div>
                <div className='ur-iconrow'>
                  <KarmaIcon />
                  <div className='ur-gr'>{selectedUser?.karma}</div>
                </div>
              </div>
              <div className='ur-rowc'>
                <div className='ur-ti'>Cake day</div>
                <div className='ur-iconrow'>
                  <CakeDayIcon />
                  <div className='ur-gr'>
                    {
                      monthNoAbbr[
                        selectedUser.createdAt?.slice(5, 7).toString()
                      ]
                    }{" "}
                    {selectedUser.createdAt?.slice(8, 10)},{" "}
                    {selectedUser.createdAt?.slice(0, 4)}
                  </div>
                </div>
              </div>
            </div>

            {selectedUser?.id === authState?.id && (
              <div className='ur-addsocial'>
                <div className='ur-plus'></div>
                Add social link
              </div>
            )}

            {selectedUser?.id === authState?.id && (
              <div
                className='ur-newpost bluebutton-button'
                onClick={() => navigate("/submit")} //change this later to /submit/user when done
              >
                New Post
              </div>
            )}

            {selectedUser?.id !== authState?.id ? (
              !authState?.following
                ?.map((v) => v.id)
                ?.includes(selectedUser?.id) ? (
                <div style={{ paddingTop: "10px" }}>
                  <div
                    className='ur-newpost bluebutton-button'
                    onClick={() => handleFollowUser()}
                    style={{ marginTop: 0 }}
                  >
                    Follow
                  </div>
                </div>
              ) : (
                <div style={{ paddingTop: "10px" }}>
                  <div
                    className='ur-newpost blueborder-button'
                    onClick={() => handleUnfollowUser()}
                    style={{ marginTop: 0 }}
                  >
                    Unfollow
                  </div>
                </div>
              )
            ) : (
              ""
            )}

            {showMoreOptions ? (
              authState?.id === selectedUser?.id ? (
                <div className='ur-optpar'>
                  {myprofile.map((item) => (
                    <span className='ur-opt hover1c1cbg'>{item}</span>
                  ))}
                </div>
              ) : (
                <div className='ur-optpar'>
                  {otherprofiles.map((item) => (
                    <span className='ur-opt hover1c1cbg'>{item}</span>
                  ))}
                </div>
              )
            ) : (
              ""
            )}

            <div
              className='ur-moreoptions'
              onClick={() => setMoreOptions((prev) => !prev)}
            >
              <div className='ur-morech hover1c1cbg'>
                {showMoreOptions ? "Fewer Options" : "More Options"}
              </div>
            </div>
          </div>
        </div>

        {selectedUser?.moderatorCommunities?.concat(
          selectedUser?.communityOwner
        )?.length > 0 && <ModeratorCommunities user={selectedUser} />}
      </div>
    </div>
  );
};

export default UserRight;
