import React from "react";
import { useSelector } from "react-redux";

import NoPosts from "../userposts/NoPosts";
import UserPostMap from "../userposts/UserPostMap";
import NoPermission from "../../NoPermission";

import "./us.scss";

const UserSaved = () => {
  const selectedUser = useSelector((state) => state.selectedUser);
  const authState = useSelector((state) => state.auth);

  if (!selectedUser?.id) return "loading";

  if (selectedUser?.id !== authState?.id) {
    return <NoPermission />;
  }

  if (!selectedUser?.savedPosts?.length) {
    return <NoPosts what='saved' selected={selectedUser} />;
  }

  return (
    <div className='us-parent'>
      {selectedUser?.savedPosts
        ?.slice()
        .reverse()
        ?.map((item, i) => (
          <UserPostMap
            post={item}
            i={i}
            selectedUser={selectedUser}
            usersaved={true}
          />
        ))}
    </div>
  );
};

export default UserSaved;
