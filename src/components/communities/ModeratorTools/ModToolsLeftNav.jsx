import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import "./modtools.scss";

import UserModSvg from "./modtoolssvgs/UserModSvg";
import QueuesSvg from "./modtoolssvgs/QueuesSvg";
import RulesSvg from "./modtoolssvgs/RulesSVg";
import OthersSvg from "./modtoolssvgs/OthersSvg";

const ModToolsLeftNav = ({ community }) => {
  const params = useParams();

  return (
    <div className='modtools-leftparent'>
      <div className='modtools-leftmargin'>
        <div className='modtools-leftsection'>
          <QueuesSvg />
          <div
            style={{
              marginLeft: "8px",
            }}
          >
            QUEUES
          </div>
        </div>

        <Link
          className='modtools-leftli'
          style={{
            borderLeft:
              params.section === "modqueue"
                ? "4px solid #0079D3"
                : "4px solid transparent",
          }}
          to={`/r/${community.name}/about/modqueue`}
        >
          Mod Queue
        </Link>
        <Link
          className='modtools-leftli'
          style={{
            borderLeft:
              params.section === "reports"
                ? "4px solid #0079D3"
                : "4px solid transparent",
          }}
          to={`/r/${community.name}/about/reports`}
        >
          Reports
        </Link>
        <Link
          className='modtools-leftli'
          to={`/r/${community.name}/about/spam`}
          style={{
            borderLeft:
              params.section === "spam"
                ? "4px solid #0079D3"
                : "4px solid transparent",
          }}
        >
          Spam
        </Link>
        <Link
          className='modtools-leftli'
          style={{
            borderLeft:
              params.section === "unmoderated"
                ? "4px solid #0079D3"
                : "4px solid transparent",
          }}
          to={`/r/${community.name}/about/unmoderated`}
        >
          Unmoderated
        </Link>
      </div>

      <div className='modtools-leftmargin'>
        <div className='modtools-leftsection'>
          <UserModSvg />
          <div style={{ marginLeft: "8px" }}>USER MANAGEMENT</div>
        </div>

        <Link
          className='modtools-leftli'
          style={{
            borderLeft:
              params.section === "banned"
                ? "4px solid #0079D3"
                : "4px solid transparent",
          }}
          to={`/r/${community.name}/about/banned`}
        >
          Banned
        </Link>

        <Link
          className='modtools-leftli'
          style={{
            borderLeft:
              params.section === "muted"
                ? "4px solid #0079D3"
                : "4px solid transparent",
          }}
          to={`/r/${community.name}/about/muted`}
        >
          Muted
        </Link>

        <Link
          className='modtools-leftli'
          style={{
            borderLeft:
              params.section === "approved"
                ? "4px solid #0079D3"
                : "4px solid transparent",
          }}
          to={`/r/${community.name}/about/approved`}
        >
          Approved
        </Link>

        <Link
          className='modtools-leftli'
          style={{
            borderLeft:
              params.section === "moderators"
                ? "4px solid #0079D3"
                : "4px solid transparent",
          }}
          to={`/r/${community.name}/about/moderators`}
        >
          Moderators
        </Link>
      </div>

      <div className='modtools-leftmargin'>
        <div className='modtools-leftsection'>
          <RulesSvg />
          <div style={{ marginLeft: "8px" }}>RULES AND REGULATIONS</div>
        </div>
        <Link
          className='modtools-leftli'
          style={{
            borderLeft:
              params.section === "rules"
                ? "4px solid #0079D3"
                : "4px solid transparent",
          }}
          to={`/r/${community.name}/about/rules`}
        >
          Rules
        </Link>

        <Link
          className='modtools-leftli'
          style={{
            borderLeft:
              params.section === "removal"
                ? "4px solid #0079D3"
                : "4px solid transparent",
          }}
          to={`/r/${community.name}/about/removal`}
        >
          Removal reasons
        </Link>

        <Link
          className='modtools-leftli'
          style={{
            borderLeft:
              params.section === "settings"
                ? "4px solid #0079D3"
                : "4px solid transparent",
          }}
          to={`/r/${community.name}/about/settings`}
        >
          Content controls
        </Link>
      </div>

      <div className='modtools-leftmargin'>
        <div className='modtools-leftsection'>
          <OthersSvg />
          <div style={{ marginLeft: "8px" }}>OTHER</div>
        </div>
        <a className='modtools-leftli' href={`/r/${community.name}/about/edit`}>
          Community settings
        </a>
      </div>
    </div>
  );
};

export default ModToolsLeftNav;
