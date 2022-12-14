import React from "react";
import { useDispatch } from "react-redux";
import { toggleCreateCommunity } from "../../store/nav-createcommunity";

const Communities404 = () => {
  const dispatch = useDispatch();

  return (
    <div className='communities404-main'>
      <div className='communities404-inner'>
        <div className='communities404-graycircle' />
        <div className='communities404-toptext'>
          Sorry, there aren’t any communities on Reddit with that name.
        </div>
        <div className='communities404-smalltext'>
          This community may have been banned or the community name is
          incorrect.
        </div>

        <div className='communities404-butcontainer'>
          <div
            className='communities404-createbut communities404-button'
            onClick={() => dispatch(toggleCreateCommunity(true))}
          >
            Create Community
          </div>
          <a className='communities404-gohome communities404-button' href='/'>
            Go Home
          </a>
        </div>

        <div className='communities404-tos'>
          Use of this site constitutes acceptance of our{" "}
          <span>
            <a
              className='communities404-span'
              style={{ textDecoration: "underline" }}
            >
              User Agreement
            </a>
          </span>{" "}
          and{" "}
          <span>
            <a
              className='communities404-span'
              style={{ textDecoration: "underline" }}
            >
              Privacy Policy
            </a>
          </span>
          . ©2022 reddit inc. All rights reserved. REDDIT and the ALIEN Logo are
          registered trademarks of reddit inc.
        </div>
      </div>
    </div>
  );
};

export default Communities404;
