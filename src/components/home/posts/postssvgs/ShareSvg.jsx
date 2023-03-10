import React from "react";

const ShareSvg = ({ id }) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 56 57'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      style={{ marginRight: "8px" }}
    >
      <rect
        width='56'
        height='57'
        fill={`url(#patternsharesvg0-${id || "main"})`}
      />
      <defs>
        <pattern
          id={`patternsharesvg0-${id || "main"}`}
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          <use
            xlinkHref='#image0_114_9'
            transform='matrix(0.0178571 0 0 0.0175439 -0.25 -0.192982)'
          />
        </pattern>
        <image
          id='image0_114_9'
          width='83'
          height='80'
          xlinkHref='data:image/png;base64,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'
        />
      </defs>
    </svg>
  );
};

export default ShareSvg;
