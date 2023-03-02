import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCreateCommunity } from "../../store/nav-createcommunity";
import { useNavigate, redirect } from "react-router-dom";
import { CreateCommunity } from "../../store/posts-individualcommunity";

import "./communities.scss";
import $ from "jquery";

import Iicon from "../../components/communities/communitiessvg/Iicon";
import NotSelectedRadio from "../../components/communities/communitiessvg/NotSelectedRadio";
import SelectedRadio from "../../components/communities/communitiessvg/SelectedRadio";
import PublicIcon from "../../components/communities/communitiessvg/PublicIcon";

import Xicon from "../../components/communities/communitiessvg/XIcon";
import RestrictedIcon from "../../components/communities/communitiessvg/RestrictedIcon";
import PrivateIcon from "../../components/communities/communitiessvg/PrivateIcon";
import NSFWNotSelected from "../../components/communities/communitiessvg/NSFWNotSelected";
import NSFWSelected from "../../components/communities/communitiessvg/NSFWSelected";

const CreateCommunityOverlay = ({ createOverlayState }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const authState = useSelector((state) => state.auth);

  const [communityName, setCommunityName] = useState("");
  const [type, setType] = useState("public");
  const [nsfw, setNsfw] = useState(false);

  const handleCreateCommunity = () => {
    $("#redtext-createcommunity").css("display", "none");

    if (!communityName.length) {
      $("#redtext-createcommunity").css("display", "block");
      return;
    }

    const info = {
      name: communityName,
      tag: `r/${communityName}`,
      NSFW: nsfw,
      visibility: type,
      ownerId: authState.id,
      users: {
        connect: [{ id: authState.id }],
      },
      communityNameFormat: `r/${communityName}`,
      createAt: new Date(),
    };

    dispatch(CreateCommunity(info)).then((res) => {
      res === "exists"
        ? handleTakenCommunity()
        : (window.location.href = `/r/${communityName}`);
    });
  };

  function handleTakenCommunity() {
    $("#redtext2-createcommunity").css("display", "block");
  }

  return (
    <div style={{ display: createOverlayState ? "" : "none" }}>
      <div className='createoverlay-main'>
        <div className='createoverlay-container'>
          <div className='createoverlay-inner'>
            <div className='createoverlay-toprow'>
              <div
                className='flex-aligncenter'
                style={{ justifyContent: "space-between", width: "100%" }}
              >
                <div className='createoverlay-toptext'>Create a Community</div>
                <Xicon />
              </div>
            </div>

            <div className='createoverlay-name'>Name</div>
            <div className='createoverlay-warningrow flex-aligncenter'>
              Community names including capitalization cannot be changed.
              <Iicon />
            </div>

            <div className='createoverlay-inputcontainer'>
              <div className='createoverlay-r'>r/</div>
              <input
                className='createoverlay-input'
                maxLength={21}
                value={communityName}
                onChange={(e) => {
                  $("#redtext2-createcommunity").css("display", "none");
                  $("#redtext-createcommunity").css("display", "none");
                  setCommunityName(e.target.value);
                }}
              />
            </div>

            <div
              className='createoverlay-charactersremaining'
              style={{ color: 21 - communityName.length === 0 && "red" }}
            >
              {21 - communityName.length} Characters remaining
            </div>

            <div
              style={{ color: "red", fontSize: "12px", display: "none" }}
              id='redtext-createcommunity'
            >
              A community name is required
            </div>

            <div
              style={{ color: "red", fontSize: "12px", display: "none" }}
              id='redtext2-createcommunity'
            >
              Sorry, r/{communityName} is taken. Try Another
            </div>
            <div className='createoverlay-communitytype'>Community Type</div>

            <div className='createoverlay-typecontainer'>
              <div className='createoverlay-typeselect'>
                {type === "public" ? (
                  <SelectedRadio />
                ) : (
                  <div
                    onClick={() => setType("public")}
                    style={{
                      width: "16px",
                      height: "16px",
                      marginRight: "6px",
                    }}
                  >
                    <NotSelectedRadio />
                  </div>
                )}
                <PublicIcon />
                <div className='createoverlay-typetitle'>Public</div>
                <div className='createoverlay-typedesc'>
                  Anyone can view, post, and comment to this community
                </div>
              </div>

              <div className='createoverlay-typeselect'>
                {type === "restricted" ? (
                  <SelectedRadio />
                ) : (
                  <div
                    onClick={() => setType("restricted")}
                    style={{
                      width: "16px",
                      height: "16px",
                      marginRight: "6px",
                    }}
                  >
                    <NotSelectedRadio />
                  </div>
                )}
                <RestrictedIcon />
                <div className='createoverlay-typetitle'>Restricted</div>
                <div className='createoverlay-typedesc'>
                  Anyone can view this community, but only approved users can
                  post
                </div>
              </div>

              <div
                className='createoverlay-typeselect'
                style={{ marginBottom: "46px" }}
              >
                {type === "private" ? (
                  <SelectedRadio />
                ) : (
                  <div
                    onClick={() => setType("private")}
                    style={{
                      width: "16px",
                      height: "16px",
                      marginRight: "6px",
                    }}
                  >
                    <NotSelectedRadio />
                  </div>
                )}
                <PrivateIcon />
                <div className='createoverlay-typetitle'>Private</div>
                <div className='createoverlay-typedesc'>
                  Only approved users can view and submit to this community
                </div>
              </div>

              <div className='createoverlay-communitytype'>Adult content</div>
              <div
                className='createoverlay-nsfwcontainer'
                onClick={() => setNsfw((prev) => !prev)}
              >
                {nsfw ? <NSFWSelected /> : <NSFWNotSelected />}

                <div className='createoverlay-orange'>NSFW</div>
                <div
                  className='createoverlay-communitytype'
                  style={{ marginTop: "1px", userSelect: "none" }}
                >
                  18+ year old community
                </div>
              </div>
              <div className='createoverlay-twobutcontainer'>
                <div
                  className='blueborder-button'
                  style={{ marginRight: "8px" }}
                  onClick={() => dispatch(toggleCreateCommunity(false))}
                >
                  Cancel
                </div>
                <div
                  className='bluebutton-button'
                  onClick={() => handleCreateCommunity()}
                >
                  Create Community
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className='createoverlay-clickback'
          onClick={() => dispatch(toggleCreateCommunity(false))}
        />
      </div>
    </div>
  );
};

export default CreateCommunityOverlay;
