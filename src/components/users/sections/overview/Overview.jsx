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

const Overview = () => {
  const userState = useSelector((state) => state.selectedUser);

  const [mapResults, setMapResults] = useState({});

  const [selectedFilter, setSelectedFilter] = useState("new");

  useEffect(() => {
    setMapResults({});

    if (!userState?.id) return;

    const group = {};

    userState?.posts.forEach((item) => {
      group[item?.id] ||= [];
      group[item?.id].push({ type: "post", data: item });
    });

    userState?.comments.forEach((item) => {
      group[item?.postId] ||= [];
      group[item?.postId].push({ type: "comment", data: item });
    });

    setMapResults(group);
  }, [userState]);

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
            <OverviewMap item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
