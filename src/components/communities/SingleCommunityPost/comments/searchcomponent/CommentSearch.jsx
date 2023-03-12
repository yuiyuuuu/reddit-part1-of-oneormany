import React from "react";
import "./cs.scss";

const CommentSearch = ({ commentResults, selectedPost }) => {
  console.log(selectedPost);
  return (
    <div>
      <div className='cs-parent'>
        <div className='cs-top'>
          <span>Comments with "2"</span>
          <span className='cs-divider'>|</span>
          <a className='cs-all'>All comments</a>
        </div>

        {commentResults.map((comment) => (
          <div
            className='cs-result'
            onClick={() => {
              //navigate comment function here
            }}
          >
            <div className='cs-resulttoprow'>
              <div
                className='comment-icon'
                id={`icon-${comment?.id}`}
                style={{ marginRight: "4px", width: "20px", height: "20px" }}
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
                  display: selectedPost?.user.id !== comment.user.id && "none",
                }}
              >
                OP
              </div>

              <span className='cs-d'> · </span>

              <span className='cs-t'>1 day ago</span>
            </div>
            <div className='cs-resultbot'>
              <div className='cs-body'>{comment.message}</div>
              <div className='cs-p'>
                <div className='cs-mright'>1 upvote</div>
                <span>0 awards</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSearch;
