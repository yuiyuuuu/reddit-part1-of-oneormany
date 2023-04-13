import React from "react";
import { useSelector } from "react-redux";
import DownVoteSvg from "../../../home/posts/postssvgs/arrowicons/DownVoteSvg";
import UpVoteSvg from "../../../home/posts/postssvgs/arrowicons/UpVoteSvg";

const match = {
  post: "posted",
  comment: "commented",
  view: "viewed",
  saved: "saved",
};

const NoPosts = ({ selected, what }) => {
  const authState = useSelector((state) => state?.auth);

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
        hmm... {what === "saved" && "looks like"}{" "}
        {selected?.id === authState?.id ? "you" : `u/${selected?.name}`}{" "}
        {selected?.id === authState?.id ? "haven't" : "hasn't"} {match[what]}{" "}
        anything
      </div>
    </div>
  );
};

export default NoPosts;
