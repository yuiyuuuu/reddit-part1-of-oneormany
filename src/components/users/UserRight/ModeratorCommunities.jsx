import React from "react";
import { useSelector } from "react-redux";

import DefaultCommunitiesIcon from "../../communities/communitiessvg/DefaultCommunitiesIcon";
import ModJoin from "./ModJoin";

const ModeratorCommunities = ({ user }) => {
  const authState = useSelector((state) => state.auth);

  return (
    <div className='ur-commodparent'>
      <div className='ur-modinner'>
        <div className='ur-modtitle'>
          {authState?.id === user?.id
            ? "You're a moderator of these communities"
            : "Moderator of these communities"}
        </div>

        <div className='ur-modmap'>
          {user?.moderatorCommunities
            ?.concat(user?.communityOwner)
            .map((community, i) => (
              <div
                className='ur-modmapch'
                style={{ marginTop: i !== 0 && "16px" }}
              >
                {community?.iconImage ? (
                  <img
                    src={`data:image/png;base64,${community?.iconImage}`}
                    className='ur-communityicon'
                  />
                ) : (
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      marginRight: "8px",
                    }}
                  >
                    <DefaultCommunitiesIcon
                      fillcolor={"#" + community?.themeBaseColor}
                      height={32}
                      community={community}
                    />
                  </div>
                )}

                <div className='ur-cominfo'>
                  <a className='ur-l ur-under' href={`/r/${community?.name}`}>
                    r/{community?.name}
                  </a>
                  <div className='ur-l'>
                    {community.users?.length}{" "}
                    {community.users?.length <= 1 ? "member" : "members"}
                  </div>
                </div>

                <div className='grow' />

                <ModJoin
                  authState={authState}
                  community={community}
                  selectedUser={user}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ModeratorCommunities;
