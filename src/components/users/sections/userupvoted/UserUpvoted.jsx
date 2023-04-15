import React from "react";
import { useSelector } from "react-redux";

import "./uup.scss";

import UserPostMap from "../userposts/UserPostMap";
import NoPosts from "../userposts/NoPosts";

const UserUpvoted = () => {
  const selectedUser = useSelector((state) => state.selectedUser);

  if (!selectedUser?.upvotes?.length) {
    return <NoPosts what='upvoted' selected={selectedUser} />;
  }

  return (
    <div className='uup-parent'>
      {selectedUser?.upvotes?.map((item, i) => (
        <UserPostMap
          post={item}
          i={i}
          length={selectedUser?.upvotes?.length}
          selectedUser={selectedUser}
        />
      ))}
    </div>
  );
};

export default UserUpvoted;
