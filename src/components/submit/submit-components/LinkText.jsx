import React, { useEffect } from "react";
import $ from "jquery";

const LinkText = ({ url, setUrl }) => {
  useEffect(() => {
    $(".linktext-textarea").on("focus", () => {
      $(".linktext-container").css("border", "1px solid #1A1A1B");

      $(".linktext-textarea").on("focusout", () => {
        $(".linktext-container").css("border", "1px solid #edeff1");
      });
    });

    $(".linktext-textarea").keydown(function (e) {
      if (e.keyCode == 13) {
        e.preventDefault();
        return false;
      }
    });
  }, []);
  return (
    <div>
      <div className='linktext-container'>
        <textarea
          className='linktext-textarea'
          placeholder='Url'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
    </div>
  );
};

export default LinkText;
