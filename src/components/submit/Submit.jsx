import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./submit.scss";
import { makePostRequest } from "../../requests/helperFunction";
import { toggleCreateCommunity } from "../../store/nav-createcommunity";
import { setScp } from "../../store/scp/scpConditional";
import { setNavLocation } from "../../store/nav/navLocation";

import $ from "jquery";

import DownArrow from "./submitsvgs/DownArrow";
import Post from "./submitsvgs/post/Post";
import PostSelected from "./submitsvgs/post/PostSelected";
import ImageVideo from "./submitsvgs/image-video/ImageVideo";
import ImageVideoSelected from "./submitsvgs/image-video/ImageVideoSelected";
import Link from "./submitsvgs/link/Link";
import LinkSelected from "./submitsvgs/link/LinkSelected";
import PollSelected from "./submitsvgs/poll/PollSelected";
import Poll from "./submitsvgs/poll/Poll";
import PostText from "./submit-components/PostText";
import ImageVideoText from "./submit-components/ImageVideoText";
import LinkText from "./submit-components/LinkText";
import PollText from "./submit-components/PollText";
import SearchIcon from "./submitsvgs/SearchIcon";
import SubmitRight from "./SubmitRight";

const Submit = () => {
  const history = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const authState = useSelector((state) => state.auth);
  const lnState = useSelector((state) => state.lnState);
  const lnnlState = useSelector((state) => state.lnnl);

  const [selected, setSelected] = useState("post");

  //count for path image
  const [counter, setCounter] = useState(0);

  //current input for search
  const [textInput, setTextInput] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [title, setTitle] = useState("");
  const [text, setText] = useState(""); //used for post and poll only
  const [url, setUrl] = useState(""); //used for url only
  const [images, setImages] = useState([]); //image inputs
  const [imagePreviews, setImagePreviews] = useState([]);

  //communities
  const [communities, setCommunities] = useState([]);
  //selected community
  const [selectedCommunity, setSelectedCommunity] = useState({});

  //find community based on textinput
  function findCommunity() {
    const com = authState.communities?.find(
      (g) =>
        g.tag.toLowerCase() === textInput.toLowerCase() ||
        g.name.toLowerCase() === textInput.toLowerCase()
    );

    if (!com) {
      // setTextInput("");
      setSelectedCommunity({});
      return;
    }
  }

  //this one doesnt erase textinput
  function findCommunity2(f) {
    const com = authState.communities?.find(
      (g) =>
        g.tag.toLowerCase() === f.toLowerCase() ||
        g.name.toLowerCase() === f.toLowerCase()
    );

    if (!com) {
      setSelectedCommunity({});
      return;
    }

    setSelectedCommunity(com);
  }

  function isValid() {
    switch (selected) {
      case "post":
        return;
      case "image/video":
        return;
      default:
        return;
    }
  }

  async function handleSubmit() {
    dispatch(setScp(null));
    try {
      switch (selected) {
        case "post":
          if (!title.length) {
            //error function here
            return;
          }

          const v = await makePostRequest("posts", {
            title: title,
            body: text,
            userId: authState.id,
            communityId: selectedCommunity.id,
          });

          history(`/r/${selectedCommunity.name}/comments/${v?.id}`);
          break;
        case "image/video":
          if (!title.length) {
            //error function here
            return;
          }
          const a = await makePostRequest("posts", {
            title: title,
            body: text,
            userId: authState.id,
            communityId: selectedCommunity.id,
            image: images,
          });
          history(`/r/${selectedCommunity.name}/comments/${a?.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //find community as textinput is updated
  useEffect(() => {
    findCommunity2(textInput);
  }, [textInput]);

  useEffect(() => {
    dispatch(setNavLocation({ name: "Create Post", image: "submit" }));
  }, []);

  useEffect(() => {
    switch (params.type) {
      case "image":
        setSelected("image/video");
        setCounter(1);
        break;

      case "clip":
        setSelected("link");
        setCounter(1);
        break;

      default:
        break;
    }

    const token = window.localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    if (selectedCommunity?.id) return;
    if (!communities?.length) return;

    if (params.id) {
      const h = communities?.find(
        (item) => item?.name.toLowerCase() === params.id.toLowerCase()
      );
      if (h?.id) {
        setSelectedCommunity(h);
        setTextInput(h.tag);
      }
    }
  }, [communities?.length, window.location.href]);

  useEffect(() => {
    if (location.state?.from) {
      const com = authState.communities?.find(
        (g) => g.tag.toLowerCase() === location.state.from.toLowerCase()
      );

      setTextInput(location.state.from);
      setSelectedCommunity(com);
    }
  }, []);

  useEffect(() => {
    //change color of border on focus of title textarea
    $(".submit-titletext").on("focus", () => {
      $(".submit-titletext").css("border", "1px solid #1A1A1B");

      $(".submit-titletext").on("focusout", () => {
        $(".submit-titletext").css("border", "1px solid #edeff1");
      });
    });

    $(document)
      .off()
      .click((e) => {
        const $target = $(event.target);
        if (
          !$target.closest(".submit-selectedcommunityinner").length &&
          !$target.closest(".submit-choosecommunity").length &&
          $(".submit-choosecommunity").is(":visible")
        ) {
          setIsInputFocused(false);
          if (!selectedCommunity?.id) {
            setTextInput("");
          }
        }
      });

    //prevents new line on enter
    $(".submit-titletext").keydown(function (e) {
      if (e.keyCode == 13) {
        e.preventDefault();
        return false;
      }
    });
  }, [selectedCommunity]);

  useEffect(() => {
    $(document).ready(() => {
      $("#submit-searchinput")
        .off()
        .focus(() => {
          setIsInputFocused(true);
        });

      $("#submit-searchinput").focusout(() => {
        findCommunity2(textInput);
      });
    });
  }, [$("#submit-searchinput")]);

  useEffect(() => {
    if (textInput === "") {
      setCommunities(authState.communities);
      return;
    }

    const c = authState.communities?.filter(
      (g) =>
        g.tag.toLowerCase().includes(textInput.toLowerCase()) ||
        g.name.toLowerCase().includes(textInput.toLowerCase())
    );

    setCommunities(c);
  }, [textInput, authState.communities]);

  if (!authState?.id) {
    //try and fix this later. if user is on this page without logged in, we do something
    return <div>Not logged in</div>;
  }

  return (
    <div
      className='submit-container'
      style={{
        boxSizing: "border-box",
        paddingLeft: (lnnlState || lnState) && "270px",
      }}
    >
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
                {textInput === "" && !isInputFocused ? (
                  <div className='submit-dottedcircle' />
                ) : isInputFocused ? (
                  <SearchIcon />
                ) : (
                  <img
                    src='/assets/defaultcommunityimage/defaultcommunity.png'
                    className='submit-imageicon'
                  />
                )}
                <input
                  className='submit-selectedcommunitiesname'
                  id='submit-searchinput'
                  placeholder='Choose a Community'
                  value={textInput}
                  onChange={(e) => {
                    setIsInputFocused(true);
                    setTextInput(e.target.value);
                  }}
                />

                <div
                  className='center'
                  onClick={() => {
                    setIsInputFocused((prev) => !prev);
                  }}
                >
                  <DownArrow />
                </div>
              </div>

              <div
                className='submit-choosecommunity'
                style={{ display: isInputFocused ? "" : "none" }}
              >
                <div
                  style={{ width: "100%", display: textInput !== "" && "none" }}
                >
                  <div className='submit-graytitle'>YOUR PROFILE</div>
                  <div className='submit-mapcommunitycontainer submit-profile'>
                    <img
                      src={
                        authState?.image ||
                        (counter === 1
                          ? "../assets/defaultpfp.png"
                          : "/assets/defaultpfp.png")
                      }
                      className='submit-pfpimage'
                    />

                    <div className='submit-choosetitle'>u/{authState.name}</div>
                  </div>
                </div>

                {!communities?.length && textInput !== "" && (
                  <div className='submit-nocommunities'>
                    No Communities Found
                  </div>
                )}
                <div
                  className='submit-divider'
                  style={{ display: communities?.length && "none" }}
                />

                <div className='submit-createcomrow'>
                  <div
                    className='submit-graytitle'
                    style={{ marginTop: "8px" }}
                  >
                    YOUR COMMUNITIES
                  </div>

                  <button
                    className='submit-createnew'
                    onClick={() => {
                      setIsInputFocused(false);
                      dispatch(toggleCreateCommunity(true));
                    }}
                  >
                    Create New
                  </button>
                </div>

                <div
                  className='submit-newuser'
                  style={{ display: communities?.length && "none" }}
                >
                  No communities found
                </div>
                {communities?.map((item, index) => (
                  <div
                    className='submit-mapcommunitycontainer'
                    style={{
                      marginBottom:
                        index === authState.communities.length - 1 && 0,
                    }}
                    onClick={(e) => {
                      setTextInput(item.tag);
                      $("#submit-searchinput").focus();
                      setIsInputFocused(false);

                      setSelectedCommunity(item);
                    }}
                  >
                    <img
                      src={
                        counter === 1
                          ? "../assets/defaultcommunityimage/defaultcommunity.png"
                          : "/assets/defaultcommunityimage/defaultcommunity.png"
                      }
                      className='submit-communityimage'
                    />

                    <div className='submit-choosecol'>
                      <div className='submit-choosetitle'>{item.tag}</div>
                      <div className='submit-membercount'>
                        {item.users.length}{" "}
                        {item.users.length === 1 ? "member" : "members"}
                      </div>
                    </div>
                  </div>
                ))}
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
                {selected === "post" ? (
                  <PostText text={text} setText={setText} />
                ) : selected === "image/video" ? (
                  <ImageVideoText
                    setImages={setImages}
                    images={images}
                    imagePreviews={imagePreviews}
                    setImagePreviews={setImagePreviews}
                  />
                ) : selected === "link" ? (
                  <LinkText url={url} setUrl={setUrl} />
                ) : selected === "poll" ? (
                  <PollText />
                ) : (
                  ""
                )}
              </div>
              <div className='submit-flairandpost'>
                <div className='submit-flaircontainer'>
                  <div className='submit-flair'>flair1</div>
                  <div className='submit-submitcontainer'>
                    <div className='grow' style={{ height: "100%" }} />
                    <div className='submit-l'>
                      <button className='submit-draftbut'>Save Draft</button>
                      <button
                        className='submit-postbut'
                        disabled={!selectedCommunity?.id}
                        style={{
                          filter: !selectedCommunity?.id && "grayscale(1)",
                          cursor: !selectedCommunity?.id && "not-allowed",
                        }}
                        onClick={() => handleSubmit()}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SubmitRight selectedCommunity={selectedCommunity} />
        </div>
      </div>
    </div>
  );
};

export default Submit;
