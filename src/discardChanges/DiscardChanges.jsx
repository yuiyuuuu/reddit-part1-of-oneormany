import React from "react";
import XIcon from "../globalsvg/XIcon";
import "./discard.scss";

const DiscardChanges = ({ display }) => {
  return (
    <div style={{ display: display ? "block" : "none" }}>
      <div className='discard-parent'>
        <div className='discard-messagecontainer'>
          <div className='discard-i'>
            Discard unsaved changes before leaving?
            <div className='grow' />
            <XIcon f={""} />
          </div>
          <div className='discard-q'>
            You have made some changes to your community, do you wish to leave
            this menu without saving?
          </div>

          <div className='discard-row'>
            <div className='blueborder-button discard-cancel'>Cancel</div>
            <div className='bluebutton-button'>Discard</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscardChanges;
