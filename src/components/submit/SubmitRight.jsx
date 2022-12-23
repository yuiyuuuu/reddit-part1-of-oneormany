import React from "react";
import RedditRules from "./RedditRules";
import "./submit.scss";

import CommunityInformation from "./CommunityInformation";

const SubmitRight = () => {
  return (
    <div className='submitright-out'>
      <div className='submitright-innercontainer'>
        {/*add community banner and stuff here later */}
        <CommunityInformation />
        <RedditRules />
        <div className='submitright-tos'>
          Please be mindful of reddit's{" "}
          <a className='submitright-blue'>content policy</a> and practice good{" "}
          <a className='submitright-blue'>reddiquette</a>.
        </div>
      </div>
    </div>
  );
};

export default SubmitRight;
