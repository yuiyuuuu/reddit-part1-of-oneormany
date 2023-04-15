import React from "react";
import { useSelector } from "react-redux";

import UserPostMap from "../userposts/UserPostMap";
import NoPosts from "../userposts/NoPosts";

import "./uud.scss";

const UserDownvoted = () => {
  const selectedUser = useSelector((state) => state.selectedUser);

  if (!selectedUser?.downvotes?.length) {
    return <NoPosts what='downvoted' selected={selectedUser} />;
  }

  return (
    <div className='uud-parent'>
      {selectedUser?.downvotes?.map((item, i) => (
        <UserPostMap
          post={item}
          i={i}
          length={selectedUser?.downvotes?.length}
          selectedUser={selectedUser}
        />
      ))}
    </div>
  );
};

export default UserDownvoted;
