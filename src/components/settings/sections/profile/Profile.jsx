import React, { useState } from "react";

import $ from "jquery";

import "./sp.scss";

const Profile = () => {
  const [userDisplayName, setUserDisplayName] = useState("");
  const [about, setAbout] = useState("");

  $(document).ready(() => {
    Array.prototype.forEach.call($(".sp-input"), function (v) {
      $(v).focus(() => {
        $(v).parent($(".sp-bo")).css("border", "2px solid #0079d3");
      });

      $(v).focusout(() => {
        $(v).parent($(".sp-bo")).css("border", "2px solid transparent");
      });
    });
  });

  return (
    <div className='sp-parent'>
      <div className='sp-inner'>
        <div className='sp-toptitle'>Customize profile</div>
        <div className='as-section'>PROFILE INFORMATION</div>

        <div className='sp-section'>
          <div className='sp-ti'>Display Name (optional)</div>
          <div className='sp-de'>
            Set a display name. This does not change your username.
          </div>

          <div className='sp-in'>
            <div className='sp-bo'>
              <input
                className='sp-input'
                placeholder='Display name (optional)'
                value={userDisplayName}
                onChange={(e) => setUserDisplayName(e.target.value)}
                maxLength={30}
              />
            </div>

            <div className='sp-count'>
              {30 - userDisplayName?.length} Characters remaining
            </div>
          </div>
        </div>

        <div className='sp-section'>
          <div className='sp-ti'>About (optional)</div>
          <div className='sp-de'>
            A brief description of yourself shown on your profile.
          </div>

          <div className='sp-in'>
            <div className='sp-bo'>
              <textarea
                className='sp-input sp-ar'
                placeholder='About (optional)'
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                maxLength={200}
              />
            </div>

            <div className='sp-count'>
              {200 - about?.length} Characters remaining
            </div>
          </div>
        </div>

        <div className='sp-section'>
          <div className='sp-ti'>Social links (5 max)</div>
          <div className='sp-de'>
            People who visit your profile will see your social links.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
