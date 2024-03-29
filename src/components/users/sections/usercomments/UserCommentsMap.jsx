import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { handleRecent } from "../../../../requests/handleRecent";
import { setSelectedPost } from "../../../../store/scp/selectedPost";
import { setScp } from "../../../../store/scp/scpConditional";
import { sorting } from "../../../../requests/sortingfunction";
import { hoverUserInit } from "../../../../requests/hoverInformation/hoverUserInitFunction";
import { hoverCommunitiesInitFunction } from "../../../../requests/hoverInformation/hoverCommunitiesInitFunction";

import CommentIconOverview from "../overview/svg/CommentIconOverview";
import UserCommentMapCh from "./UserCommentMapCh";

const UserCommentsMap = ({ item, selectedUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [post, setPost] = useState({});

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    setPost(item.find((v) => v.type));
  }, [window.location.href]);

  useEffect(() => {
    if (!post?.id) return;
    hoverUserInit(dispatch, `.hov-user-${post.id}-ucmch`, post);
    hoverUserInit(dispatch, `.hov-user-${post.id}-ucmch2`, post);
    hoverCommunitiesInitFunction(
      dispatch,
      `.hov-communities-${post?.community?.id}-ucmch`,
      post
    );
  }, [post]);

  return (
    <div className='uc-mapparent'>
      <div
        className='uc-mappost'
        onClick={() => {
          handleRecent(authState, post);
          dispatch(setScp("user"));
          dispatch(setSelectedPost(post));
          navigate(`/r/${post.community.name}/comments/${post.id}`);
        }}
      >
        <CommentIconOverview idv={post?.id} />
        <div
          className={`ucf12fw300 uc0079d3 uchoverun hov-user-${post.id}-ucmch`}
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `/user/${selectedUser?.name}`;
          }}
        >
          {selectedUser?.name}
        </div>
        &nbsp; commented on {post?.title}&nbsp;
        <div className='dot-posts'>•</div>
        <div
          className={`uc-com uchoverun hov-communities-${post?.community?.id}-ucmch`}
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `/r/${post?.community?.name}`;
          }}
        >
          r/{post?.community?.name}
        </div>
        <div className='dot-posts'>•</div>
        Posted by &nbsp;
        <span
          className={`uchoverun hov-user-${post.id}-ucmch2`}
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `/user/${post?.user?.name}`;
          }}
        >
          u/{post?.user?.name}
        </span>
      </div>
      {item
        .filter((d) => !d.type)
        .sort(sorting)
        ?.map((comment, i) => (
          <UserCommentMapCh
            item={comment}
            first={i === 0 && true}
            post={post}
            auth={authState}
            last={i === item?.length - 2 ? true : false}
          />
        ))}
    </div>
  );
};

export default UserCommentsMap;
