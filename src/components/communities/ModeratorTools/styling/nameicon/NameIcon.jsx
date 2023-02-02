import React from "react";
import InfoIconName from "../../../communitiessvg/InfoIconName";
import "./nameicon.scss";

const NameIcon = () => {
  return (
    <div>
      <div className='name-header'>
        <div className='name-title'>Name & icon</div>
        <div className='name-i'>
          <InfoIconName />
          <span>Name & icon</span>
        </div>
      </div>

      <div className='name-second'>
        <div className='name-nameformat'>Community Name Format</div>
        <div className='name-selection'>Selection</div>
      </div>
    </div>
  );
};

export default NameIcon;
