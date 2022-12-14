import React from "react";

const ImageVideoSelected = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 96 96'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
    >
      <rect width='96' height='96' fill='url(#patternimo0)' />
      <defs>
        <pattern
          id='patternimo0'
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          <use
            xlinkHref='#image0_131_70'
            transform='translate(-0.427083 -0.364583) scale(0.0104167)'
          />
        </pattern>
        <image
          id='image0_131_70'
          width='183'
          height='174'
          xlinkHref='data:image/png;base64,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'
        />
      </defs>
    </svg>
  );
};

export default ImageVideoSelected;
