import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./scp.scss";

import UpVoteSvg from "../../home/posts/postssvgs/arrowicons/UpVoteSvg";
import DownVoteSvg from "../../home/posts/postssvgs/arrowicons/DownVoteSvg";
import ImageIcon from "./scpsvgs/ImageIcon";
import TextIcon from "./scpsvgs/TextIcon";
import CloseIcon from "./scpsvgs/CloseIcon";
import CommunityInformation from "../../submit/cominfo/CommunityInformation";

const SingleCommunityPost = ({
  selectedPost,
  nav,
  selectedCommunity,
  handleUpvote,
  handleDownvote,
  handleRemoveUpvote,
  handleRemoveDownvote,
}) => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

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
                    if (selectedPost.downvotes?.includes(authState?.id)) {
                      handleRemoveDownvote();
                      return;
                    }
                    handleDownvote();
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

              <div className='scp-info'>
                {selectedPost?.image ? <ImageIcon /> : <TextIcon />}
                <div className='scp-title'>{selectedPost?.title}</div>
              </div>
            </div>

            <div
              className='scp-irow2'
              onClick={() => nav(`/r/${selectedPost?.community?.name}`)}
            >
              <CloseIcon />
              Close
            </div>
          </div>
        </div>
        <div className='scp-inner'>
          <div className='scp-main'>
            <div className='scp-postcontainer'></div>

            <div className='scp-cominfocontainer'>
              <CommunityInformation selectedCommunity={selectedCommunity} />
            </div>
          </div>
        </div>

        <div
          className='scp-clickback'
          onClick={() => navigate(`/r/${selectedPost.community.name}`)}
        />
      </div>
    </div>
  );
};

export default SingleCommunityPost;
