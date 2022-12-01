import React from "react";

const LogoutIcon = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 22 23'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      style={{ marginLeft: "20px" }}
    >
      <rect width='22' height='23' fill='url(#patternlogout0)' />
      <defs>
        <pattern
          id='patternlogout0'
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          <use
            xlinkHref='#image0_154_18'
            transform='translate(-0.772727 -1.04348) scale(0.0454545 0.0434783)'
          />
        </pattern>
        <image
          id='image0_154_18'
          width='276'
          height='62'
          xlinkHref='data:image/png;base64,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'
        />
      </defs>
    </svg>
  );
};

export default LogoutIcon;
