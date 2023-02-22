import React from "react";
import { useSelector } from "react-redux";
import GifSvg from "./svg/GifSvg";
import ThreeDotTSC from "./svg/ThreeDotTSC";
import "./tsc.scss";

const TextStylesComment = () => {
  const width = useSelector((state) => state.screenProperties);
  console.log(width);

  return (
    <div>
      <div className='tsc-parent'>
        <div className='tsc-row'>
          <div className='tsc-icon'>
            <GifSvg />
          </div>

          <div className='tsc-icon'>
            <GifSvg />
          </div>
        </div>

        <div className='tsc-divider' />

        <div className='tsc-row'>
          <div className='tsc-icon'>
            <GifSvg />
          </div>
          <div className='tsc-icon'>
            <GifSvg />
          </div>
          <div className='tsc-icon'>
            <GifSvg />
          </div>
          <div className='tsc-icon'>
            <GifSvg />
          </div>
          <div className='tsc-icon'>
            <GifSvg />
          </div>
          <div className='tsc-icon' style={{ display: width < 1153 && "none" }}>
            <GifSvg />
          </div>
          <div className='tsc-icon' style={{ display: width < 1187 && "none" }}>
            <GifSvg />
          </div>
        </div>

        <div
          className='tsc-divider'
          style={{ display: width < 1200 && "none" }}
        />

        <div className='tsc-row'>
          <div className='tsc-icon' style={{ display: width < 1234 && "none" }}>
            <GifSvg />
          </div>
          <div className='tsc-icon' style={{ display: width < 1268 && "none" }}>
            <GifSvg />
          </div>
          <div className='tsc-icon' style={{ display: width < 1300 && "none" }}>
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

export default TextStylesComment;
