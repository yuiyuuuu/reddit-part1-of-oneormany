import React from "react";
import { useSelector } from "react-redux";

import "./alert.scss";

import AlertChild from "./AlertChild";

const Alert = () => {
  const queue = useSelector((state) => state.alerts);

  return (
    <div>
      <div className='alerts-parent'>
        {queue?.map((item) => (
          <AlertChild item={item} />
        ))}
      </div>
    </div>
  );
};

export default Alert;
