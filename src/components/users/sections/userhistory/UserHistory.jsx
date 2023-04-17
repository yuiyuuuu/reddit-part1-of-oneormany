import React from "react";
import { useSelector } from "react-redux";

import "./uh.scss";

import NoPosts from "../userposts/NoPosts";
import UserPostMap from "../userposts/UserPostMap";
import NoPermission from "../../NoPermission";

const UserHistory = ({ set, set2 }) => {
  const selectedUser = useSelector((state) => state.selectedUser);
  const authState = useSelector((state) => state.auth);

  if (!selectedUser?.id) return "loading";

  if (selectedUser?.id !== authState?.id) {
    return <NoPermission />;
  }

  if (
    !selectedUser?.history?.filter(
      (c) => !authState?.hiddenPosts?.map((v) => v.id).includes(c.id)
    )?.length
  ) {
    return <NoPosts what={"view"} selected={selectedUser} />;
  }

  return (
    <div className='uh-parent'>
      {selectedUser?.history
        ?.slice()
        ?.reverse()
        ?.filter(
          (c) => !authState?.hiddenPosts?.map((v) => v.id).includes(c.id)
        )
        .map((item, i) => (
          // <UserHistoryMap item={item} authState={authState} />

          <UserPostMap
            post={item}
            i={i}
            length={selectedUser?.history?.length}
            selectedUser={selectedUser}
            set={set}
            set2={set2}
          />
        ))}
    </div>
  );
};

export default UserHistory;
