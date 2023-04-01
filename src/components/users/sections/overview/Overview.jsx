import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "./overview.scss";
import OverviewMap from "./OverviewMap";

const Overview = () => {
  const userState = useSelector((state) => state.selectedUser);

  const [mapResults, setMapResults] = useState({});

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
        <div className='overview-top'>add here later</div>

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
