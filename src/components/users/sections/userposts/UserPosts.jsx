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
import NoPosts from "./NoPosts";

const UserPosts = ({ set, set2 }) => {
  const authState = useSelector((state) => state.auth);
  const selectedUser = useSelector((state) => state.selectedUser);

  const [selectedFilter, setSelectedFilter] = useState("new");

  if (!selectedUser?.id) return "loading";

  if (
    !selectedUser?.posts?.filter(
      (c) => !authState?.hiddenPosts?.map((v) => v.id).includes(c.id)
    )?.length
  ) {
    return <NoPosts selected={selectedUser} what={"post"} />;
  }

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
        {selectedUser?.posts
          ?.filter(
            (c) => !authState?.hiddenPosts?.map((v) => v.id).includes(c.id)
          )
          ?.map((post, i) => (
            <UserPostMap
              post={post}
              i={i}
              length={selectedUser?.posts?.length}
              selectedUser={selectedUser}
              set={set}
              set2={set2}
            />
          ))}
      </div>
    </div>
  );
};

export default UserPosts;
