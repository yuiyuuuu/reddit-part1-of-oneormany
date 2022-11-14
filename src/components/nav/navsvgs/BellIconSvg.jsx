import React from "react";

const BellIconSvg = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 29 29'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      className='icon'
    >
      <rect width='29' height='29' fill='url(#pattern09910)' />
      <defs>
        <pattern
          id='pattern09910'
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          <use
            xlinkHref='#image0_80_15'
            transform='translate(0 -0.0196078) scale(0.0196078)'
          />
        </pattern>
        <image
          id='image0_80_15'
          width='51'
          height='53'
          xlinkHref='data:image/png;base64,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'
        />
      </defs>
    </svg>
  );
};

export default BellIconSvg;
