import React from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import $ from "jquery";

import { toggleCommunityStyling } from "../store/communitystyling";

const Test = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const communityState = useSelector((state) => state.postsindividualcommunity);
  const authState = useSelector((state) => state.auth);
  const postState = useSelector((state) => state.posts);

  const [loading, setLoading] = useState("");

  useEffect(() => {
    if (loading) return;
    $(document).ready(() => {
      if (!window.localStorage.getItem("token")) {
        dispatch(toggleCommunityStyling(false));
        return;
      }

      if (
        authState.id !== communityState?.owner?.id &&
        !communityState.moderators?.includes(authState.id)
      ) {
        dispatch(toggleCommunityStyling(false));
        return;
      }

      const styleParms = new URLSearchParams(
        new URL(window.location.href).search
      ).getAll("styling")[0];

      dispatch(toggleCommunityStyling(styleParms === "true"));
    });
  }, [loading, authState]);

  console.log(communityState);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() =>
        navigate("/r/hallo/comment/5c83664b-0768-426a-961c-9877bb00616e")
      }
    >
      clickhere
    </div>
  );
};

export default Test;
