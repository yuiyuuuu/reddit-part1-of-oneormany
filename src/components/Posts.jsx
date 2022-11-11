import React, { useState, useEffect } from "react";
import { makeGetRequest } from "../requests/helperFunction";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    const f = await makeGetRequest("posts");
    setPosts(f);
  }, []);

  return <div>{posts[0]?.title}</div>;
};

export default Posts;
