import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./right.scss";

import $ from "jquery";

import ModToolsIconSvg from "../communitiessvg/ModToolsIconSvg";
import ModToolsIconWhite from "../communitiessvg/ModToolsIconWhite";
import ThreeDotComRightSvg from "../communitiessvg/ThreeDotComRightSvg";
import ThreeDotRightWhite from "../communitiessvg/ThreeDotRightWhite";
import CreatedAtInformation from "../../submit/cominfo/CreatedAtInformation";
import { changeDescription } from "../../../store/posts-individualcommunity";
import PenEditSvg from "../communitiessvg/PenEditSvg";
import { lightOrDark } from "../../../requests/lightOrDark";
import { setBodyBrightness } from "../../../store/bodyBrightness";
import Moderators from "./Moderators";

const SingleCommunityRight = ({ communityState }) => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const bodyBrightness = useSelector((state) => state.bodyBrightness);

  const [descState, setDescState] = useState(false);
  const [desc, setDesc] = useState("");

  function handleSubmit() {
    const obj = {
      id: communityState.id,
      description: desc,
    };
    dispatch(changeDescription(obj)).then(setDescState(false));
  }

  useEffect(() => {
    const b = lightOrDark(communityState.themeBaseColor);
    console.log(communityState);
    if (!b) return;
    dispatch(setBodyBrightness(b));
  }, [communityState.themeBaseColor]);

  useEffect(() => {
    $(".comright-descinput").focus();

    $("#comright-descparent").on("keydown", "textarea", function (e) {
      $(this).css("height", "auto");
      $(this).height(this.scrollHeight + 10);
    });
    $("#comright-descparent").find("textarea").keydown();

    $(document)
      .off()
      .click(function (event) {
        var $target = $(event.target);

        if (
          !$target.closest(".comright-descedit").length &&
          $(".comright-descedit").is(":visible") &&
          !$target.closest("#penedit").length
        ) {
          setDescState(false);
        }
      });

    $(".comright-description").hover(() => {
      $(".comright-description").css("padding", "4px");
    });

    $(".comright-description").mouseleave(() => {
      $(".comright-description").css("padding", 0);
    });
  }, [descState]);

  $(document).ready(() => {
    $(".comright-description").hover(() => {
      $(".comright-description").css("padding", "4px");
    });

    $(".comright-description").hover(() => {
      $(".comright-description").css(
        "border",
        "1px solid" + "#" + communityState.themeBaseColor
      );
    });

    $(".comright-description").mouseleave(() => {
      $(".comright-description").css("padding", 0);
    });

    $(".comright-description").mouseleave(() => {
      $(".comright-description").css("border", "none");
    });
  });

  useEffect(() => {
    setDesc(communityState?.description || "");
  }, [communityState]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className='comright-parent'>
        <div className='comright-about'>
          <div
            className='comright-toprow'
            id={`comright-toprow${communityState.id}`}
            style={{ backgroundColor: "#" + communityState.themeBaseColor }}
          >
            <div
              className='comright-abouttext'
              style={{
                color:
                  bodyBrightness === "dark" ? "rgb(252,252,252)" : "#7c7c7c",
              }}
            >
              About Community
            </div>
            {(communityState?.owner?.id === authState.id ||
              communityState.moderators?.includes(authState.id)) && (
              <a
                className='comright-modtools'
                href={`/r/${communityState.name}/about/modqueue`}
                style={{
                  color:
                    bodyBrightness === "dark" ? "rgb(252,252,252)" : "#7c7c7c",
                }}
              >
                {bodyBrightness === "dark" ? (
                  <ModToolsIconWhite />
                ) : (
                  <ModToolsIconSvg />
                )}
                MOD TOOLS
              </a>
            )}

            <div
              className='comright-threecontainer'
              style={{
                margin:
                  communityState?.owner?.id === authState.id ||
                  communityState.moderators?.includes(authState.id)
                    ? "0 0 0 4px"
                    : "auto 0 auto auto",
              }}
            >
              {bodyBrightness === "dark" ? (
                <ThreeDotRightWhite />
              ) : (
                <ThreeDotComRightSvg />
              )}
            </div>
          </div>
        </div>

        <div className='comright-descparent' id='comright-descparent'>
          {descState ? (
            <div
              className='comright-descedit'
              style={{
                border: "1px solid" + "#" + communityState.themeBaseColor,
              }}
            >
              <textarea
                placeholder='Tell us about your community'
                className='comright-descinput'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                maxLength={500}
              />

              <div className='comright-inputsave'>
                <div className='comright-charactersleft'>
                  {500 - desc.length} Characters remaining
                </div>

                <div
                  className='comright-descchoice'
                  style={{ color: "red" }}
                  onClick={() => {
                    setDescState(false);
                    setDesc(communityState?.description || "");
                  }}
                >
                  Cancel
                </div>
                <div
                  className='comright-descchoice'
                  style={{ color: "#0079d3" }}
                  onClick={() => handleSubmit()}
                >
                  Save
                </div>
              </div>
            </div>
          ) : (communityState?.owner?.id === authState.id ||
              communityState.moderators?.includes(authState.id)) &&
            (!communityState.description ||
              communityState.description === "") ? (
            <div
              className='comright-adddesc'
              onClick={() => {
                setDescState(true);
              }}
            >
              Add description
            </div>
          ) : (communityState.owner === authState.id ||
              communityState.moderators?.includes(authState.id)) &&
            communityState.description?.length ? (
            <div
              className='comright-description'
              onClick={() => setDescState(true)}
            >
              {communityState?.description} <PenEditSvg />
            </div>
          ) : (
            <div className='comright-description-noadmin'>
              {communityState?.description}
            </div>
          )}
          <CreatedAtInformation selectedCommunity={communityState} />

          <div className='divider' style={{ margin: "16px 0px" }} />

          <div className='cominfo-infocontainer'>
            <div className='cominfo-infocol'>
              <div className='cominfo-count'>
                {communityState.users?.length}
              </div>
              <div className='cominfo-p'>Members</div>
            </div>

            <div className='cominfo-infocol'>
              <div
                className='cominfo-count'
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div className='cominfo-dot'>●</div>
                <span>{communityState.users?.length}</span>
              </div>
              <div className='cominfo-p'>
                <span>Online</span>
              </div>
            </div>

            <div className='cominfo-infocol'></div>

            <div className='cominfo-infocol'></div>
          </div>

          <div className='divider' style={{ margin: "16px 0" }} />

          <a
            className='bluebutton-button'
            id={`communitypost-create-${communityState.id}`}
            href={`/submit/${communityState.tag}`}
            style={{
              backgroundColor: "#" + communityState?.themeHighlightColor,
            }}
          >
            Create Post
          </a>
        </div>
      </div>

      <Moderators community={communityState} />
    </div>
  );
};

export default SingleCommunityRight;
