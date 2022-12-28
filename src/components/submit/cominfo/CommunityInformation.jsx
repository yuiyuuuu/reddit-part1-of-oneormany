import React from "react";

import "./cominfo.scss";

import CreateAtSvg from "../submitsvgs/CreateAtSvg";

import { month } from "./monthobj";

const CommunityInformation = ({ selectedCommunity }) => {
  // const year = selectedCommunity.createAt.getFullYear();

  return (
    <div className='cominfo-parent'>
      <div
        className='cominfo-banner'
        style={{
          backgroundImage: "url(/assets/newcommunities/gaming/dndnext.png)",
        }}
      />
      <div className='cominfo-inner'>
        <div className='cominfo-iconrow'>
          <img
            className='cominfo-iconimage'
            src={
              selectedCommunity.image ||
              "/assets/defaultcommunityimage/defaultcommunity.png"
            }
          />
          <a className='cominfo-comname' href={`/r/${selectedCommunity.name}`}>
            {selectedCommunity.tag}
          </a>
        </div>

        <div className='cominfo-desc'>{selectedCommunity?.description}</div>

        <div className='cominfo-createrow'>
          <CreateAtSvg />
          <div className='cominfo-createdat'>
            Created {month[selectedCommunity.createAt.slice(5, 7).toString()]}{" "}
            {selectedCommunity.createAt.slice(8, 10)},{" "}
            {selectedCommunity.createAt.slice(0, 4)}
          </div>
        </div>

        <div className='cominfo-divider' />

        <div className='cominfo-infocontainer'>
          <div className='cominfo-infocol'>
            <div className='cominfo-count'>
              {selectedCommunity.users.length}
            </div>
            <div className='cominfo-p'>Members</div>
          </div>

          <div className='cominfo-infocol'>
            <div
              className='cominfo-count'
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div className='cominfo-dot'>●</div>
              <span>{selectedCommunity.users.length}</span>
            </div>
            <div className='cominfo-p'>
              <span>Online</span>
            </div>
          </div>

          <div className='cominfo-infocol'></div>

          <div className='cominfo-infocol'></div>
        </div>
      </div>
    </div>
  );
};

export default CommunityInformation;
