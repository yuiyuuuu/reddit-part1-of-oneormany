import React from "react";
import DownVoteSvg from "../../../home/posts/postssvgs/arrowicons/DownVoteSvg";
import UpVoteSvg from "../../../home/posts/postssvgs/arrowicons/UpVoteSvg";

const match = {
  post: "posted",
  comment: "commented",
  view: "viewed",
};

const NoPosts = ({ selected, what }) => {
  return (
    <div className='nop-parent'>
      {Array(10)
        .fill("")
        .map((item) => (
          <div className='nop-ch'>
            <div className='nop-vote'>
              <UpVoteSvg />
              <div className='nop-place'></div>
              <DownVoteSvg />
            </div>
            <div className='nop-right'></div>
          </div>
        ))}

      <div className='nop-nf'>
        hmm... u/{selected?.name} hasn't {match[what]} anything
      </div>
    </div>
  );
};

export default NoPosts;
