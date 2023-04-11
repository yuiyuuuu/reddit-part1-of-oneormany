import React from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { handleRecent } from "../../../../requests/handleRecent";
import { setSelectedPost } from "../../../../store/scp/selectedPost";
import { setScp } from "../../../../store/scp/scpConditional";
import { sorting } from "../../../../requests/sortingfunction";

import CommentIconOverview from "../overview/svg/CommentIconOverview";
import UserCommentMapCh from "./UserCommentMapCh";

const UserCommentsMap = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = item.find((v) => v.type);
  const authState = useSelector((state) => state.auth);

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
        <div className='ucf12fw300 uc0079d3 uchoverun'>
          {item[0]?.user?.name}
        </div>
        &nbsp; commented on {post?.title}&nbsp;
        <div className='dot-posts'>•</div>
        <div
          className='uc-com uchoverun'
          onClick={() => (window.location.href = `/r/${post?.community?.name}`)}
        >
          r/{post?.community?.name}
        </div>
        <div className='dot-posts'>•</div>
        Posted by &nbsp;
        <span
          className='uchoverun'
          onClick={() => (window.location.href = `/user/${post?.user?.name}`)}
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
