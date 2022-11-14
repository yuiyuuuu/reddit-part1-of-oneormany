import React from "react";

const MessageIconSvg = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 31 31'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      className='icon'
    >
      <rect width='31' height='31' fill='url(#pattern023124)' />
      <defs>
        <pattern
          id='pattern023124'
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          <use
            xlinkHref='#image0_79_13'
            transform='translate(-0.0403226) scale(0.016129)'
          />
        </pattern>
        <image
          id='image0_79_13'
          width='67'
          height='62'
          xlinkHref='data:image/png;base64,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'
        />
      </defs>
    </svg>
  );
};

export default MessageIconSvg;
