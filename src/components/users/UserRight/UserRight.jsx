import React from "react";
import { useSelector } from "react-redux";

import "./ur.scss";
import UserPfp from "./UserPfp";

const UserRight = () => {
  const selectedUser = useSelector((state) => state.selectedUser);

  return (
    <div>
      <div className='ur-right'>
        <div className='ur-profile'>
          <div
            className='ur-banner'
            style={{ backgroundColor: "#33a8ff" }}
          ></div>

          <UserPfp selectedUser={selectedUser} />

          <div className='ur-body'></div>
        </div>
      </div>
    </div>
  );
};

export default UserRight;
