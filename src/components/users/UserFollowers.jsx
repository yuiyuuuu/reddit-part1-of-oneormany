import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { setNavLocation } from "../../store/nav/navLocation";
import { setSelectedUser } from "../../store/users/users";
import UserRight from "./UserRight/UserRight";

const UserFollowers = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const selectedUser = useSelector((state) => state.selectedUser);

  useEffect(() => {
    dispatch(
      setNavLocation({ name: `u/${selectedUser?.name}`, user: selectedUser })
    );
  }, [selectedUser]);

  useEffect(() => {
    const name = params.userid;

    dispatch(setSelectedUser(name));
  }, [window.location.href]);

  console.log(selectedUser);

  return (
    <div className='uf-parent'>
      <div className='uf-main'>
        <UserRight />
      </div>
    </div>
  );
};

export default UserFollowers;
