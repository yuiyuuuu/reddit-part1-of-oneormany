import React from "react";

import DefaultPfp from "../svg/DefaultPfp";

const UserPfp = ({ selectedUser }) => {
  return (
    <div className='ur-pfp'>
      <DefaultPfp size={"80px"} background={"#d7dfe2"} fill={"white"} />
    </div>
  );
};

export default UserPfp;
