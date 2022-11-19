import React from "react";

const HideSvg = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 41 31'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      style={{ marginRight: "6px" }}
    >
      <rect width='41' height='31' fill='url(#patternhd0)' />
      <defs>
        <pattern
          id='patternhd0'
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          <use
            xlinkHref='#image0_126_60'
            transform='translate(-0.439024 -1.48387) scale(0.0243902 0.0322581)'
          />
        </pattern>
        <image
          id='image0_126_60'
          width='82'
          height='125'
          xlinkHref='data:image/png;base64,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'
        />
      </defs>
    </svg>
  );
};

export default HideSvg;
