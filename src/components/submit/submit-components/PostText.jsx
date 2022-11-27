import React, { useEffect } from "react";

import "./submit-components.scss";

import $ from "jquery";

const PostText = ({ text, setText }) => {
  useEffect(() => {
    $(".posttext-textarea").on("focus", () => {
      $(".posttext-container").css("border", "1px solid #1A1A1B");

      $(".posttext-textarea").on("focusout", () => {
        $(".posttext-container").css("border", "1px solid #edeff1");
      });
    });
  }, []);
  return (
    <div>
      <div className='posttext-container'>
        <div className='posttext-bar'>l</div>
        <textarea
          placeholder='Text (optional)'
          className='posttext-textarea'
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </div>
    </div>
  );
};

export default PostText;
