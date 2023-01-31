import React from "react";

import CreateAtSvg from "../submitsvgs/CreateAtSvg";

import { month } from "./monthobj";

const CreatedAtInformation = ({ selectedCommunity }) => {
  console.log(selectedCommunity);
  return (
    <div className='cominfo-createrow'>
      <CreateAtSvg />
      <div className='cominfo-createdat'>
        Created {month[selectedCommunity.createAt?.slice(5, 7).toString()]}{" "}
        {selectedCommunity.createAt?.slice(8, 10)},{" "}
        {selectedCommunity.createAt?.slice(0, 4)}
      </div>
    </div>
  );
};

export default CreatedAtInformation;
