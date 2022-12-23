import React from "react";
import "./submit.scss";
import RedditRulesSvg from "./submitsvgs/RedditRulesSvg";

import { rules } from "./redditrulesobject";

const RedditRules = () => {
  return (
    <div className='redditrules-container'>
      <div className='redditrules-inner'>
        <div className='redditrules-top'>
          <RedditRulesSvg />
          Posting to Reddit{" "}
        </div>

        {rules.map((item, i) => (
          <div className='redditrules-map'>
            <div className='redditrules-index'>{i + 1}</div>
            <div className='redditrules-content'>.&nbsp;{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RedditRules;
