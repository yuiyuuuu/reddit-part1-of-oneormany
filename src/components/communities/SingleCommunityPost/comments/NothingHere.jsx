import React from "react";
import NothingHereSvg from "./svgs/NothingHereSvg";

const NothingHere = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "100vh",
        paddingTop: "81px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "500px",
          width: "100%",
          marginTop: "81px",
          marginBottom: "60px",
          alignItems: "center",
          fontSize: "18px",
          fontWeight: "500",
          color: "#7c7c7c",
        }}
      >
        <NothingHereSvg />
        <span style={{ opacity: ".6", marginBottom: "20px" }}>
          Sorry, there doesn't seem to be anything here.
        </span>

        <button className='bluebutton-button' onClick={() => location.reload()}>
          Retry
        </button>
      </div>
    </div>
  );
};

export default NothingHere;
