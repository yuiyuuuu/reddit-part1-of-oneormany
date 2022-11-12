import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeGetRequest } from "../requests/helperFunction";

const Posts = () => {
  const history = useNavigate();

  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    const f = await makeGetRequest("posts");
    setPosts(f);
  }, []);

  return posts.map((post) => (
    <div key={post.id}>
      <div onClick={() => history("/")}>{post.title}</div>
      <a href={`/posts/${post.id}}`}>hi</a>
    </div>
  ));
};

export default Posts;

//      <div onClick={() => history(`/posts/${post.id}`)}>{post.title}</div>
