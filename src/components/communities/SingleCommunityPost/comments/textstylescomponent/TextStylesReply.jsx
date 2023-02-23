import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GifSvg from "./svg/GifSvg";
import ThreeDotTSC from "./svg/ThreeDotTSC";
import "./tsc.scss";

import $ from "jquery";
import { useCallback } from "react";

const TextStylesReply = ({ idv, show, reference }) => {
  const [width, setWidth] = useState(0);

  const resize = useCallback(() => {
    const g = document.getElementById(`tsc-${idv}-co`).offsetWidth;

    setWidth(g);
  }, [show, width]);

  useEffect(() => {
    if (idv === "main") {
      document.addEventListener("readystatechange", () => {
        //need this since the post comment input box is shown at the start of load, but the reply ones are not
        resize();
      });
    }

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [show]);

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
          <div className='tsc-icon' style={{ display: width < 626 && "none" }}>
            <GifSvg />
          </div>
          <div className='tsc-icon' style={{ display: width < 656 && "none" }}>
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
