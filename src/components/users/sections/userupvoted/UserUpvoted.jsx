import React from "react";
import { useSelector } from "react-redux";

import "./uup.scss";

import UserPostMap from "../userposts/UserPostMap";
import NoPosts from "../userposts/NoPosts";

const UserUpvoted = ({ set, set2 }) => {
  const authState = useSelector((state) => state.auth);
  const selectedUser = useSelector((state) => state.selectedUser);

  if (
    !selectedUser?.upvotes?.filter(
      (c) => !authState?.hiddenPosts?.map((v) => v.id).includes(c.id)
    )?.length
  ) {
    return <NoPosts what='upvoted' selected={selectedUser} />;
  }

  return (
    <div className='uup-parent'>
      {selectedUser?.upvotes
        ?.filter(
          (c) => !authState?.hiddenPosts?.map((v) => v.id).includes(c.id)
        )
        ?.map((item, i) => (
          <UserPostMap
            post={item}
            i={i}
            length={selectedUser?.upvotes?.length}
            selectedUser={selectedUser}
            set={set}
            set2={set2}
          />
        ))}
    </div>
  );
};

export default UserUpvoted;
