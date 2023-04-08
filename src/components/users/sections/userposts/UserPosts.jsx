import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./up.scss";

import UserPostMap from "./UserPostMap";
import NewGray from "../../svg/nav/NewGray";
import NewBlue from "../../svg/nav/NewBlue";
import HotGray from "../../svg/nav/HotGray";
import HotBlue from "../../svg/nav/HotBlue";
import TopGray from "../../svg/nav/TopGray";
import TopBlue from "../../svg/nav/TopBlue";

const UserPosts = () => {
  const selectedUser = useSelector((state) => state.selectedUser);

  const [selectedFilter, setSelectedFilter] = useState("new");

  return (
    <div className='up-parent'>
      <div className='users-topfilter'>
        <div className='usernav-fil' onClick={() => setSelectedFilter("new")}>
          {selectedFilter === "new" ? <NewBlue /> : <NewGray />}
          <div
            className='usernav-f'
            style={{ color: selectedFilter === "new" && "#0079d3" }}
          >
            New
          </div>
        </div>

        <div className='usernav-fil' onClick={() => setSelectedFilter("hot")}>
          {selectedFilter === "hot" ? <HotBlue /> : <HotGray />}
          <div
            className='usernav-f'
            style={{ color: selectedFilter === "hot" && "#0079d3" }}
          >
            Hot
          </div>
        </div>

        <div className='usernav-fil' onClick={() => setSelectedFilter("top")}>
          {selectedFilter === "top" ? <TopBlue /> : <TopGray />}
          <div
            className='usernav-f'
            style={{ color: selectedFilter === "top" && "#0079d3" }}
          >
            Top
          </div>
        </div>
      </div>

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
