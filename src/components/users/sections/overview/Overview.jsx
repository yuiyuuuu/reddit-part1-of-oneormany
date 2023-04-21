import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "./overview.scss";
import OverviewMap from "./OverviewMap";
import NewGray from "../../svg/nav/NewGray";
import NewBlue from "../../svg/nav/NewBlue";
import HotGray from "../../svg/nav/HotGray";
import HotBlue from "../../svg/nav/HotBlue";
import TopGray from "../../svg/nav/TopGray";
import TopBlue from "../../svg/nav/TopBlue";
import NoPosts from "../userposts/NoPosts";

const Overview = () => {
  const userState = useSelector((state) => state.selectedUser);
  const authState = useSelector((state) => state.auth);

  const [mapResults, setMapResults] = useState({});

  const [selectedFilter, setSelectedFilter] = useState("new");

  useEffect(() => {
    setMapResults({});

    if (!userState?.id) return;
    if (!authState?.id) return;

    const hidden = authState?.hiddenPosts?.map((v) => v.id);

    const group = {};

    userState?.posts.forEach((item) => {
      if (hidden?.includes(item.id)) return;
      group[item?.id] ||= [];
      group[item?.id].push({ type: "post", data: item });
    });

    userState?.comments.forEach((item) => {
      if (hidden?.includes(item.postId)) return;
      group[item?.postId] ||= [];
      group[item?.postId].push({ type: "comment", data: item });
    });

    setMapResults(group);
  }, [userState, authState]);

  if (!userState?.id) return "loading";

  if (!Object.values(mapResults).length) {
    return (
      <div style={{ width: "640px" }}>
        <NoPosts selected={userState} what={"post"} />;
      </div>
    );
  }

  return (
    <div>
      <div className='overview-parent'>
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

        <div className='overview-posts'>
          {Object.values(mapResults).map((item) => (
            <OverviewMap item={item} authState={authState} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
