import React, { useEffect, useState } from "react";
import "./submit.scss";

import DownArrow from "./submitsvgs/DownArrow";
import Post from "./submitsvgs/post/Post";
import PostSelected from "./submitsvgs/post/PostSelected";
import ImageVideo from "./submitsvgs/image-video/ImageVideo";
import ImageVideoSelected from "./submitsvgs/image-video/ImageVideoSelected";
import Link from "./submitsvgs/link/Link";
import LinkSelected from "./submitsvgs/link/LinkSelected";
import PollSelected from "./submitsvgs/poll/PollSelected";
import Poll from "./submitsvgs/poll/Poll";

import $ from "jquery";

const Submit = () => {
  const [selected, setSelected] = useState("post");

  const [title, setTitle] = useState("");

  useEffect(() => {
    $(".submit-titletext").on("focus", () => {
      $(".submit-titletext").css("border", "1px solid #1A1A1B");

      $(".submit-titletext").on("focusout", () => {
        $(".submit-titletext").css("border", "1px solid #edeff1");
      });
    });
  }, []);

  return (
    <div className='submit-container'>
      <div className='submit-heightholder' />
      <div className='submit-inner1'>
        <div className='submit-inner'>
          <div className='submit-left'>
            <div className='submit-createpost'>
              <div className='submit-createposttext'>Create a post</div>
              <div className='submit-drafts'>
                <span>Drafts</span>
                <span className='submit-draftcount'>0</span>
              </div>
            </div>

            <div className='submit-selectedcommunity'>
              <div className='submit-selectedcommunityinner'>
                <img
                  src='assets/newcommunities/gaming/dndnext.png'
                  className='submit-imageicon'
                />
                <div className='submit-selectedcommunitiesname'>
                  r/communityname
                </div>

                <div className='center'>
                  <DownArrow />
                </div>
              </div>
            </div>

            <div className='submit-inputcontainer'>
              <div className='submit-selecttype'>
                <button
                  className='submit-selectchoice'
                  onClick={() => setSelected("post")}
                  style={{
                    borderBottom: selected === "post" && "2px solid #0079D3",
                  }}
                >
                  {selected === "post" ? <PostSelected /> : <Post />}
                  <span
                    style={{
                      marginLeft: "8px",
                      color: selected === "post" && "#0079D3",
                    }}
                    className='submit-selecttext'
                  >
                    Post
                  </span>
                </button>
                <button
                  className='submit-selectchoice'
                  onClick={() => setSelected("image/video")}
                  style={{
                    borderBottom:
                      selected === "image/video" && "2px solid #0079D3",
                  }}
                >
                  {selected === "image/video" ? (
                    <ImageVideoSelected />
                  ) : (
                    <ImageVideo />
                  )}
                  <span
                    style={{
                      marginLeft: "8px",
                      color: selected === "image/video" && "#0079D3",
                    }}
                    className='submit-selecttext'
                  >
                    Images and Video
                  </span>
                </button>
                <button
                  className='submit-selectchoice'
                  onClick={() => setSelected("link")}
                  style={{
                    borderBottom: selected === "link" && "2px solid #0079D3",
                  }}
                >
                  {selected === "link" ? <LinkSelected /> : <Link />}
                  <span
                    style={{
                      marginLeft: "8px",
                      color: selected === "link" && "#0079D3",
                    }}
                    className='submit-selecttext'
                  >
                    Link
                  </span>
                </button>
                <button
                  className='submit-selectchoice'
                  onClick={() => setSelected("poll")}
                  style={{
                    borderBottom: selected === "poll" && "2px solid #0079D3",
                  }}
                >
                  {" "}
                  {selected === "poll" ? <PollSelected /> : <Poll />}
                  <span
                    style={{
                      marginLeft: "8px",
                      color: selected === "poll" && "#0079D3",
                    }}
                    className='submit-selecttext'
                  >
                    Poll
                  </span>
                </button>
                <button
                  className='submit-selectchoice'
                  onClick={() => setSelected("talk")}
                  style={{
                    borderBottom: selected === "talk" && "2px solid #0079D3",
                  }}
                >
                  {selected === "talk" ? <PollSelected /> : <Poll />}
                  <span
                    style={{
                      marginLeft: "8px",
                      color: selected === "talk" && "#0079D3",
                    }}
                    className='submit-selecttext'
                  >
                    Talk
                  </span>
                </button>
              </div>

              <div className='submit-textcontainer'>
                <div className='submit-title'>
                  <textarea
                    className='submit-titletext'
                    placeholder='Title'
                    maxLength='300'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <div className='submit-titlecount'>{title.length}/300</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: "312px" }}>right</div>
        </div>
      </div>
    </div>
  );
};

export default Submit;
