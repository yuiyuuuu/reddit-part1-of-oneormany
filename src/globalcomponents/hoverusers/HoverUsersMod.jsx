import React from "react";

import DefaultPfp from "../../components/users/svg/DefaultPfp";

const HoverUsersMod = ({ huState }) => {
  console.log(huState?.user);
  return (
    <div className='hum-parent'>
      <div className='hum-pfppar'>
        {huState?.user?.photo ? (
          <img
            className='hum-pfpimg'
            src={`data:image/png;base64,${huState?.user?.photo}`}
          />
        ) : (
          <DefaultPfp
            size={"110px"}
            background={"#d7dfe2"}
            fill={"white"}
            borderRadius={"50%"}
          />
        )}
      </div>

      <div className='hum-name hum-w100'>
        {huState?.user?.displayName || huState?.user?.name}
      </div>
      <div className='hum-det hum-w100'>
        u/{huState?.user?.displayName || huState?.user?.name}{" "}
        <span className='dot-posts' style={{ fontSize: "10px" }}>
          •
        </span>{" "}
        1 year ago
        <span className='dot-posts' style={{ fontSize: "10px" }}>
          •
        </span>
        {Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(huState?.user?.postKarma + huState?.user?.commentKarma)}{" "}
        total karma
      </div>

      <div
        className='hum-bl pointer hum-w100'
        onClick={() => (window.location.href = `/user/${huState?.user?.name}`)}
      >
        View full profile
      </div>

      <div className='hum-grid'>
        <div className='hum-gridch'>
          <span className='hum-gridsp'>
            {Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(huState?.user?.postKarma)}
          </span>{" "}
          Post Karma
        </div>
        <div className='hum-gridch'>
          <span className='hum-gridsp'>
            {Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(huState?.user?.commentKarma)}
          </span>{" "}
          Comment Karma
        </div>
        <div className='hum-gridch'>
          <span className='hum-gridsp'>0</span> Awardee Karma
        </div>
        <div className='hum-gridch'>
          <span className='hum-gridsp'>0</span> Awarder Karma
        </div>
      </div>

      <div>
        <div className='hum-modopt'>User Mod Log</div>

        <div className='hum-modopt'>Add Note</div>

        <div className='hum-modopt' style={{ borderBottom: "none" }}>
          Send modmail
        </div>
      </div>
    </div>
  );
};

export default HoverUsersMod;
