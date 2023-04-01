import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Post from "../../../home/posts/Post";
import OverviewPostCommentList from "./overviewcomments/OverviewPostCommentList";

const OverviewPost = ({ item }) => {
  const selectedUser = useSelector((state) => state.selectedUser);

  const [result, setResult] = useState([]);

  const [howMany, setHowMany] = useState(3);

  const [hasComments, setHasComments] = useState(false);

  function handleUpvote() {}
  function handleDownvote() {}

  function handleRemoveUpvote() {}

  function handleRemoveDownvote() {}

  useEffect(() => {
    if (item.filter((v) => v.type === "comment").length > 0) {
      setHasComments(true);
    }
  }, [item]);

  useEffect(() => {
    //some important notes
    //used is to handle an edge case where there are two comments, one being a child of the other
    //if we get the child comment first, it will automatically find the parent and make the object, which is correct
    //the issue comes after, where the parent comment also gets put into an array, creating a duplicate
    //not sure if there are any bugs with this but so far looks good

    setResult([]);
    const comments = item.filter((v) => v.type === "comment");
    const allComments = item.filter((v) => v.type === "post")[0].data.comments;
    const final = [];

    const used = [];

    function chainOntoObject(obj, chain) {
      while (obj.children) {
        obj = obj.children;
      }

      obj.children = chain;

      return obj;
    }

    if (comments.length > 0) {
      comments.forEach((comment, top) => {
        let chain = false;
        let grouping = {};

        function group(selected) {
          if (used.includes(selected.data?.id)) return "falsed";

          grouping = {
            data: selected.data,
            children: grouping?.data ? grouping : null,
          };

          used.push(selected.data?.id);

          const map = final.map((v) => v.top);

          //find children in final array
          const children = selected.data?.children;

          if (children?.length > 0 && top) {
            children.forEach((it) => {
              if (map.includes(it.id)) {
                const findChildrenInFinal = final.find((v) => v.id === it.id);
                grouping.children = findChildrenInFinal;

                final.filter((v) => v.id !== it.id);
              }
            });
          }

          if (selected.data.parentId) {
            const isParentCommentThere = map.includes(selected.data.parentId);
            //if we have parentid on this comment
            const parentcomment = allComments.find(
              (v) => v.id === selected.data.parentId
            );

            if (isParentCommentThere) {
              const ch = chainOntoObject(
                final.find((v) => v.top === selected.data.parentId),
                grouping
              );

              final[map.indexOf(selected.data.parentId)] = {
                top: selected.data.id,
                ...ch,
              };

              //flag for below
              chain = true;
              return;
            }

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

        group(comment, true);
        if (!chain) {
          //if this comment was chained onto a parent then we dont add it into final to avoid duplicates
          grouping = { top: comment.data.id, ...grouping };
          final.push(grouping);
        }
      });

      const objectDepth = (o) =>
        Object(o) === o
          ? 1 + Math.max(-1, ...Object.values(o).map(objectDepth))
          : 0;

      final.sort(function (a, b) {
        const ad = objectDepth(a.children);
        const bd = objectDepth(b.children);

        if (ad > bd) {
          return -1;
        }

        if (ad < bd) {
          return 1;
        }

        return 0;
      });

      setResult(final);
    }
  }, [selectedUser]);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        marginBottom: "10px",
        borderRadius: "4px",
      }}
    >
      <Post
        post={item.find((v) => v.type === "post").data}
        handleUpvote={handleUpvote}
        handleDownvote={handleDownvote}
        handleRemoveDownvote={handleRemoveDownvote}
        handleRemoveUpvote={handleRemoveUpvote}
        m={hasComments}
        fromOverview={true}
        scp='user'
      />

      <div className='overview-postcomment'>
        {result.slice(0, howMany).map((comment) => (
          <OverviewPostCommentList
            top={true}
            object={comment}
            post={item.find((v) => v.type === "post").data}
          />
        ))}
      </div>

      <div
        className='overview-showmore'
        style={{
          display: result.length < howMany + 1 && "none",
        }}
        onClick={() =>
          setHowMany((prev) => {
            const len = result.length;
            if (len - (howMany + 3) < 0) {
              return prev + (len - howMany);
            }

            return prev + 3;
          })
        }
      >
        <div className='overview-zx'>
          <div className='overview-z'>Load more comments</div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPost;
