import React from "react";

import "./as.scss";

const AccountSettings = ({ authState }) => {
  return (
    <div className='as-parent'>
      <div className='as-inner'>
        <div className='as-title'>Account Settings</div>
        <div className='as-section'>ACCOUNT PREFERENCES</div>
        <div className='as-row'>
          <div className='as-col'>
            <div className='as-sectbig' style={{ marginBottom: "4px" }}>
              Email address
            </div>
            <div className='as-sectdesc'>{authState?.email}</div>
          </div>

          <div className='grow' />
          <div className='as-change blueborder-button'>Change</div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
