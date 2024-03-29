import React, { useEffect } from "react";
import ToggleIcon from "../svgs/ToggleIcon";

import "./noshow.scss";

import { timeConvert } from "../../../../../requests/timeConvert";

import gsap from "gsap";

const NoShow = ({ comment, post, func, display, idv, top }) => {
  const time = timeConvert(comment?.createdAt);

  useEffect(() => {
    if (!display) {
      gsap.fromTo(
        `#ns-c-${comment?.id}`,
        {
          x: -12,
        },
        { x: 0, duration: 0.15 }
      );

      gsap.fromTo(
        `#ns-tog-${comment?.id}`,
        {
          x: -12,
          opacity: 0,
        },
        { x: 0, duration: 0.15, opacity: 1 }
      );
    }
  }, [display]);

  return (
    <div>
      <div
        className='ns-parent'
        style={{ display: display && "none", marginTop: top && "16px" }}
      >
        <div
          className='ns-tog'
          onClick={() => func()}
          id={`ns-tog-${comment?.id}`}
        >
          <ToggleIcon idv={idv} />
        </div>

        <div className='ns-c' id={`ns-c-${comment?.id}`}>
          <a
            className='comment-icon'
            href={`/user/${comment.user.name}`}
            style={{ display: "flex" }}
          >
            <img
              src={
                comment.user?.photo
                  ? `data:image/png;base64,${comment?.user.photo}`
                  : "/assets/defaultpfp.png"
              }
              className='comment-pfp'
            />
          </a>

          <div className='comment-username ns-q'>
            <a href={`/user/${comment.user.name}`} className='comment-u'>
              {comment.user.name}
            </a>
            <span
              style={{
                marginLeft: "4px",
                display: comment.user.id === post?.userId ? "" : "none",
                color: "#0079D3",
              }}
            >
              OP
            </span>

            <div className='dot-posts'>•</div>

            <div className='comment-time'>{time}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoShow;
