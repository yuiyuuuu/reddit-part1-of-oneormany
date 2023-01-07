import React from "react";
import { useSelector } from "react-redux";
import "./colorpicker.scss";

import { colors } from "./colors";

import $ from "jquery";
import { useEffect } from "react";

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

  function handleChange(c) {
    if (selectedImage) return; //dont change the color of background if image is active
    switch (which) {
      case "color":
        $(".communities-mainbot").css("background-color", c);
        break;

      case "base":
        $(`#communities-banner${communityState.id}`).css("background-color", c);

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
      handleChange(secondV);
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
                "#" + communityState.themeHighlightColor),
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
