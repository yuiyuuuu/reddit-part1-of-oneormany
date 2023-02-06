import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./colorpicker.scss";

import { colors } from "./colors";

import $ from "jquery";
import { setBodyBrightness } from "../../../../../store/bodyBrightness";
import { lightOrDark } from "../../../../../requests/lightOrDark";

import { setMadeChange } from "../../../../../store/comstyling/madeChange";

const ColorPicker = ({
  active,
  func,
  which,
  set,
  selectedcolor,
  second,
  secondV,
  checkValidHex,
  selectedImage,
}) => {
  const communityState = useSelector((state) => state.postsindividualcommunity);
  const dispatch = useDispatch();

  function handleChange(c) {
    switch (which) {
      case "color":
        if (selectedImage) return; //dont change the color of background if image is active
        $(".communities-mainbot").css("background-color", c);
        dispatch(setMadeChange(true));
        break;

      case "base":
        dispatch(setBodyBrightness(lightOrDark(c.slice(1))));
        if (!communityState?.bannerColor) {
          $(`#communities-banner${communityState.id}`).css(
            "background-color",
            c
          );
        }
        $(`#comright-toprow${communityState.id}`).css("background-color", c);
        $(`#rightmod-banner-${communityState?.id}`).css("background-color", c);
        $(`#comdefaulticon-${communityState?.id}`).css("fill", c);
        dispatch(setMadeChange(true));
        break;

      case "highlight":
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

        $(`#communitypost-create-${communityState.id}`).css(
          "background-color",
          c
        );

        $(`#rightmod-message-${communityState.id}`).css(
          "border",
          "1px solid" + c
        );
        $(`#rightmod-message-${communityState.id}`).css("color", c);

        $(`#rightmod-modmap-${communityState?.id}`).css("color", c);
        $(`#rightmod-p-${communityState?.id}`).css("color", c);
        $(`#right-owner-${communityState?.id}`).css("color", c);
        dispatch(setMadeChange(true));
        break;
      case "banner":
        $(".communities-bannertop").css("background-color", c);
        dispatch(setMadeChange(true));
      default:
        return;
    }
  }

  function handleChange2(c) {
    //this function doesnt have setmadechange
    switch (which) {
      case "color":
        if (selectedImage) return; //dont change the color of background if image is active
        $(".communities-mainbot").css("background-color", c);

        break;

      case "base":
        dispatch(setBodyBrightness(lightOrDark(c.slice(1))));
        if (!communityState?.bannerColor) {
          $(`#communities-banner${communityState.id}`).css(
            "background-color",
            c
          );
        }
        $(`#comright-toprow${communityState.id}`).css("background-color", c);
        $(`#rightmod-banner-${communityState?.id}`).css("background-color", c);
        $(`#comdefaulticon-${communityState?.id}`).css("fill", c);

        break;

      case "highlight":
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

        $(`#communitypost-create-${communityState.id}`).css(
          "background-color",
          c
        );

        $(`#rightmod-message-${communityState.id}`).css(
          "border",
          "1px solid" + c
        );
        $(`#rightmod-message-${communityState.id}`).css("color", c);

        $(`#rightmod-modmap-${communityState?.id}`).css("color", c);
        $(`#rightmod-p-${communityState?.id}`).css("color", c);
        $(`#right-owner-${communityState?.id}`).css("color", c);

        break;
      case "banner":
        $(".communities-bannertop").css("background-color", c);

      default:
        return;
    }
  }

  useEffect(() => {
    switch (which) {
      case "color":
        second("#" + communityState.themeBodyColor);
        break;

      case "highlight":
        second("#" + communityState.themeHighlightColor);
        break;

      case "base":
        second("#" + communityState.themeBaseColor);
        break;
      default:
        return;
    }
  }, []);

  useEffect(() => {
    const v = checkValidHex(secondV);

    if (!v) {
      $(`#input-${which}`).css("border", "1px solid red");
      $(`#colorpicker-i${which}`).css("display", "block");
    } else {
      handleChange2(secondV);
      set(secondV);
      $(`#input-${which}`).css("border", "1px solid #edeff1");
      $(`#colorpicker-i${which}`).css("display", "none");
    }
  }, [secondV]);

  return (
    <div
      className='colorpicker-parent'
      style={{ display: !active && "none" }}
      id={`colorpicker-${which}`}
    >
      <div className='colorpicker-text'>COLOR PICKER</div>

      <div className='colorpicker-colorwrap'>
        {colors.map((color) => (
          <div
            className='colorpicker-color'
            style={{
              backgroundColor: `#${color}`,
              border: selectedcolor === `#${color}` && "1px solid #1c1c1c",
              boxSizing: "border-box",
            }}
            onClick={() => {
              handleChange("#" + color);
              second("#" + color);
            }}
          />
        ))}
      </div>

      <div className='colorpicker-text'>HEX CODE</div>
      <div className='colorpicker-rowselected'>
        <div
          className='colorpicker-selectedcolor'
          style={{
            backgroundColor:
              selectedcolor ||
              (which === "color" && "#" + communityState.themeBodyColor) ||
              (which === "base" && "#" + communityState.themeBaseColor) ||
              (which === "highlight" &&
                "#" + communityState.themeHighlightColor) ||
              (which === "banner" && "#" + selectedcolor),
          }}
        ></div>
        <input
          className='colorpicker-input'
          id={`input-${which}`}
          value={`${secondV}`}
          maxLength={7}
          onChange={(e) => {
            second(e.target.value);
          }}
        />

        <div className='colorpicker-i' id={`colorpicker-i${which}`}>
          !
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
