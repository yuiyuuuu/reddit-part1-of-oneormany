import React from "react";

const NoFollowers = () => {
  return (
    <div className='unof-parent'>
      <img className='unof-l' src='/assets/global/snoo.png' />
      <div className='unof-p'>Followers</div>
      <div className='unof-t'>
        You don't have any followers yet, but when someone follows you, you'll
        see them here.
      </div>
    </div>
  );
};

export default NoFollowers;
