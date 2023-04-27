import React from "react";
import DefaultPfp from "../../components/users/svg/DefaultPfp";

import { intToAbbrv } from "../../requests/intToAbbrv";

const HoverUsersNoMod = ({ huState }) => {
  return (
    <div className='hun-parent'>
      <div className='hun-toprow'>
        {huState?.user?.photo ? (
          <img
            className='hun-pfpimg'
            src={`data:image/png;base64,${huState?.user?.photo}`}
          />
        ) : (
          <div style={{ marginRight: "8px", marginTop: "3px" }}>
            <DefaultPfp
              size={"32px"}
              background={"#d7dfe2"}
              fill={"white"}
              borderRadius={0}
            />
          </div>
        )}
        <div className='hun-toprowr'>
          {huState?.user?.displayName || huState?.user?.name}
          <div className='hun-f'>
            {huState?.user?.name}{" "}
            <span className='dot-posts' style={{ fontSize: "10px" }}>
              •
            </span>{" "}
            1 year ago
          </div>
        </div>
      </div>

      <div className='hun-botrow'>
        <div className='hun-ch'>
          {intToAbbrv(huState?.user?.postKarma)}
          <div className='hun-p'>Post Karma</div>
        </div>
        <div className='hun-ch'>
          {intToAbbrv(huState?.user?.commentKarma)}{" "}
          <div className='hun-p'>Comment Karma</div>
        </div>
      </div>
    </div>
  );
};

export default HoverUsersNoMod;
