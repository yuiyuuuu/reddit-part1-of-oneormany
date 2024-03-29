import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { timeConvert } from "../../../../../requests/timeConvert";
import { setScp } from "../../../../../store/scp/scpConditional";
import "./cs.scss";
import NoResults from "./NoResults";

const CommentSearch = ({ commentResults, selectedPost, query }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  return (
    <div>
      <div className='cs-parent'>
        <div className='cs-top'>
          <span>Comments with "{query}"</span>
          <span className='cs-divider'>|</span>
          <a
            className='cs-all'
            onClick={() =>
              nav(
                `/r/${selectedPost.community.name}/comments/${selectedPost.id}`
              )
            }
          >
            All comments
          </a>
          <span className='cs-divider'>|</span>
        </div>

        {commentResults.length > 0 ? (
          commentResults.map((comment) => (
            <div
              className='cs-result'
              onClick={() => {
                nav(
                  `/r/${selectedPost.community.name}/comments/${selectedPost.id}/comment/${comment.id}/?context=3`,
                  { state: { from: query } }
                );
                dispatch(setScp("scpno"));
              }}
            >
              <div className='cs-resulttoprow'>
                <div
                  className='comment-icon'
                  id={`icon-${comment?.id}`}
                  style={{
                    marginRight: "4px",
                    width: "20px",
                    height: "20px",
                  }}
                >
                  <img
                    src={
                      comment.user?.photo
                        ? `data:image/png;base64,${comment?.user.photo}`
                        : "/assets/defaultpfp.png"
                    }
                    className='comment-pfp'
                  />
                </div>
                <div className='cs-username'>{comment.user.name}</div>
                <div
                  className='cs-op'
                  style={{
                    display:
                      selectedPost?.user?.id !== comment?.user?.id && "none",
                  }}
                >
                  OP
                </div>

                <span className='cs-d'> · </span>

                <span className='cs-t'>{timeConvert(comment?.createdAt)}</span>
              </div>
              <div className='cs-resultbot'>
                <div className='cs-body'>{comment.message}</div>
                <div className='cs-p'>
                  <div className='cs-mright'>
                    {comment.upvotes?.length - comment.downvotes?.length} upvote
                  </div>
                  <span>0 awards</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <NoResults query={query} />
        )}
      </div>
    </div>
  );
};

export default CommentSearch;
