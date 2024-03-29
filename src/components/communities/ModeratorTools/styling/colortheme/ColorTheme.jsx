import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import UploadFileSvg from "../../modtoolssvgs/UploadFileSvg";
import ColorPicker from "./ColorPicker";

import { Buffer } from "buffer";

import $ from "jquery";

import { stylingChange } from "../../../../../store/posts-individualcommunity";
import DownArrowColorThemeSquare from "../../modtoolssvgs/DownArrowColorThemeSquare";

import { onSelectFile } from "../../../../../requests/getBase64Image";
import TrashCan from "../../modtoolssvgs/TrashCan";
import { setBodyBrightness } from "../../../../../store/bodyBrightness";
import { lightOrDark } from "../../../../../requests/lightOrDark";

import { setMadeChange } from "../../../../../store/comstyling/madeChange";

const ColorTheme = ({ community, setSelectedSection }) => {
  const dispatch = useDispatch();

  //color picker states
  const [base, setBase] = useState(false);
  const [baseColor, setBaseColor] = useState(null);
  const [baseColor2, setBaseColor2] = useState(null);

  const [highlight, setHighlight] = useState(false);
  const [highlightColor, setHighlightColor] = useState(null);
  const [highlightColor2, setHighlightColor2] = useState(null);

  const [color, setColor] = useState(false);
  const [colorColor, setColorColor] = useState(null);
  //used to ensure colorColor is always a valid hex
  const [colorColor2, setColorColor2] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageBlob, setSelectedImageBlob] = useState(null);

  const [loading, setLoading] = useState(true);

  function checkValidHex(v) {
    if (!v) return;
    if (v?.length < 7) return false;
    return /^#[0-9A-F]{6}$/i.test(v);
  }

  function handleClose(which) {
    switch (which) {
      case "color":
        setColor(false);
        const valid = checkValidHex(colorColor2);
        if (!valid) setColorColor2(colorColor);

      case "highlight":
        setHighlight(false);
        const valid2 = checkValidHex(highlightColor2);
        if (!valid2) setHighlightColor2(highlightColor);

      case "base":
        setBase(false);
        const valid3 = checkValidHex(baseColor2);
        if (!valid3) setBaseColor2(baseColor);

      default:
        return;
    }
  }

  async function getBase64Image(img) {
    const arrayBuffer = await (await fetch(img)).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer).toString("base64");

    setSelectedImage(buffer);
  }

  function handleImageUpload(e) {
    const binary = onSelectFile(e);

    setSelectedImageBlob(binary.blob);

    getBase64Image(binary.blob);

    $(".communities-backgroundimage").css(
      "background-image",
      `url(${binary.blob})`
    );

    $("#comstyling-input").css("background-image", `url(${binary.blob})`);

    $(".communities-mainbot").css("background-color", "");
    e.target.value = ""; //allows same file upload twice if user deletes
    dispatch(setMadeChange(true));
  }

  function handleDeleteImage() {
    setSelectedImage(null);
    setSelectedImageBlob(null);

    $(".communities-backgroundimage").css("background-image", "");
    $("#comstyling-input").css("background-image", "");

    $(".communities-mainbot").css(
      "background-color",
      colorColor || community.themeBodyColor
    );

    if (community?.image) {
      dispatch(setMadeChange(true));
    } else {
      dispatch(setMadeChange(false)); // if there was no image from the start and we delete it
    }
  }

  function handleChange() {
    const info = {
      id: community.id,
      base: baseColor.slice(1) || null,
      highlight: highlightColor.slice(1) || null,
      body: colorColor.slice(1) || null,
      image: selectedImage || null,
    };

    dispatch(stylingChange(info)).then((res) => {
      if (res === "success") {
        setSelectedSection("");
        dispatch(setMadeChange(false));
      }
    });
  }

  function handleCancel() {
    //body color
    $(".communities-mainbot").css(
      "background-color",
      "#" + community.themeBodyColor
    );

    //base color
    const basec = "#" + community.themeBaseColor;
    dispatch(setBodyBrightness(lightOrDark(community.themeBaseColor)));
    if (!community?.bannerColor) {
      $(`#communities-banner${community.id}`).css("background-color", basec);
    }

    $(`#comright-toprow${community.id}`).css("background-color", basec);
    $(`#rightmod-banner-${community?.id}`).css("background-color", basec);
    $(`#comdefaulticon-${community?.id}`).css("fill", basec);

    //highlight colors

    const c = "#" + community.themeHighlightColor;
    const q = $(".communities-joinbut").html();

    if (q.toLowerCase() === "join") {
      $(".communities-joinbut").css("background-color", c);
    } else {
      if (c === "#FFFFFF") {
        $(".communities-joinbut").css("color", "#EDEFF1");
        $(".communities-joinbut").css("border", "1px solid" + "#EDEFF1");
      } else {
        $(".communities-joinbut").css("color", c);
        $(".communities-joinbut").css("border", "1px solid" + c);
      }
    }

    $(`#communitypost-create-${community.id}`).css("background-color", c);

    $(`#rightmod-message-${community.id}`).css("border", "1px solid" + c);
    $(`#rightmod-message-${community.id}`).css("color", c);

    $(`#rightmod-modmap-${community?.id}`).css("color", c);
    $(`#rightmod-p-${community?.id}`).css("color", c);
    $(`#right-owner-${community?.id}`).css("color", c);

    //background image
    $(`.communities-backgroundimage`).css("background-image", "");

    dispatch(setMadeChange(false));
  }

  const colorPickerSet = useCallback(() => {
    const l = document.getElementById("base-square").getBoundingClientRect();
    const v = document
      .getElementById("highlight-square")
      .getBoundingClientRect();
    const t = document.getElementById("color-square").getBoundingClientRect();
    $("#colorpicker-base").css("top", l.top + l.height + "px");
    $("#colorpicker-base").css(
      "left",
      l.left - $("#colorpicker-base").width() - 6
    );

    $("#colorpicker-highlight").css("top", v.top + v.height + "px");
    $("#colorpicker-highlight").css(
      "left",
      v.left - $("#colorpicker-highlight").width() - 6
    );

    $("#colorpicker-color").css("top", t.top + t.height + "px");
    $("#colorpicker-color").css(
      "left",
      v.left - $("#colorpicker-color").width() - 6
    );
  }, []);

  useEffect(() => {
    if (loading) return;
    colorPickerSet();
    $(document).click(function (event) {
      var $target = $(event.target);

      if (
        !$target.closest("#colorpicker-base").length &&
        $("#colorpicker-base").is(":visible") &&
        !$target.closest("#base-comstyling").length
      ) {
        handleClose("base");
      }

      if (
        !$target.closest("#colorpicker-color").length &&
        $("#colorpicker-color").is(":visible") &&
        !$target.closest("#color-comstyling").length
      ) {
        handleClose("color");
      }

      //third
      if (
        !$target.closest("#colorpicker-highlight").length &&
        $("#colorpicker-highlight").is(":visible") &&
        !$target.closest("#highlight-comstyling").length
      ) {
        handleClose("highlight");
      }
    });
  }, [colorColor2, highlightColor2, baseColor2, loading]);

  useEffect(() => {
    if (community.image?.length) {
      setSelectedImage(community.image);
    }
  }, []);

  //set loading state to false.
  $(document).ready(() => {
    setLoading(false);
  });

  if (loading) return "loading";

  return (
    <div>
      <div className='comstyling-color'>Color Theme</div>
      <div className='comstyling-p'>
        These community styling options will also display in Reddit apps.
      </div>

      <div className='comstyling-themecontainer'>
        <div className='comstyling-t'>Theme Colors</div>

        <div className='comstyling-base' id='base-comstyling'>
          <div
            className='grow comstyling-l'
            onClick={() => {
              setHighlight(false);
              setColor(false);
              setBase((prev) => !prev);
            }}
          >
            Base
          </div>

          <div
            className='comstyling-basecolor'
            id='base-square'
            onClick={() => {
              setHighlight(false);
              setColor(false);
              setBase((prev) => !prev);
            }}
            style={{
              backgroundColor: baseColor || "#" + community.themeBaseColor,
            }}
          >
            <DownArrowColorThemeSquare display={base} />
          </div>
        </div>

        <div className='comstyling-base' id='highlight-comstyling'>
          <div
            className='grow comstyling-l'
            onClick={() => {
              setBase(false);
              setColor(false);
              setHighlight((prev) => !prev);
            }}
          >
            Highlight
          </div>

          <div
            className='comstyling-basecolor'
            id='highlight-square'
            onClick={() => {
              setBase(false);
              setColor(false);
              setHighlight((prev) => !prev);
            }}
            style={{
              backgroundColor:
                highlightColor || "#" + community.themeHighlightColor,
            }}
          >
            <DownArrowColorThemeSquare display={highlight} />
          </div>
        </div>
      </div>

      <div className='comstyling-bodycontainer' id='color-comstyling'>
        <div className='comstyling-t'>Body Background</div>

        <div className='comstyling-base'>
          <div
            className='grow comstyling-l'
            onClick={() => {
              setBase(false);
              setHighlight(false);
              setColor((prev) => !prev);
            }}
          >
            Color
          </div>

          <div
            className='comstyling-basecolor'
            id='color-square'
            onClick={() => {
              setBase(false);
              setHighlight(false);
              !color ? setColor((prev) => !prev) : handleClose("color");
            }}
            style={{
              backgroundColor: colorColor || "#" + community.themeBodyColor,
            }}
          >
            <DownArrowColorThemeSquare display={color} />
          </div>
        </div>

        <div className='comstyling-imagecontainer'>
          <div>Image</div>

          <div
            className='comstyling-input'
            id='comstyling-input'
            onClick={() => {
              if (!selectedImage) {
                document.getElementById("comstyling-imageupload").click();
              } else {
                return;
              }
            }}
            style={{
              cursor: !selectedImage ? "pointer" : "auto",
              backgroundImage: !community?.image
                ? selectedImage && `url(${selectedImageBlob})`
                : `url(data:image/png;base64,${community?.image})`,
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
              id='comstyling-imageupload'
              type='file'
              hidden
              accept='image/png, image/jpeg'
              onChange={(e) => {
                handleImageUpload(e);
              }}
            />
          </div>
        </div>
      </div>

      <button
        className='bluebutton-button'
        style={{ width: "100%", margin: "8px 0px" }}
        onClick={() => handleChange()}
      >
        Save
      </button>
      <button
        className='blueborder-button'
        style={{ width: "100%" }}
        onClick={() => {
          setSelectedSection("");
          handleCancel();
        }}
      >
        Cancel
      </button>

      <ColorPicker
        which={"base"}
        active={base}
        func={setBase}
        set={setBaseColor}
        selectedcolor={baseColor}
        second={setBaseColor2}
        secondV={baseColor2}
        checkValidHex={checkValidHex}
      />
      <ColorPicker
        which={"highlight"}
        active={highlight}
        func={setHighlight}
        set={setHighlightColor}
        selectedcolor={highlightColor}
        second={setHighlightColor2}
        secondV={highlightColor2}
        checkValidHex={checkValidHex}
      />
      <ColorPicker
        which={"color"}
        active={color}
        func={setColor}
        set={setColorColor}
        selectedcolor={colorColor}
        second={setColorColor2}
        secondV={colorColor2}
        checkValidHex={checkValidHex}
        selectedImage={selectedImage}
      />
    </div>
  );
};

export default ColorTheme;
