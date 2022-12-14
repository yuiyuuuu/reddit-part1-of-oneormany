import React from "react";

const ReloadIcon = ({ setSuggestionList2 }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='16px'
      height='16px'
      viewBox='0 0 16 16'
      version='1.1'
      style={{ cursor: "pointer" }}
      onClick={() => setSuggestionList2()}
    >
      <defs>
        <path
          d='M14,8.19994031 C13.5584,8.19994031 13.2,8.55834031 13.2,8.99994031 C13.2,11.6471403 11.0472,13.7999403 8.4,13.7999403 C5.7528,13.7999403 3.6,11.6471403 3.6,8.99994031 C3.6,6.58314031 5.3968,4.58394031 7.7232,4.25354031 L7.7232,5.39994031 C7.7232,5.55514031 7.8128,5.69674031 7.9536,5.76234031 C8.0072,5.78714031 8.0656,5.79994031 8.1232,5.79994031 C8.2152,5.79994031 8.3056,5.76794031 8.3792,5.70714031 L10.7792,3.70714031 C10.8704,3.63114031 10.9232,3.51834031 10.9232,3.39994031 C10.9232,3.28154031 10.8704,3.16874031 10.7792,3.09274031 L8.3792,1.09274031 C8.26,0.993540311 8.0936,0.971940311 7.9536,1.03754031 C7.8128,1.10314031 7.7232,1.24474031 7.7232,1.39994031 L7.7232,2.63674031 C4.5112,2.97594031 2,5.69994031 2,8.99994031 C2,12.5287403 4.8712,15.3999403 8.4,15.3999403 C11.9288,15.3999403 14.8,12.5287403 14.8,8.99994031 C14.8,8.55834031 14.4416,8.19994031 14,8.19994031'
          id='path-1'
        />
      </defs>
      <g
        id='SPECS'
        stroke='none'
        stroke-width='1'
        fill='none'
        fill-rule='evenodd'
      >
        <g id='refresh'>
          <mask id='mask-2' fill='white'>
            <use xlinkHref='#path-1' />
          </mask>
          <use id='Fill-3' fill='#0079D3' xlinkHref='#path-1' />
        </g>
      </g>
    </svg>
  );
};

export default ReloadIcon;
