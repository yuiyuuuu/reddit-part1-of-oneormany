import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GifSvg from "./svg/GifSvg";
import ThreeDotTSC from "./svg/ThreeDotTSC";
import "./tsc.scss";

import $ from "jquery";
import { useCallback } from "react";

const TextStylesReply = ({ idv, show }) => {
  const [width, setWidth] = useState(0);

  const resize = useCallback(() => {
    const g = $(`#tsc-${idv}`).width();
    console.log(g, "gggg");
  }, [show]);

  useEffect(() => {
    $(document).ready(() => {
      resize();
      window.addEventListener("resize", resize);
    });

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [show]);

  console.log(width);

  return (
    <div>
      <div className='tsc-parent'>
        <div className='tsc-row'>
          <div className='tsc-icon' style={{ display: width < 296 && "none" }}>
            <GifSvg />
          </div>

          <div className='tsc-icon' style={{ display: width < 326 && "none" }}>
            <GifSvg />
          </div>
        </div>

        <div
          className='tsc-divider'
          style={{ display: width < 356 && "none" }}
        />

        <div className='tsc-row'>
          <div className='tsc-icon' style={{ display: width < 386 && "none" }}>
            <GifSvg />
          </div>
          <div className='tsc-icon' style={{ display: width < 416 && "none" }}>
            <GifSvg />
          </div>
          <div className='tsc-icon' style={{ display: width < 546 && "none" }}>
            <GifSvg />
          </div>
          <div className='tsc-icon' style={{ display: width < 476 && "none" }}>
            <GifSvg />
          </div>
          <div className='tsc-icon' style={{ display: width < 506 && "none" }}>
            <GifSvg />
          </div>
          <div className='tsc-icon' style={{ display: width < 536 && "none" }}>
            <GifSvg />
          </div>
          <div className='tsc-icon' style={{ display: width < 566 && "none" }}>
            <GifSvg />
          </div>
        </div>

        <div
          className='tsc-divider'
          style={{ display: width < 585 && "none" }}
        />

        <div className='tsc-row'>
          <div className='tsc-icon' style={{ display: "none" }}>
            <GifSvg />
          </div>
          <div className='tsc-icon' style={{ display: "none" }}>
            <GifSvg />
          </div>
          <div className='tsc-icon' style={{ display: "none" }}>
            <GifSvg />
          </div>
          <div className='tsc-icon'>
            <ThreeDotTSC />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextStylesReply;
