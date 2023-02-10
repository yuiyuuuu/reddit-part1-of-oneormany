import React from "react";
import { useSelector } from "react-redux";
import "./scp.scss";

import UpVoteSvg from "../../home/posts/postssvgs/arrowicons/UpVoteSvg";
import DownVoteSvg from "../../home/posts/postssvgs/arrowicons/DownVoteSvg";

const SingleCommunityPost = ({ selectedPost }) => {
  const authState = useSelector((state) => state.authState);
  console.log(authState);

  return (
    <div style={{ display: !selectedPost && "none" }}>
      <div className='scp-parent'>
        <div className='scp-banner'>
          <div className='scp-bannerrow'>
            <div className='scp-irow'>
              <div className='scp-votes'>
                <div
                  className='posts-upvote post-votebut'
                  onClick={() => {
                    if (selectedPost.upvotes.includes(authState?.id)) {
                      handleRemoveUpvote();
                      return;
                    }
                    handleUpvote();
                  }}
                  style={{ marginTop: "-2px" }}
                >
                  <UpVoteSvg
                    id={selectedPost?.id}
                    post={selectedPost}
                    authState={authState}
                  />
                </div>

                <div className='scp-num'>100</div>

                <div
                  className='posts-upvote post-votebut'
                  onClick={() => {
                    if (selectedPost.upvotes.includes(authState?.id)) {
                      handleRemoveUpvote();
                      return;
                    }
                    handleUpvote();
                  }}
                  style={{ marginTop: "-2px" }}
                >
                  <DownVoteSvg
                    id={selectedPost?.id}
                    post={selectedPost}
                    authState={authState}
                  />
                </div>
              </div>
            </div>

            <div className='scp-irow2'>Close</div>
          </div>
        </div>
        <div className='scp-inner'>
          <div className='scp-main'></div>
        </div>
      </div>
    </div>
  );
};

export default SingleCommunityPost;
