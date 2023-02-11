import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Test2 = () => {
  const navigate = useNavigate();
  const communityState = useSelector((state) => state.postsindividualcommunity);
  const authState = useSelector((state) => state.auth);
  const postState = useSelector((state) => state.posts);

  useEffect(() => {}, []);

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
      onClick={() => navigate("/test1")}
    >
      clickhere
    </div>
  );
};

export default Test2;
