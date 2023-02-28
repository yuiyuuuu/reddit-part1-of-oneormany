import React, { useEffect, useCallback } from "react";
import "./sortcomments.scss";

import $ from "jquery";

import DownArrow from "./DownArrow";
import SearchIconSvg from "./SearchIconSvg";

const SortCommentsMain = ({ selectedSort, setShowCommentSortOverlay }) => {
  const resize = useCallback(() => {
    setShowCommentSortOverlay(false);
    const rect = document.getElementById("sc-main").getBoundingClientRect();

    $(".scl-parent")
      .css("top", rect.top - 18)
      .css("left", rect.left);
  }, []);

  useEffect(() => {
    $(document).ready(() => {
      const rect = document.getElementById("sc-main").getBoundingClientRect();
      const scroll = document.querySelector(".scp-parent").scrollTop;

      $(".scl-parent")
        .css("top", rect.top - 18 + scroll)
        .css("left", rect.left);
    });
  }, [$("#sc-main")]);

  useEffect(() => {
    $(document).ready(() => {
      $(".sc-input").focus(() => {
        $(".sc-input").css("border", "2px solid #0079d3");
        $(".sc-inputparent").css("border", "1px solid transparent");

        $(".sc-input").focusout(() => {
          $(".sc-input").css("border", "");
          $(".sc-inputparent").css("border", "");
        });
      });
    }, []);
  }, [$(".sc-input")]);

  useEffect(() => {
    $(document).click((e) => {
      var $target = $(event.target);

      if (
        !$target.closest(".scl-parent").length &&
        $(".scl-parent").is(":visible") &&
        !$target.closest(".sc-sortby").length &&
        $(".sc-sortby").is(":visible")
      ) {
        setShowCommentSortOverlay(false);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div>
      <div className='sc-main' id='sc-main'>
        <div
          className='sc-sortby'
          onClick={() => setShowCommentSortOverlay((prev) => !prev)}
        >
          <div className='sc-sortbyc'>Sort By: {selectedSort}</div>
          <DownArrow />
        </div>
        <div className='sc-divider'>|</div>
        <div className='sc-inputparent'>
          <div className='sc-search'>
            <SearchIconSvg />
          </div>
          <input className='sc-input' placeholder='Search comments' />
        </div>
      </div>
    </div>
  );
};

export default SortCommentsMain;
