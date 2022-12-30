import React, { useEffect, useState } from "react";
import DizzyIcon from "./modtoolssvgs/DizzyIcon";

import $ from "jquery";

const SomethingWentWrong = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    $(".nav-parent").css("display", "none");
  }, []);

  $(window).on("load", () => {
    $(".hide").css("display", "none");
  });

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <DizzyIcon />
      <div style={{ fontSize: "18px", margin: "20px 0", fontWeight: "500" }}>
        Something went wrong
      </div>
      <a href='/' style={{ textDecoration: "underline" }}>
        Go home
      </a>
    </div>
  );
};

export default SomethingWentWrong;
