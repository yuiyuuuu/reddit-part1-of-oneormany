import React from "react";
import $ from "jquery";

const NoResults = ({ query, oc }) => {
  function oc() {
    $(".sc-input").focus();
  }

  return (
    <div>
      <div className='nr-parent'>
        <img src='/assets/comments/noresults.png' className='nr-img' />

        <div className='nr-h1'>
          Hm... we couldn’t find any results for “{query}”
        </div>
        <div className='nr-p'>
          Double-check your spelling or try different keywords to{" "}
          <span className='nr-adjust' onClick={() => oc()}>
            adjust your search
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoResults;
