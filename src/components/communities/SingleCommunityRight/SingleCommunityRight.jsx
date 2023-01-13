import React from "react";
import "./right.scss";

const SingleCommunityRight = ({ communityState }) => {
  return (
    <div>
      <div className='comright-parent'>
        <div className='comright-about'>
          <div className='comright-toprow'>
            <div className='comright-abouttext'>About Community</div>
            <a
              className='comright-modtools'
              href={`/r/${communityState.name}/about/modqueue`}
            >
              Mod Tools
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCommunityRight;
