import React from "react";

const DownVoteSvg = ({ id, downvoteActive }) => {
  return (
    <svg
      width='20'
      height='20.5'
      viewBox='0 0 100 102'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ transform: "rotate(180deg)" }}
    >
      <path
        d='M67 52L67 93'
        stroke-width='4.5'
        className='upvote-svg-stroke'
        style={{ stroke: downvoteActive ? "#7193ff" : "" }}
      />
      <path
        d='M33.9998 54.1461L4 54'
        className='upvote-svg-stroke'
        stroke-width='4.5'
        style={{ stroke: downvoteActive ? "#7193ff" : "" }}
      />
      <path
        d='M94 54L65 54'
        className='upvote-svg-stroke'
        stroke-width='4.5'
        style={{ stroke: downvoteActive ? "#7193ff" : "" }}
      />
      <rect
        x='46.8893'
        y='7.70947'
        width='2.92299'
        height='2.73244'
        transform='rotate(-44.553 46.8893 7.70947)'
        className='upvote-svg-fill'
        style={{ fill: downvoteActive ? "#7193ff" : "" }}
      />
      <path
        d='M49.3979 8.38708L5.60208 52.6129'
        className='upvote-svg-stroke'
        stroke-width='4.5'
        style={{ stroke: downvoteActive ? "#7193ff" : "" }}
      />
      <rect
        x='4'
        y='51.0262'
        width='1.36398'
        height='1.22247'
        transform='rotate(-1.10056 4 51.0262)'
        className='upvote-svg-fill'
        style={{ fill: downvoteActive ? "#7193ff" : "" }}
      />
      <path
        d='M32 52L32 93'
        className='upvote-svg-stroke'
        stroke-width='4.5'
        style={{ stroke: downvoteActive ? "#7193ff" : "" }}
      />
      <path
        d='M92.4437 52.5675L48.5563 8.43245'
        className='upvote-svg-stroke'
        stroke-width='4.5'
        style={{ stroke: downvoteActive ? "#7193ff" : "" }}
      />
      <path
        d='M69 93H30'
        className='upvote-svg-stroke'
        stroke-width='4.5'
        style={{ stroke: downvoteActive ? "#7193ff" : "" }}
      />
      <rect
        x='93'
        y='51.0262'
        width='0.981111'
        height='0.992843'
        transform='rotate(-1.10056 93 51.0262)'
        className='upvote-svg-fill'
        style={{ fill: downvoteActive ? "#7193ff" : "" }}
      />
      <rect
        x='29.7596'
        y='91.9998'
        width='3.08226'
        height='3.2415'
        transform='rotate(0.0570343 29.7596 91.9998)'
        className='upvote-svg-fill'
        style={{ fill: downvoteActive ? "#7193ff" : "" }}
      />
      <rect
        x='66.0032'
        y='92'
        width='3.24026'
        height='3.2415'
        transform='rotate(0.0570343 66.0032 92)'
        className='upvote-svg-fill'
        style={{ fill: downvoteActive ? "#7193ff" : "" }}
      />
      <path
        d='M49 12L88.8372 51.75H9.16283L49 12Z'
        className={`fill-red-${id}`}
        style={{ fill: downvoteActive ? "#7193ff" : "none" }}
      />
      <rect
        x='34'
        y='51'
        width='31'
        height='40'
        className={`fill-red-${id}`}
        style={{ fill: downvoteActive ? "#7193ff" : "" }}
      />
    </svg>
  );
};

export default DownVoteSvg;
