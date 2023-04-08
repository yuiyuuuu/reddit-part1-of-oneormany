import React from "react";
import { useSelector } from "react-redux";

import "./up.scss";

import UserPostMap from "./UserPostMap";

const UserPosts = () => {
  const selectedUser = useSelector((state) => state.selectedUser);

  return (
    <div className='up-parent'>
      <div className='users-topfilter'>add here later</div>

      <div className='up-main'>
        {selectedUser?.posts?.map((post, i) => (
          <UserPostMap
            post={post}
            i={i}
            length={selectedUser?.posts?.length}
            selectedUser={selectedUser}
          />
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
