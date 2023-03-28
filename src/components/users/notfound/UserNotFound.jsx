import React from "react";
import { useSelector } from "react-redux";

import "./unf.scss";

const UserNotFound = () => {
  const lnState = useSelector((state) => state.lnState);
  const lnnlState = useSelector((state) => state.lnnl);

  return (
    <div
      className='unf-parent'
      style={{ paddingLeft: (lnState || lnnlState) && "270px" }}
    >
      <div className='unf-inner'>
        <img className='unf-img' src='/assets/global/notfounduser.png' />

        <div className='unf-i'>Sorry, nobody on Reddit goes by that name.</div>
        <div className='unf-o'>
          The person may have been banned or the username is incorrect.
        </div>
        <button className='bluebutton-button unf-but'>GO HOME</button>
      </div>

      <div className='unf-q'>
        Use of this site constitutes acceptance of our{" "}
        <span className='underline'>User Agreement</span> and{" "}
        <span className='underline'>Privacy Policy</span>. ©2023 reddit inc. All
        rights reserved. REDDIT and the ALIEN Logo are registered trademarks of
        reddit inc.
      </div>
    </div>
  );
};

export default UserNotFound;
