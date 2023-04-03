import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { setScp } from "../../../../store/scp/scpConditional";
import { setSelectedPost } from "../../../../store/scp/selectedPost";

import UpVoteSvg from "../../../home/posts/postssvgs/arrowicons/UpVoteSvg";
import DownVoteSvg from "../../../home/posts/postssvgs/arrowicons/DownVoteSvg";
import TextOnlyPost from "./svg/TextOnlyPost";

const UserPostMap = ({ post, i, length }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);

  return (
    <div
      className='up-mapparent'
      style={{
        borderRadius:
          i === 0 ? "4px 4px 0 0" : i === length - 1 && "0 0 4px 4px",
      }}
      onClick={() => {
        dispatch(setScp("user"));
        dispatch(setSelectedPost(post));
        navigate(`/r/${post?.community?.name}/comments/${post?.id}`);
      }}
    >
      <div
        className='posts-vote post-voteleft'
        style={{
          borderRadius: i === 0 ? "4px 0 0 0" : i === length - 1 && "0 0 0 4px",
        }}
      >
        <div
          className='posts-upvote post-votebut'
          onClick={(e) => {
            e.stopPropagation();
            if (post.upvotes?.includes(authState?.id)) {
              handleRemoveUpvote(post);
              return;
            }
            handleUpvote(post);
          }}
        >
          <UpVoteSvg id={post.id} post={post} authState={authState} />
        </div>
        <div
          className='posts-votecount'
          style={{
            color: post?.upvotes?.includes(authState?.id)
              ? "red"
              : post?.downvotes?.includes(authState?.id)
              ? "#7193ff"
              : "",
          }}
        >
          {post.upvotes.length - post.downvotes.length}
        </div>
        <div
          className='posts-downvote post-votebut'
          onClick={(e) => {
            e.stopPropagation();
            if (post.downvotes?.includes(authState.id)) {
              handleRemoveDownvote(post);
              return;
            }
            handleDownvote(post);
          }}
        >
          <DownVoteSvg id={post.id} post={post} authState={authState} />
        </div>
      </div>

      <div className='up-mapright'>
        <div className='up-wh'>
          <TextOnlyPost />
        </div>

        <div className='up-postinfo'>
          <div className='up-title'>{post?.title}</div>
          <div className='up-f'>
            <div
              className='up-fc hoverunderline'
              onClick={() => {
                window.location.href = `/r/${post?.community?.name}`;
              }}
            >
              r/{post?.community?.name}
            </div>
            <div className='dot-posts'>•</div>
            <span>Posted by u/{post?.user?.name}</span>&nbsp;
            <span>1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPostMap;
