import React, { useEffect } from "react";
import "./scpno.scss";

import $ from "jquery";

const SingleCommunityPostNotOverlay = () => {
  useEffect(() => {
    $(document).ready(() => {
      $(".hide").css("display", "none");
    });
  }, []);
  return (
    <div>
      <div></div>
    </div>
  );
};

export default SingleCommunityPostNotOverlay;
