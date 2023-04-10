import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./uc.scss";

import UserCommentsMap from "./UserCommentsMap";

const UserComments = () => {
  const selectedUser = useSelector((state) => state.selectedUser);

  const [commentGroup, setCommentGroup] = useState({});

  useEffect(() => {
    //group comments by the post it's from
    if (!selectedUser?.id) return;
    const group = {};

    selectedUser?.comments.forEach((comment) => {
      group[comment.post.id] ||= [{ ...comment.post, type: "post" }];
      group[comment.post.id].push(comment);
    });

    setCommentGroup(group);
  }, [selectedUser]);

  console.log(commentGroup);

  return (
    <div className='uc-parent'>
      {Object.values(commentGroup).map((item) => (
        <UserCommentsMap item={item} />
      ))}
    </div>
  );
};

export default UserComments;
