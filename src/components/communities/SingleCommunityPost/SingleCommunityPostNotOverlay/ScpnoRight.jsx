import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { lightOrDark } from "../../../../requests/lightOrDark";
import { setBodyBrightness } from "../../../../store/bodyBrightness";
import {
  changeDescription,
  ChangeIconImage,
} from "../../../../store/posts-individualcommunity";
import "../../SingleCommunityRight/right.scss";

import {
  getBase64Image,
  onSelectFile,
} from "../../../../requests/getBase64Image";
import {
  joinCommunity,
  leaveCommunity,
} from "../../../../store/posts-individualcommunity";
import { dispatchSetAOS } from "../../../../globalcomponents/authoverlaysignup/authOverlaySignupStates";
import { addAlert } from "../../../../globalcomponents/alerts/addAlertsFunctions";

import $ from "jquery";

import ModToolsIconSvg from "../../communitiessvg/ModToolsIconSvg";
import ModToolsIconWhite from "../../communitiessvg/ModToolsIconWhite";
import ThreeDotComRightSvg from "../../communitiessvg/ThreeDotComRightSvg";
import ThreeDotRightWhite from "../../communitiessvg/ThreeDotRightWhite";
import CreatedAtInformation from "../../../submit/cominfo/CreatedAtInformation";
import PenEditSvg from "../../communitiessvg/PenEditSvg";
import Moderators from "../../SingleCommunityRight/Moderators";
import DefaultCommunitiesIcon from "../../communitiessvg/DefaultCommunitiesIcon";

const ScpnoRight = ({ communityState }) => {
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const bodyBrightness = useSelector((state) => state.bodyBrightness);

  const [descState, setDescState] = useState(false);
  const [desc, setDesc] = useState("");

  //array of userids of all users in community
  const [userIds, setUserIds] = useState([]);

  function handleSubmit() {
    const obj = {
      id: communityState.id,
      description: desc,
    };
    dispatch(changeDescription(obj)).then(setDescState(false));
  }

  function handleIconAddClick() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg";
    input.onchange = handleImageUpload;
    input.hidden = true;
    input.click();
  }

  async function handleImageUpload(e) {
    const binary = onSelectFile(e);

    const obj = {
      id: communityState.id,
      image: await getBase64Image(binary.blob),
      communityNameFormat:
        communityState?.communityNameFormat || `r/${communityState.name}`,
    };

    dispatch(ChangeIconImage(obj));
  }

  function handleCommunityJoinAndLeave() {
    if (!authState?.id) {
      dispatch(dispatchSetAOS({ display: true, which: "joincommunity" }));
    } else if (!userIds.includes(authState.id)) {
      dispatch(joinCommunity(authState.id, communityState.id));
      addAlert(`Successfully joined ${communityState.tag}`, dispatch);
    } else {
      dispatch(leaveCommunity(authState.id, communityState.id));
      addAlert(`Successfully left ${communityState.tag}`, dispatch);
    }
  }

  useEffect(() => {
    const b = lightOrDark(communityState.themeBaseColor);
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

    const userids = communityState.users?.map((user) => user.id);
    if (userids) {
      setUserIds(userids);
    }
  }, [communityState]);

  useEffect(() => {
    $(".scpno-noiconadd").hover(
      () => {
        $(".scpno-noiconadd").css("border-style", "solid");
      },
      () => {
        $(".scpno-noiconadd").css("border-style", "dashed");
      }
    );
  }, []);

  useEffect(() => {
    $(document).ready(() => {
      if (userIds.includes(authState.id)) {
        $("#scpno-join").hover(
          () => {
            $("#scpno-joined").html("Leave");
          },
          () => {
            $("#scpno-joined").html("Joined");
          }
        );
      }

      return;
    });

    if (userIds.includes(authState.id)) {
      $("#scpno-join").hover(
        () => {
          $("#scpno-joined").html("Leave");
        },
        () => {
          $("#scpno-joined").html("Joined");
        }
      );
    }
  }, [userIds]);

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
          <div className='scpno-iconparent'>
            <div className='scpno-icon'>
              {!communityState?.iconImage ? (
                communityState?.owner?.id === authState?.id ||
                communityState?.moderators?.includes(authState?.id) ? (
                  <div
                    className='scpno-noiconadd'
                    onClick={() => handleIconAddClick()}
                    style={{ borderColor: `#${communityState.themeBaseColor}` }}
                  >
                    <div className='scpno-plus'>
                      <div
                        className='scpno-p-1'
                        style={{
                          backgroundColor: `#${communityState.themeBaseColor}`,
                        }}
                      />
                      <div
                        className='scpno-p-2'
                        style={{
                          backgroundColor: `#${communityState.themeBaseColor}`,
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className='scpno-default'>
                    <DefaultCommunitiesIcon
                      fillcolor={"#" + communityState?.themeHighlightColor}
                      height={54}
                      community={communityState}
                    />
                  </div>
                )
              ) : (
                <div
                  className='scpno-icon'
                  style={{
                    backgroundImage: `url(data:image/png;base64,${communityState.iconImage})`,
                  }}
                ></div>
              )}
            </div>
            <div className='scpno-infoadd'>
              <a className='scpno-t' href={`/r/${communityState?.name}`}>
                r/{communityState?.name}
              </a>

              {communityState?.owner?.id === authState?.id ||
              communityState?.moderators?.includes(authState?.id) ? (
                <div
                  className='scpno-blueadd'
                  onClick={() => handleIconAddClick()}
                >
                  {communityState?.iconImage ? "Update icon" : "Add icon"}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

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
              style={{
                border: `1px solid #${communityState?.themeBodyColor}`,
              }}
              onClick={() => {
                setDescState(true);
              }}
            >
              Add description
            </div>
          ) : (communityState.owner?.id === authState.id ||
              communityState.moderators?.includes(authState.id)) &&
            communityState.description?.length ? (
            <div
              className='comright-description'
              onClick={() => setDescState(true)}
              style={{ marginTop: "8px" }}
            >
              {communityState?.description} <PenEditSvg />
            </div>
          ) : (
            <div
              className='comright-description-noadmin'
              style={{ marginTop: "8px" }}
            >
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

          <div
            className={
              userIds?.includes(authState?.id)
                ? "blueborder-button"
                : "bluebutton-button"
            }
            style={{
              marginBottom: "8px",
              borderColor:
                userIds?.includes(authState?.id) &&
                `#${communityState?.themeHighlightColor}`,
              backgroundColor:
                !userIds?.includes(authState?.id) &&
                `#${communityState?.themeHighlightColor}`,
              color: userIds?.includes(authState?.id)
                ? `#${communityState.themeHighlightColor}`
                : "white",
            }}
            id='scpno-join'
            onClick={() => handleCommunityJoinAndLeave()}
          >
            {userIds?.includes(authState?.id) ? (
              <span id='scpno-joined'>Joined</span>
            ) : (
              <span>Join</span>
            )}
          </div>

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

export default ScpnoRight;
