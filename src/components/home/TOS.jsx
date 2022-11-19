import React from "react";

const TOS = () => {
  return (
    <div className='tos-container'>
      <div
        style={{ width: "100%", height: "100%", backgroundColor: "white" }}
        className='tos-second'
      >
        <div className='tos-inner'>
          <div className='tos-two'>
            <a className='tos-text'>User Agreement</a>
            <a className='tos-text'>Privacy Policy</a>
          </div>
          <div className='tos-two'>
            <a className='tos-text'>Content Policy</a>
            <a className='tos-text'>Moderator Code of Policy</a>
          </div>
        </div>

        <div className='tos-inner'>
          <div className='tos-two'>
            <a className='tos-text'>English</a>
            <a className='tos-text'>Français</a>
            <a className='tos-text'>Italiano</a>
          </div>
          <div className='tos-two'>
            <a className='tos-text'>Deutsch</a>
            <a className='tos-text'>Español</a>
            <a className='tos-text'>Português</a>
          </div>
        </div>

        <div className='tos-inner' style={{ padding: 0, margin: 0 }}>
          <div className='tos-text' style={{ padding: "12px" }}>
            Reddit Inc © 2022. All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
};
export default TOS;
