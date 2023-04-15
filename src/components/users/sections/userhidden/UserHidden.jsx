import React from "react";
import { useSelector } from "react-redux";

import UserPostMap from "../userposts/UserPostMap";
import NoPosts from "../userposts/NoPosts";

import "./ush.scss";

const UserHidden = () => {
  const selectedUser = useSelector((state) => state.selectedUser);

  if (!selectedUser?.hiddenPosts?.length) {
    return <NoPosts what='hidden' selected={selectedUser} />;
  }

  return (
    <div className='ush-parent'>
      {selectedUser?.hiddenPosts?.map((item, i) => (
        <UserPostMap
          post={item}
          i={i}
          selectedUser={selectedUser}
          length={selectedUser?.hiddenPosts?.length}
        />
      ))}
    </div>
  );
};

export default UserHidden;
