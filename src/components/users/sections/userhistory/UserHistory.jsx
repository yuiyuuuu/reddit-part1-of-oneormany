import React from "react";
import { useSelector } from "react-redux";

import "./uh.scss";

import NoPosts from "../userposts/NoPosts";
import UserPostMap from "../userposts/UserPostMap";

const UserHistory = () => {
  const selectedUser = useSelector((state) => state.selectedUser);
  const authState = useSelector((state) => state.auth);

  if (!selectedUser?.id) return "loading";

  if (!selectedUser?.history?.length) {
    return <NoPosts what={"view"} selected={selectedUser} />;
  }

  return (
    <div className='uh-parent'>
      {selectedUser?.history.map((item, i) => (
        // <UserHistoryMap item={item} authState={authState} />

        <UserPostMap
          post={item}
          i={i}
          length={selectedUser?.history?.length}
          selectedUser={selectedUser}
        />
      ))}
    </div>
  );
};

export default UserHistory;
