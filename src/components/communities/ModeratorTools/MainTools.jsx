import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "./modtools.scss";
import $ from "jquery";

import { fetchCommunity } from "../../../store/posts-individualcommunity";
import { fetchSpecificCommunityPosts } from "../../../store/posts";

import DefaultCommunitiesIcon from "../communitiessvg/DefaultCommunitiesIcon";

import { sectionCheck } from "./section";
import SomethingWentWrong from "./SomethingWentWrong";
import ModToolsLeftNav from "./ModToolsLeftNav";

const MainTools = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const communityState = useSelector((state) => state.postsindividualcommunity);

  const [loading, setLoading] = useState(true);

  const [selectedSection, setSelectedSection] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const id = params.id;
    dispatch(fetchCommunity(id));
    dispatch(fetchSpecificCommunityPosts(id));
  }, []);

  useEffect(() => {
    const section = params.section;
    if (!sectionCheck[section]) {
      setNotFound(true);
      setLoading(false);
    } else {
      setSelectedSection(sectionCheck[section].toUpperCase());
      setLoading(false);
    }
  }, []);

  $(window).on("load", () => {
    $(".hide").css("display", "none");
  });

  if (loading) return "loading";

  if (!loading && notFound) {
    return <SomethingWentWrong />;
  }

  return (
    <div>
      <div className='modtools-parent'>
        <div className='modtools-inner'>
          <div className='modtools-nav'>
            {communityState.image ? (
              <img src={communityState.image} />
            ) : (
              <DefaultCommunitiesIcon height={20} />
            )}
            <a className='modtools-communityanchor'>
              R/{communityState.name?.toUpperCase()}
            </a>
            / {selectedSection}
          </div>
          <div className='modtools-bottomrow'>
            <ModToolsLeftNav community={communityState} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTools;
