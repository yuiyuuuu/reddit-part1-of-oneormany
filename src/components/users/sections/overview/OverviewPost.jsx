import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Post from "../../../home/posts/Post";

const OverviewPost = ({ item }) => {
  const selectedUser = useSelector((state) => state.selectedUser);

  const [result, setResult] = useState([]);

  function handleUpvote() {}
  function handleDownvote() {}

  function handleRemoveUpvote() {}

  function handleRemoveDownvote() {}

  useEffect(() => {
    const comments = item.filter((v) => v.type === "comment");
    const allComments = item.filter((v) => v.type === "post")[0].data.comments;
    const final = [];

    if (comments.length > 0) {
      comments.forEach((comment) => {
        let grouping = {};

        function group(selected) {
          grouping = {
            data: selected.data,
            children: grouping?.data ? grouping : null,
          };

          if (selected.data.parentId) {
            //if we have parentid on this comment
            const parentcomment = allComments.find(
              (v) => v.id === selected.data.parentId
            );

            if (selected.data.user.id === selectedUser?.id) {
              //if this comment's user is the same as the selected user
              //we will always need the parent comment
              group({ data: parentcomment });
            } else {
              //else we only need the parent id if the parentcomment is the current users comment
              if (parentcomment.user.id === selectedUser?.id) {
                group({ data: parentcomment });
              }
            }
          }
        }

        group(comment);
        final.push(grouping);
      });

      setResult(final);
    }
  }, [selectedUser]);

  console.log({ item: item, result: result });

  return (
    <div>
      <Post
        post={item.find((v) => v.type === "post").data}
        handleUpvote={handleUpvote}
        handleDownvote={handleDownvote}
        handleRemoveDownvote={handleRemoveDownvote}
        handleRemoveUpvote={handleRemoveUpvote}
      />

      <div className='overview-postcomment'></div>
    </div>
  );
};

export default OverviewPost;
