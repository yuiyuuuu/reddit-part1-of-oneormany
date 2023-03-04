import React, { useEffect, useState } from "react";
import "./aos.scss";
import { useDispatch } from "react-redux";
import { dispatchSetAOS } from "./authOverlaySignupStates";
import $ from "jquery";

import XIconNoFunction from "../../globalsvg/XIconNoFunction";
import LeftArrowAOS from "./svgs/LeftArrowAOS";
import RerollIconAOS from "./svgs/RerollIconAOS";

import { randomIntFromInterval } from "../../requests/randomNumber";

import { adjectives, nouns, dashes } from "../../components/auth/words";
import { makeGetRequest } from "../../requests/helperFunction";

const AOSStep2 = ({
  username,
  password,
  setStep,
  setUsername,
  setPassword,
  inputAnimation,
}) => {
  const dispatch = useDispatch();
  const [usernameNotAvailable, setUsernameNotAvailable] = useState(false);

  function handleClose() {
    dispatch(dispatchSetAOS({ display: false, which: "" }));
  }

  const isValidEmail = (v) => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(v.toLowerCase());
  };

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function setSuggestionList() {
    $("#aos-username").val("");

    for (let i = 0; i < 5; i++) {
      const adjective =
        adjectives[randomIntFromInterval(0, adjectives.length - 1)];

      const noun = nouns[randomIntFromInterval(0, nouns.length - 1)];

      const dash = dashes[randomIntFromInterval(0, 1)];

      const ranNumber = randomIntFromInterval(1, 9999);

      $("#aos-username").val(adjective + dash + noun + ranNumber);
      $(".aos-usernamelabel").addClass("movetopleft2");

      const user = await makeGetRequest(
        `/users/find/${$("#aos-username").val()}`
      );
      if (user === "available") {
        setUsernameNotAvailable(false);
      } else {
        setUsernameNotAvailable(true);
      }
    }
  }

  useEffect(() => {
    var typingTimer; //timer identifier
    var doneTypingInterval = 1000; //time in ms, 5 seconds for example
    var $input = $("#aos-username");

    //on keyup, start the countdown
    $input.on("keyup", function () {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    //on keydown, clear the countdown
    $input.on("keydown", function () {
      clearTimeout(typingTimer);
    });

    //user is "finished typing," do something
    async function doneTyping() {
      const user = await makeGetRequest(
        `/users/find/${$("#aos-username").val()}`
      );
      if (user === "available") {
        setUsernameNotAvailable(false);
      } else {
        setUsernameNotAvailable(true);
      }
    }
  }, []);

  useEffect(() => {
    inputAnimation("#aos-username", ".aos-usernamelabel");
    inputAnimation("#aos-password", ".aos-passwordlabel");
  }, []);

  return (
    <div className='aos-parent'>
      <div className='aos-inner'>
        <div className='aos-actualparent'>
          <div className='aos-title'>Create your username and password</div>

          <div className='aos-tos'>
            Reddit is anonymous, so your username is what you’ll go by here.
            Choose wisely—because once you get a name, you can’t change it.
          </div>

          <div className='aos-fieldset' style={{ marginTop: "16px" }}>
            <div style={{ position: "relative" }}>
              <input
                className='aos-input'
                id='aos-username'
                value={username}
                onChange={(e) => handleUsernameChange(e)}
                style={{ border: usernameNotAvailable && "1px solid red" }}
              />

              <label
                htmlFor='aos-username'
                className='aos-usernamelabel aos-labels'
              >
                Username
              </label>

              <RerollIconAOS func={setSuggestionList} />
            </div>

            <div
              className='aos-error'
              style={{
                display: usernameNotAvailable && "block",
                marginTop: "4px",
              }}
            >
              That username is already taken
            </div>
          </div>

          <div className='aos-fieldset' style={{ marginTop: "16px" }}>
            <div style={{ position: "relative" }}>
              <input
                className='aos-input'
                id='aos-password'
                value={password}
                onChange={(e) => handlePasswordChange(e)}
              />

              <label
                htmlFor='aos-password'
                className='aos-passwordlabel aos-labels'
              >
                Password
              </label>
            </div>
          </div>

          <div className='aos-continue'>Continue</div>
          <div className='aos-left' onClick={() => setStep(1)}>
            <LeftArrowAOS />
          </div>
        </div>

        <div className='aos-x' onClick={() => handleClose()}>
          <XIconNoFunction />
        </div>
      </div>
    </div>
  );
};

export default AOSStep2;
