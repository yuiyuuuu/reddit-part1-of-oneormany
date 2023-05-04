import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { setScp } from "../../../../store/scp/scpConditional";
import { setSelectedPost } from "../../../../store/scp/selectedPost";
import { handleSetPrevHref } from "../../../../store/users/prevHrefBeforeOverlay";
import { hoverUserInit } from "../../../../requests/hoverInformation/hoverUserInitFunction";
import { hoverCommunitiesInitFunction } from "../../../../requests/hoverInformation/hoverCommunitiesInitFunction";

import $ from "jquery";

import OverviewPostCommentList from "./overviewcomments/OverviewPostCommentList";

import CommentIconOverview from "./svg/CommentIconOverview";

const OverviewComment = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedUser = useSelector((state) => state.selectedUser);

  const [howMany, setHowMany] = useState(3);

  const [result, setResult] = useState([]);

  useEffect(() => {
    //some important notes
    //used array below is to handle an edge case where there are two comments, one being a child of the other
    //if we get the child comment first, it will automatically find the parent and make the object, which is correct
    //the issue comes after, where the parent comment also gets put into an array, creating a duplicate
    //not sure if there are any bugs with this but so far looks good

    setResult([]);
    const comments = item.filter((v) => v.type === "comment");
    const allComments = item[0].data.post.comments;
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
      comments.forEach((comment) => {
        let chain = false;
        let grouping = {};

        function group(selected, top) {
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
              group({ data: parentcomment }, false);
            } else {
              //else we only need the parent id if the parentcomment is the current users comment
              if (parentcomment.user.id === selectedUser?.id) {
                group({ data: parentcomment }, false);
              }
            }
          }
        }

        const c = group(comment, true);

        if (!chain && c !== "falsed") {
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

  useEffect(() => {
    $(document).ready(() => {
      hoverUserInit(
        dispatch,
        `.hov-user-${item[0]?.data?.post?.user?.id}-ovcomment`,
        item[0].data.post
      );

      hoverCommunitiesInitFunction(
        dispatch,
        `.hov-community-${item[0]?.data?.id}-ovcomment`,
        item[0].data.post
      );
    });
  }, []);

  return (
    <div style={{ marginBottom: "10px" }}>
      <div className='overviewco-parent'>
        <div
          className='overviewco-postinfo'
          onClick={() => {
            dispatch(setScp("user"));
            dispatch(setSelectedPost(item[0].data.post));
            dispatch(handleSetPrevHref(window.location.pathname));

            navigate(
              `/r/${item[0].data.post.community.name}/comments/${item[0].data.post.id}`
            );
          }}
        >
          <CommentIconOverview />

          <div className='overviewco-postinner'>
            <div
              className='overviewco-a'
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/user/${item[0].data.user.name}`);
              }}
            >
              {item[0].data.user.name}&nbsp;
            </div>
            commented on&nbsp;
            <div className='overviewco-posttitle'>
              {item[0].data.post.title}
            </div>
            <div className='dot-posts'>•</div>
            <div
              className={`overviewco-com hov-community-${item[0]?.data?.id}-ovcomment`}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/r/${item[0].data.post.community.name}`);
              }}
            >
              r/{item[0]?.data?.post.community.name}
            </div>
            <div className='dot-posts'>•</div>
            Posted by &nbsp;
            <div
              className={`overviewco-u hov-user-${item[0]?.data?.post?.user?.id}-ovcomment`}
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/user/${item[0].data.post.user.name}`;
              }}
            >
              u/{item[0].data.post.user.name}
            </div>
          </div>
        </div>
        <div className='overviewco-comments'>
          {result.slice(0, howMany).map((comment) => (
            <OverviewPostCommentList
              top={true}
              object={comment}
              post={item[0].data.post}
              idEquals={selectedUser?.id}
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
    </div>
  );
};

export default OverviewComment;
