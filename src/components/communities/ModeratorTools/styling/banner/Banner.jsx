import React, { useState, useEffect, useCallback } from "react";
import InfoIconName from "../../../communitiessvg/InfoIconName";
import NotSelectedRadio2 from "../../../communitiessvg/NotSelectedradio2";
import SelectedRadio2 from "../../../communitiessvg/SelectedRadio2";
import ColorPicker from "../colortheme/ColorPicker";
import "./banner.scss";

import $ from "jquery";

const Banner = ({ community, setSelectedSection }) => {
  const [loading, setLoading] = useState(true);

  const [selectedHeight, setSelectedHeight] = useState("");

  const [colorActive, setColorActive] = useState(false);
  const [bannerColor, setBannerColor] = useState(null);
  const [bannerColor2, setBannerColor2] = useState(null);

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

  useEffect(() => {
    if (loading) return;
    colorPickerSet();
  }, [loading]);

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
            onClick={() => setSelectedHeight("64")}
          >
            {selectedHeight === "64" ? (
              <SelectedRadio2 />
            ) : (
              <NotSelectedRadio2 />
            )}
            Small • 64px
          </div>

          <div
            className='banner-selection'
            onClick={() => setSelectedHeight("128")}
          >
            {selectedHeight === "128" ? (
              <SelectedRadio2 />
            ) : (
              <NotSelectedRadio2 />
            )}
            Medium • 128px
          </div>

          <div
            className='banner-selection'
            onClick={() => setSelectedHeight("192")}
          >
            {selectedHeight === "192" ? (
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
          <div className='banner-sq' id='banner-sq' />
        </div>
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
