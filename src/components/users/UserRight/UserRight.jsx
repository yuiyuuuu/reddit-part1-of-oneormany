import React from "react";
import { useSelector } from "react-redux";

import "./ur.scss";

import { monthNoAbbr } from "../../submit/cominfo/monthobj";

import UserPfp from "./UserPfp";
import KarmaIcon from "../svg/KarmaIcon";
import CakeDayIcon from "../svg/CakeDayIcon";
import ModeratorCommunities from "./ModeratorCommunities";

const UserRight = () => {
  const selectedUser = useSelector((state) => state.selectedUser);
  const authState = useSelector((state) => state.auth);

  console.log(selectedUser);

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
              <div className='ur-newpost bluebutton-button'>New Post</div>
            )}
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
