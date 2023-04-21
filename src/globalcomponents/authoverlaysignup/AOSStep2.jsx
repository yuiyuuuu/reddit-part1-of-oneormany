import React, { useEffect, useState, useCallback } from "react";
import "./aos.scss";
import { useDispatch } from "react-redux";

import gsap from "gsap";
import $ from "jquery";
import { makeGetRequest } from "../../requests/helperFunction";

import { signup } from "../../store/auth";
import { dispatchSetLnnl } from "../LeftNavigation/LeftNavigationNotLoggedIn/lnnlStates";
import { dispatchSetAOS } from "./authOverlaySignupStates";

import XIconNoFunction from "../../globalsvg/XIconNoFunction";
import LeftArrowAOS from "./svgs/LeftArrowAOS";
import RerollIconAOS from "./svgs/RerollIconAOS";

import { randomIntFromInterval } from "../../requests/randomNumber";

import { adjectives, nouns, dashes } from "../../components/auth/words";

import PasswordMeter from "../passwordMeter/PasswordMeter";

const AOSStep2 = ({
  username,
  password,
  email,
  setStep,
  setUsername,
  setPassword,
  inputAnimation,
}) => {
  const dispatch = useDispatch();

  //error states
  const [usernameNotAvailable, setUsernameNotAvailable] = useState(false);
  const [shortUsername, setShortUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const [shortPassword, setShortPassword] = useState(false);
  const [weakPass, setWeakpass] = useState(false);

  //valid states
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [passStrength, setPassStrength] = useState(0);

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
        setUsernameAvailable(true);
        setValidUsername(true);
      } else {
        setUsernameAvailable(false);
        setUsernameNotAvailable(true);
      }
    }
  }

  function availableAnimation() {
    gsap.fromTo(
      ".aos-available",
      { opacity: 0, y: "-13px" },
      { opacity: 1, y: 0, duration: 0.2 }
    );
  }

  function handleSubmit() {
    if (!validPassword || !validUsername) return;
    setWeakpass(false);
    if (passStrength < 1) {
      setWeakpass(true);
    }

    const obj = {
      username: username,
      password: password,
      email: email,
    };

    const sub = dispatch(signup(obj)).then((res) => {
      if (res?.auth.id || res === "successful") {
        dispatch(dispatchSetLnnl(false));
        dispatch(dispatchSetAOS({ display: false, which: "" }));
      }
    });
  }

  useEffect(() => {
    //timer for username input
    var typingTimer; //timer identifier
    var doneTypingInterval = 1000; //time in ms, 5 seconds for example
    var $input = $("#aos-username");
    let prev = false;

    //on keyup, start the countdown
    $input.on("keyup", function () {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    //on keydown, clear the countdown
    $input.on("keydown", function () {
      setValidUsername(false);
      clearTimeout(typingTimer);
    });

    //user is "finished typing," do something
    async function doneTyping() {
      setShortUsername(false);
      if ($("#aos-username").val().length < 3) {
        setUsernameAvailable(false);
        setUsernameNotAvailable(false);
        setShortUsername(true);
        prev = false;
        return;
      }

      const user = await makeGetRequest(
        `/users/find/${$("#aos-username").val()}`
      );
      if (user === "available") {
        if (!prev) {
          availableAnimation();
        }

        setUsernameNotAvailable(false);
        setUsernameAvailable(true);
        setValidUsername(true);
        prev = true;
      } else {
        prev = false;
        setUsernameAvailable(false);
        setUsernameNotAvailable(true);
      }
    }
  }, []);

  //password input
  useEffect(() => {
    var typingTimer; //timer identifier
    var doneTypingInterval = 400; //time in ms, 5 seconds for example
    var $input = $("#aos-password");

    //on keyup, start the countdown
    $input.on("keyup", function () {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    //on keydown, clear the countdown
    $input.on("keydown", function () {
      setValidPassword(false);
      clearTimeout(typingTimer);
    });

    function doneTyping() {
      if ($("#aos-password").val().length < 8) {
        setShortPassword(true);
        return;
      } else {
        setShortPassword(false);
        setValidPassword(true);
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
                style={{
                  border:
                    (usernameNotAvailable || shortUsername) && "1px solid red",
                }}
                maxLength={20}
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

            <div
              className='aos-error'
              style={{
                display: shortUsername && "block",
                marginTop: "4px",
              }}
            >
              Username must be between 3 and 20 characters
            </div>

            <div
              className='aos-available'
              style={{
                display: usernameAvailable && "block",
                marginTop: "4px",
              }}
            >
              Nice! Username available
            </div>
          </div>

          <div className='aos-fieldset' style={{ marginTop: "16px" }}>
            <div style={{ position: "relative" }}>
              <input
                className='aos-input'
                id='aos-password'
                value={password}
                onChange={(e) => handlePasswordChange(e)}
                style={{
                  border: (shortPassword || weakPass) && "1px solid red",
                }}
                type='password'
              />

              <label
                htmlFor='aos-password'
                className='aos-passwordlabel aos-labels'
              >
                Password
              </label>

              <PasswordMeter
                inputValue={password}
                top='-1px'
                right='20px'
                passStrength={passStrength}
                setPassStrength={setPassStrength}
              />
            </div>

            <div
              className='aos-error'
              style={{
                display: shortPassword && "block",
                marginTop: "4px",
              }}
            >
              Passwords must be at least 8 characters long
            </div>

            {weakPass && (
              <div
                className='aos-error'
                style={{
                  display: weakPass && "block",
                  marginTop: "4px",
                }}
              >
                That password is unacceptable
              </div>
            )}
          </div>

          <div
            className='aos-continue'
            style={{
              cursor:
                !validUsername || !validPassword ? "not-allowed" : "pointer",
              opacity: !validUsername || !validPassword ? 0.2 : 1,
            }}
            onClick={() => handleSubmit()}
          >
            Continue
          </div>
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
