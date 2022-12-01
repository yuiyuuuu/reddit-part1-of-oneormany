import React from "react";

const NotLoggedInPfp = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 37 37'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      style={{ marginRight: "8px", padding: "4px 0px" }}
    >
      <rect width='37' height='37' fill='url(#pattern0lq)' />
      <defs>
        <pattern
          id='pattern0lq'
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          <use
            xlinkHref='#image0_150_14'
            transform='translate(-0.756757 -0.621622) scale(0.027027)'
          />
        </pattern>
        <image
          id='image0_150_14'
          width='135'
          height='85'
          xlinkHref='data:image/png;base64,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'
        />
      </defs>
    </svg>
  );
};

export default NotLoggedInPfp;
