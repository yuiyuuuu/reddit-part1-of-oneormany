import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { setNavLocation } from "../../store/nav/navLocation";
import AccountSettings from "./sections/account/AccountSettings";
import Profile from "./sections/profile/Profile";

import { settingSection } from "./settingsobj";

import "./sm.scss";

const SettingsMain = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const authState = useSelector((state) => state.auth);

  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    const section = params.section;

    if (!section) {
      setSelectedSection("account");
    } else {
      setSelectedSection(section);
    }
  }, [window.location.href]);

  useEffect(() => {
    dispatch(setNavLocation({ name: "User Settings", user: authState }));
  }, []);

  return (
    <div className='sm-main'>
      <div className='sm-top'>
        <div className='sm-set'>User Settings</div>
        <div className='sm-sectrow'>
          {settingSection.map((section) => (
            <div
              className='sm-sect'
              style={{
                color: section.section === selectedSection && "black",
                borderBottom:
                  selectedSection === section.section
                    ? "3px solid #0079D3"
                    : "3px solid transparent",
              }}
              onClick={() => {
                nav(`/settings/${section.section}`);
              }}
            >
              {section.name}
            </div>
          ))}
        </div>

        <div>
          {(selectedSection === "account" || !selectedSection) && (
            <AccountSettings authState={authState} />
          )}

          {selectedSection === "profile" && <Profile />}
        </div>
      </div>
    </div>
  );
};

export default SettingsMain;
