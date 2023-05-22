import React from "react";

import "./as.scss";

import AccountCaret from "./svg/AccountCaret";
import AppleIcon from "./svg/AppleIcon";
import TrashIcon from "./svg/TrashIcon";
import TwitterIcon from "./svg/TwitterIcon";

//sadfhjkdfklsj - delete account function

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

        <div className='as-row'>
          <div className='as-col'>
            <div className='as-sectbig' style={{ marginBottom: "4px" }}>
              Gender
            </div>
            <div className='as-sectdesc'>
              This information may be used to improve your recommendations and
              ads.
            </div>
          </div>

          <div className='grow' />
          <div className='as-gen'>
            <button>{authState?.gender || "Man"}</button>
            <AccountCaret size={"20px"} color={"#878A8C"} />
          </div>
        </div>

        <div className='as-row'>
          <div className='as-col'>
            <div className='as-sectbig' style={{ marginBottom: "4px" }}>
              Content Languages
            </div>
            <div className='as-sectdesc'>
              Add languages you’d like to see posts, community recommendations,
              and other content in
            </div>
          </div>

          <div className='grow' />
          <div className='as-change blueborder-button'>Change</div>
        </div>

        <div className='as-q'>
          <div className='as-row'>
            <div className='as-col'>
              <div className='as-sectbig' style={{ marginBottom: "4px" }}>
                Country{" "}
              </div>
              <div className='as-sectdesc'>
                This is your primary country{" "}
                <span className='as-bluea'>Learn more</span>
              </div>
            </div>
          </div>

          <div className='as-country'>
            <div className='as-bef'>
              <div>United States</div>
              <div className='grow' />
              <AccountCaret size={"20px"} color={"#0079d3"} />
            </div>
          </div>
        </div>

        <div className='as-section'>CONNECTED ACCOUNTS</div>

        <div className='as-col as-colmar'>
          <div className='as-sectbig' style={{ marginBottom: "4px" }}>
            Connect to Twitter
          </div>
          <div className='as-sectdesc'>
            Connect a Twitter account to enable the choice to tweet your new
            posts and display a link on your profile. We will never post to
            Twitter without your permission.
          </div>

          <div className='as-end'>
            <div className='as-connect as-tw'>
              <TwitterIcon />
              <div>Connect to Twitter</div>
            </div>
          </div>
        </div>

        <div className='as-col as-colmar'>
          <div className='as-sectbig' style={{ marginBottom: "4px" }}>
            Connect to Apple
          </div>
          <div className='as-sectdesc'>
            Connect account to log in to Reddit with Apple
          </div>
          <div className='as-end'>
            <div className='as-connect as-ap'>
              <AppleIcon />
              <div>Connect to Apple</div>
            </div>
          </div>
        </div>

        <div className='as-col as-colmar'>
          <div className='as-sectbig' style={{ marginBottom: "4px" }}>
            Connect to Google
          </div>
          <div className='as-sectdesc'>
            Connected to Google Connect account to log in to Reddit with Google{" "}
          </div>

          <div className='as-end'>
            <div className='as-connect as-goo'>
              <div>Connect to Google</div>
            </div>
          </div>
        </div>

        <div className='as-section'>DELETE ACCOUNT</div>

        <div className='as-row as-delete'>
          <TrashIcon />
          <span>DELETE ACCOUNT</span>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
