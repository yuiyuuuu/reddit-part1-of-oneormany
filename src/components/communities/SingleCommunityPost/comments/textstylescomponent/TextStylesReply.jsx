import React, { useEffect, useState, useCallback } from "react";

import "./tsc.scss";

import $ from "jquery";

import ImageIconSvgTSC from "./svg/ImageIconSvgTSC";
import BoldIconTSC from "./svg/BoldIconTSC";
import ItalicIconTSC from "./svg/ItalicIconTSC";
import ClipIconTSC from "./svg/ClipIconTSC";
import StrikethroughSvgTSC from "./svg/StrikethroughSvgTSC";
import InlineSvgTSC from "./svg/InlineSvgTSC";
import SuperScriptSvgTSC from "./svg/SuperScriptSvgTSC";
import SpoilerSvgTSC from "./svg/SpoilerSvgTSC";
import HeadingSvgTSC from "./svg/HeadingSvgTSC";
import BulletListSvgTSC from "./svg/BulletListSvgTSC";
import NumberedListSvgTSC from "./svg/NumberedListSvgTSC";
import QuoteblockSvgTSC from "./svg/QuoteblockSvgTSC";
import CodeBlockSvgTSC from "./svg/CodeBlockSvgTSC";
import GifSvg from "./svg/GifSvg";
import ThreeDotTSC from "./svg/ThreeDotTSC";
import TableSvgTSC from "./svg/TableSvgTSC";

const TextStylesReply = ({ idv, show, reference, post }) => {
  const [width, setWidth] = useState(0);

  const resize = useCallback(() => {
    const g = document.getElementById(`tsc-${idv}-co`).offsetWidth;

    setWidth(g);
  }, [show, width, post, $(`tsc-${idv}-co`)]);

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
  }, [show, window.location.href, post, $(`tsc-${idv}-co`)]);

  return (
    <div>
      <div className='tsc-parent'>
        <div className='tsc-row'>
          <div className='tsc-icon' style={{ display: width < 296 && "none" }}>
            <GifSvg idv={idv} />
          </div>

          <div className='tsc-icon' style={{ display: width < 326 && "none" }}>
            <ImageIconSvgTSC idv={idv} />
          </div>
        </div>

        <div
          className='tsc-divider'
          style={{ display: width < 356 && "none" }}
        />

        <div className='tsc-row'>
          <div className='tsc-icon' style={{ display: width < 386 && "none" }}>
            <BoldIconTSC idv={idv} />
          </div>
          <div className='tsc-icon' style={{ display: width < 416 && "none" }}>
            <ItalicIconTSC idv={idv} />
          </div>
          <div className='tsc-icon' style={{ display: width < 546 && "none" }}>
            <ClipIconTSC idv={idv} />
          </div>
          <div className='tsc-icon' style={{ display: width < 476 && "none" }}>
            <StrikethroughSvgTSC idv={idv} />
          </div>
          <div className='tsc-icon' style={{ display: width < 506 && "none" }}>
            <InlineSvgTSC idv={idv} />
          </div>
          <div className='tsc-icon' style={{ display: width < 536 && "none" }}>
            <SuperScriptSvgTSC idv={idv} />
          </div>
          <div className='tsc-icon' style={{ display: width < 566 && "none" }}>
            <SpoilerSvgTSC idv={idv} />
          </div>
        </div>

        <div
          className='tsc-divider'
          style={{ display: width < 585 && "none" }}
        />

        <div className='tsc-row'>
          <div className='tsc-icon' style={{ display: width < 626 && "none" }}>
            <HeadingSvgTSC idv={idv} />
          </div>
          <div className='tsc-icon' style={{ display: width < 656 && "none" }}>
            <BulletListSvgTSC idv={idv} />
          </div>

          <div className='tsc-icon' style={{ display: width < 686 && "none" }}>
            <NumberedListSvgTSC idv={idv} />
          </div>
          <div className='tsc-icon' style={{ display: width < 716 && "none" }}>
            <QuoteblockSvgTSC idv={idv} />
          </div>

          <div className='tsc-icon' style={{ display: width < 736 && "none" }}>
            <CodeBlockSvgTSC idv={idv} />
          </div>
          <div className='tsc-icon' style={{ display: width > 766 && "none" }}>
            <ThreeDotTSC />
          </div>
        </div>

        <div
          className='tsc-divider'
          style={{ display: width < 766 && "none" }}
        />

        <div className='tsc-row'>
          <div className='tsc-icon' style={{ display: width < 766 && "none" }}>
            <TableSvgTSC idv={idv} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextStylesReply;
