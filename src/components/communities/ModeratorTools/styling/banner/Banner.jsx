import React, { useState, useEffect, useCallback } from "react";
import InfoIconName from "../../../communitiessvg/InfoIconName";
import NotSelectedRadio2 from "../../../communitiessvg/NotSelectedradio2";
import SelectedRadio2 from "../../../communitiessvg/SelectedRadio2";
import ColorPicker from "../colortheme/ColorPicker";
import "./banner.scss";

import $ from "jquery";

import UploadFileSvg from "../../modtoolssvgs/UploadFileSvg";
import { onSelectFile } from "../../../../../requests/getBase64Image";
import { useDispatch } from "react-redux";
import { changeBanner } from "../../../../../store/posts-individualcommunity";
import { Buffer } from "buffer";
import TrashCan from "../../modtoolssvgs/TrashCan";
import DownArrowColorThemeSquare from "../../modtoolssvgs/DownArrowColorThemeSquare";
import FillSvg from "../../../communitiessvg/FillSvg";
import TileSvg from "../../../communitiessvg/TileSvg";
import { lightOrDark } from "../../../../../requests/lightOrDark";
import { setMadeChange } from "../../../../../store/comstyling/madeChange";

const Banner = ({ community, setSelectedSection }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [selectedHeight, setSelectedHeight] = useState("");

  const [colorActive, setColorActive] = useState(false);
  const [bannerColor, setBannerColor] = useState(null);
  const [bannerColor2, setBannerColor2] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageBlob, setSelectedImageBlob] = useState(null);
  const [bannerImageType, setBannerImageType] = useState(null);

  async function getBase64Image(img) {
    const arrayBuffer = await (await fetch(img)).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer).toString("base64");

    setSelectedImage(buffer);
  }

  function checkValidHex(v) {
    if (!v) return;
    if (v?.length < 7) return false;
    return /^#[0-9A-F]{6}$/i.test(v);
  }

  const colorPickerSet = useCallback(() => {
    const v = document.getElementById("banner-sq").getBoundingClientRect();
    $("#colorpicker-banner").css("top", v.height + v.top);
    $("#colorpicker-banner").css(
      "left",
      v.left - $("#colorpicker-banner").width() - 6
    );
  }, []);

  function handleDeleteImage() {
    setSelectedImage(null);
    setSelectedImageBlob(null);
    $(`#communities-banner${community.id}`).css("background-image", "");
    setBannerImageType("fill");

    if (community?.bannerImage) {
      dispatch(setMadeChange(true)); //if there is already a preexisting image, we set madechange to true
    }
  }

  function handleImageUpload(e) {
    const binary = onSelectFile(e);

    setSelectedImageBlob(binary.blob);
    getBase64Image(binary.blob);

    $(`#communities-banner${community?.id}`).css(
      "background-image",
      `url(${binary.blob})`
    );
    e.target.value = "";
    dispatch(setMadeChange(true));
  }

  function handleBannerChange() {
    const obj = {
      id: community.id,
      bannerImage: selectedImage,
      bannerColor: bannerColor.slice(1),
      communityBannerSize: selectedHeight,
      bannerImageType: bannerImageType,
    };

    dispatch(changeBanner(obj)).then((res) => {
      if (res === "success") {
        setSelectedSection("");
      }
    });
  }

  function handleCancel() {
    $(`#communities-banner${community.id}`).css(
      "height",
      community.communityBannerSize === "small"
        ? "64px"
        : community.communityBannerSize === "medium"
        ? "128px"
        : "192px"
    );

    $(`#communities-banner${community.id}`).css(
      "background-image",
      community?.bannerImage
        ? `url(data:image/png;base64,${community.bannerImage})`
        : ""
    );

    $(`#communities-banner${community.id}`).css(
      "background-color",
      "#" + community.bannerColor
    );
    dispatch(setMadeChange(false));
  }

  useEffect(() => {
    setBannerColor(community?.bannerColor || community?.themeBaseColor);
    setBannerColor2("#" + community?.bannerColor || community?.themeBaseColor);
    setSelectedHeight(community?.communityBannerSize || "small");
    setBannerImageType(community?.bannerImageType || "fill");
  }, [community]);

  useEffect(() => {
    if (loading) return;
    colorPickerSet();

    $(document)
      .off()
      .click(() => {
        var $target = $(event.target);

        if (
          !$target.closest("#colorpicker-banner").length &&
          $("#colorpicker-banner").is(":visible") &&
          !$target.closest(".banner-row2").length
        ) {
          setColorActive(false);
          const valid = checkValidHex(bannerColor2);
          if (!valid) setBannerColor2(bannerColor);
        }
      });
  }, [loading, bannerColor, bannerColor2]);

  $(document).ready(() => {
    setLoading(false);
  });

  return (
    <div>
      <div className='banner-header'>
        <div className='banner-title'>Banner</div>
        <div className='banner-i'>
          <InfoIconName />
          <span>Banner</span>
        </div>
      </div>

      <div className='banner-second'>
        <div className='banner-subtitle'>Height</div>
        <div className='banner-selectioncontainer'>
          <div
            className='banner-selection'
            onClick={() => {
              $(`#communities-banner${community.id}`).css("height", "64px");
              setSelectedHeight("small");
              dispatch(setMadeChange(true));
            }}
          >
            {selectedHeight === "small" ? (
              <SelectedRadio2 />
            ) : (
              <NotSelectedRadio2 />
            )}
            Small • 64px
          </div>

          <div
            className='banner-selection'
            onClick={() => {
              $(`#communities-banner${community.id}`).css("height", "128px");
              setSelectedHeight("medium");
              dispatch(setMadeChange(true));
            }}
          >
            {selectedHeight === "medium" ? (
              <SelectedRadio2 />
            ) : (
              <NotSelectedRadio2 />
            )}
            Medium • 128px
          </div>

          <div
            className='banner-selection'
            onClick={() => {
              $(`#communities-banner${community.id}`).css("height", "192px");
              setSelectedHeight("large");
              dispatch(setMadeChange(true));
            }}
          >
            {selectedHeight === "large" ? (
              <SelectedRadio2 />
            ) : (
              <NotSelectedRadio2 />
            )}
            Large • 192px
          </div>
        </div>
      </div>

      <div className='banner-third'>
        <div className='banner-subtitle'>Background</div>
        <div
          className='banner-row2'
          onClick={() => setColorActive((prev) => !prev)}
        >
          <div className='banner-rowtext'>Color</div>
          <div
            className='banner-sq'
            id='banner-sq'
            style={{ backgroundColor: bannerColor }}
          >
            <DownArrowColorThemeSquare display={colorActive} />
          </div>
        </div>

        <div className='banner-imagecontainer'>
          <div className='name-t'>Image</div>
          <div
            className='name-inputimage'
            id='name-inputimage'
            onClick={() => {
              if (!selectedImage) {
                document.getElementById("banner-imageinput").click();
              } else {
                return;
              }
            }}
            style={{
              cursor: !selectedImage ? "pointer" : "auto",
              backgroundImage:
                selectedImage?.slice(4) === "blob"
                  ? `url(${selectedImageBlob})`
                  : `url(data:image/png;base64,${selectedImage})`,
            }}
          >
            {!selectedImage && <UploadFileSvg />}

            {!selectedImage && (
              <div style={{ fontSize: "11px" }}>
                Drag and Drop or Upload Image
              </div>
            )}

            {selectedImage && (
              <div className='comstyling-imageremove'>
                <TrashCan deleteFunction={handleDeleteImage} />
              </div>
            )}

            <input
              id='banner-imageinput'
              type='file'
              hidden
              accept='image/png, image/jpeg'
              onChange={handleImageUpload}
            />
          </div>

          {selectedImage && (
            <div className='banner-tile'>
              <div
                className='banner-imageopt'
                onClick={() => {
                  $(`#communities-banner${community.id}`).css(
                    "background-size",
                    "cover"
                  );

                  $(`#communities-banner${community.id}`).css(
                    "background-repeat",
                    "no-repeat"
                  );

                  $(`#communities-banner${community.id}`).css(
                    "background-position",
                    "center"
                  );
                  setBannerImageType("fill");
                }}
                style={{
                  backgroundColor:
                    bannerImageType === "fill" &&
                    "#" + community.themeHighlightColor,
                  color:
                    bannerImageType === "fill"
                      ? lightOrDark(community.themeHighlightColor) === "dark"
                        ? "white"
                        : "#edeff1"
                      : "#878A8C",
                }}
              >
                <FillSvg
                  fill={
                    bannerImageType === "fill"
                      ? lightOrDark(community.themeHighlightColor) === "dark"
                        ? "white"
                        : "#edeff1"
                      : "#878A8C"
                  }
                />
                Fill
              </div>
              <div
                className='banner-imageopt'
                onClick={() => {
                  $(`#communities-banner${community.id}`).css(
                    "background-size",
                    "auto"
                  );

                  $(`#communities-banner${community.id}`).css(
                    "background-repeat",
                    "repeat"
                  );

                  $(`#communities-banner${community.id}`).css(
                    "background-position",
                    "top"
                  );
                  setBannerImageType("tile");
                }}
                style={{
                  backgroundColor:
                    bannerImageType === "tile" &&
                    "#" + community.themeHighlightColor,
                  color:
                    bannerImageType === "tile"
                      ? lightOrDark(community.themeHighlightColor) === "dark"
                        ? "white"
                        : "#edeff1"
                      : "#878A8C",
                }}
              >
                <TileSvg
                  fill={
                    bannerImageType === "tile"
                      ? lightOrDark(community.themeHighlightColor) === "dark"
                        ? "white"
                        : "#edeff1"
                      : "#878A8C"
                  }
                />
                Tile
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className='bluebutton-button'
        style={{ margin: "8px 0" }}
        onClick={() => handleBannerChange()}
      >
        Save
      </div>
      <div
        className='blueborder-button'
        onClick={() => {
          setSelectedSection("");
          handleCancel();
        }}
      >
        Cancel
      </div>

      <ColorPicker
        which={"banner"}
        active={colorActive}
        func={setColorActive}
        set={setBannerColor}
        selectedcolor={bannerColor}
        second={setBannerColor2}
        secondV={bannerColor2}
        checkValidHex={checkValidHex}
      />
    </div>
  );
};

export default Banner;
