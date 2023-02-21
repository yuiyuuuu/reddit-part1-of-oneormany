import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./scp.scss";

import $ from "jquery";

import UpVoteSvg from "../../home/posts/postssvgs/arrowicons/UpVoteSvg";
import DownVoteSvg from "../../home/posts/postssvgs/arrowicons/DownVoteSvg";
import ImageIcon from "./scpsvgs/ImageIcon";
import TextIcon from "./scpsvgs/TextIcon";
import CloseIcon from "./scpsvgs/CloseIcon";
import CommunityInformation from "../../submit/cominfo/CommunityInformation";
import DefaultCommunitiesIcon from "../communitiessvg/DefaultCommunitiesIcon";
import CommentSvg from "../../home/posts/postssvgs/CommentSvg";
import ShareSvg from "../../home/posts/postssvgs/ShareSvg";
import ApproveSvg from "./scpsvgs/ApproveSvg";
import RemoveSvg from "./scpsvgs/RemoveSvg";
import SpamSvg from "./scpsvgs/SpamSvg";
import ShieldSvg from "./scpsvgs/ShieldSvg";
import ThreeDot from "./scpsvgs/ThreeDot";
import NoCommentsyet from "./nocomment/NoCommentsyet";
import CommentsList from "./comments/CommentsList";

import { setComments } from "../../../store/comments/comments";
import { handleAddComment } from "../../../store/posts-individualcommunity";
const SingleCommunityPost = ({
  selectedPost,
  nav,
  selectedCommunity,
  handleUpvote,
  handleDownvote,
  handleRemoveUpvote,
  handleRemoveDownvote,
  scrollPos,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const [commentInput, setCommentInput] = useState("");
  const [commentImage, setCommentImage] = useState(null);

  function handleCommentSubmit() {
    if (!commentInput.length) return;
    //this one has no parent id since its root comment
    const obj = {
      communityid: selectedCommunity.id,
      message: commentInput,
      userId: authState.id,
      postId: selectedPost.id,
      parentId: null,
    };

    dispatch(handleAddComment(obj)).then((res) => {
      dispatch(setComments(res.comments));
      setCommentInput("");
    });
  }

  useEffect(() => {
    //sets scp component to the top of the page, so when the user selects another post, it wont start at the old scroll position
    return () => {
      $(".scp-parent").scrollTop(0);
      setCommentImage("");
    };
  }, [window.location.href]);

  useEffect(() => {
    if (!selectedPost?.comments) return;

    dispatch(setComments(selectedPost?.comments));
  }, [selectedPost?.comments]);

  return (
    <div style={{ display: !selectedPost && "none" }}>
      <div className='scp-parent' style={{ top: scrollPos + 48 + "px" }}>
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

                <div
                  className='scp-num'
                  style={{
                    color: selectedPost?.upvotes.includes(authState?.id)
                      ? "red"
                      : selectedPost?.downvotes.includes(authState?.id)
                      ? "#7193ff"
                      : "",
                  }}
                >
                  {selectedPost?.upvotes.length -
                    selectedPost?.downvotes.length}
                </div>

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
        <div
          className='scp-inner'
          style={{ backgroundColor: "#" + selectedCommunity?.themeBodyColor }}
        >
          <div className='scp-main'>
            <div className='scp-postcontainer'>
              <div className='scp-posttop'>
                <div className='scp-vote'>
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

                  <div
                    className='scp-num'
                    style={{
                      color: selectedPost?.upvotes.includes(authState?.id)
                        ? "red"
                        : selectedPost?.downvotes.includes(authState?.id)
                        ? "#7193ff"
                        : "#1c1c1c",
                      margin: "4px 0",
                    }}
                  >
                    {selectedPost?.upvotes.length -
                      selectedPost?.downvotes.length}
                  </div>

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

                <div className='scp-cominforow'>
                  <div className='scp-q'>
                    <div className='scp-compfp'>
                      {!selectedPost?.community?.iconImage ? (
                        <DefaultCommunitiesIcon
                          fillcolor={
                            "#" + selectedPost?.community?.themeBaseColor
                          }
                          height={20}
                          community={selectedPost?.community}
                        />
                      ) : (
                        <img
                          src={`data:image/png;base64,${selectedPost?.community?.iconImage}`}
                          className='post-communityicon'
                        />
                      )}
                    </div>

                    <div className='scp-comanchor'>
                      {selectedPost?.community?.tag}
                    </div>
                  </div>

                  <div className='dot-posts'>•</div>

                  <div className='scp-y'>
                    <span>Posted by </span>
                    <span className='scp-yp'>
                      <a href='' style={{ color: "rgb(120, 124, 126)" }}>
                        u/{selectedPost?.user?.name}
                      </a>
                    </span>
                    <span> 5 hours ago</span>
                  </div>
                </div>

                <div className='scp-title2'>{selectedPost?.title}</div>

                <div className='scp-desc'>
                  <pre>{selectedPost?.body}</pre>
                </div>

                <div
                  className='scp-selectionrow'
                  style={{ userSelect: "none" }}
                >
                  <div className='scp-comment scp-selectionaligncenter'>
                    <CommentSvg />
                    <span>{selectedPost?.comments.length}</span>
                  </div>

                  <div className='scp-share scp-selectionaligncenter scp-but'>
                    <ShareSvg />
                    <span>Share</span>
                  </div>

                  <div className='scp-modoptions'>
                    <div className='scp-modrow'>
                      <ApproveSvg />
                      <span className='scp-m'>Approve</span>
                    </div>

                    <div className='scp-modrow'>
                      <RemoveSvg />
                      <span className='scp-m'>Remove</span>
                    </div>

                    <div className='scp-modrow'>
                      <SpamSvg />
                      <span className='scp-m'>Spam</span>
                    </div>

                    <div className='scp-modrow'>
                      <ShieldSvg />
                    </div>

                    <div
                      className='scp-modrow'
                      style={{ padding: "2px 4px", height: "20px" }}
                    >
                      <ThreeDot />
                    </div>
                  </div>
                </div>

                <div className='scp-commentparent'>
                  <div style={{ marginBottom: "4px" }}>
                    Comment as{" "}
                    <span className='scp-blue'>u/{authState?.name}</span>
                  </div>

                  <div className='scp-inputparent'>
                    <textarea
                      className='scp-input'
                      placeholder='What are your thoughts?'
                      onChange={(e) => setCommentInput(e.target.value)}
                      value={commentInput}
                    />

                    <div className='scp-inputstylebox'>
                      <button
                        className='bluebutton-button'
                        style={{
                          cursor: !commentInput.length && "not-allowed",
                          filter: !commentInput.length && "grayscale(1)",
                        }}
                        onClick={() => handleCommentSubmit()}
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </div>

                {!selectedPost?.comments?.length && <NoCommentsyet />}
              </div>
              {selectedPost?.comments.length && (
                <div className='comment-mla'>
                  <CommentsList
                    comments={selectedPost?.comments}
                    which={null}
                    post={selectedPost}
                    top={true}
                  />
                </div>
              )}
            </div>

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
