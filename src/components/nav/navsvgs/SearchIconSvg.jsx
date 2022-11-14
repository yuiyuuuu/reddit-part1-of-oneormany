import React from "react";

const SearchIconSvg = () => {
  return (
    <svg
      fill='#505050'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 30 30'
      width='22px'
      height='22px'
      className='searchicon'
    >
      <path
        fill='none'
        stroke='#505050'
        stroke-miterlimit='10'
        stroke-width='2'
        d='M13 4A9 9 0 1 0 13 22A9 9 0 1 0 13 4Z'
      />
      <path
        fill='none'
        stroke='#505050'
        stroke-linecap='round'
        stroke-miterlimit='10'
        stroke-width='2'
        d='M26 26L19.437 19.437'
      />
    </svg>
  );
};

export default SearchIconSvg;
