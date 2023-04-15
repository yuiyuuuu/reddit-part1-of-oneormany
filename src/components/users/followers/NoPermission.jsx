import React from "react";
import { useSelector } from "react-redux";

const NoPermission = () => {
  const lnState = useSelector((state) => state.lnState);
  const lnnlState = useSelector((state) => state.lnnl);

  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 48px)",
        background: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "48px",
        flexDirection: "column",
        paddingLeft: (lnState || lnnlState) && "270px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{ fontSize: "18px", fontWeight: "500", marginBottom: "20px" }}
      >
        Sorry, You do not have permission to view this page
      </div>
      <div className='bluebutton-button'>Go Home</div>
    </div>
  );
};

export default NoPermission;
