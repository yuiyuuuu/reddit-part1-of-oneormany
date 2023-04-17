import React from "react";
import { useSelector } from "react-redux";

import UserPostMap from "../userposts/UserPostMap";
import NoPosts from "../userposts/NoPosts";

import "./uud.scss";

const UserDownvoted = ({ set, set2 }) => {
  const authState = useSelector((state) => state.auth);
  const selectedUser = useSelector((state) => state.selectedUser);

  if (
    !selectedUser?.downvotes?.filter(
      (c) => !authState?.hiddenPosts?.map((v) => v.id).includes(c.id)
    )?.length
  ) {
    return <NoPosts what='downvoted' selected={selectedUser} />;
  }

  return (
    <div className='uud-parent'>
      {selectedUser?.downvotes
        ?.filter(
          (c) => !authState?.hiddenPosts?.map((v) => v.id).includes(c.id)
        )
        ?.map((item, i) => (
          <UserPostMap
            post={item}
            i={i}
            length={selectedUser?.downvotes?.length}
            selectedUser={selectedUser}
            set={set}
            set2={set2}
          />
        ))}
    </div>
  );
};

export default UserDownvoted;
