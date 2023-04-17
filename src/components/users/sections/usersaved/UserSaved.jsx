import React from "react";
import { useSelector } from "react-redux";

import NoPosts from "../userposts/NoPosts";
import UserPostMap from "../userposts/UserPostMap";
import NoPermission from "../../NoPermission";

import "./us.scss";

const UserSaved = ({ set, set2 }) => {
  const selectedUser = useSelector((state) => state.selectedUser);
  const authState = useSelector((state) => state.auth);

  if (!selectedUser?.id) return "loading";

  if (selectedUser?.id !== authState?.id) {
    return <NoPermission />;
  }

  if (
    !selectedUser?.savedPosts?.filter(
      (c) => !authState?.hiddenPosts?.map((v) => v.id).includes(c.id)
    )?.length
  ) {
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
            set={set}
            set2={set2}
          />
        ))}
    </div>
  );
};

export default UserSaved;
