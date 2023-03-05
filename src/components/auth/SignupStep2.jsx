import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../../store/auth";
import { makeGetRequest } from "../../requests/helperFunction";
import gsap from "gsap";
import "./auth.scss";

import ReloadIcon from "./ReloadIcon";

import $ from "jquery";
import PasswordMeter from "../../globalcomponents/passwordMeter/PasswordMeter";

const SignupStep2 = ({
  suggestionList,
  setSuggestionList2,
  setStep,
  setEmail,
  email,
}) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const state = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //username error states
  const [usernameNotAvailable, setUsernameNotAvailable] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [shortUsername, setShortUsername] = useState(false);

  //password error states
  const [shortPassword, setShortPassword] = useState(false);
  const [weakPass, setWeakPass] = useState(false);

  const [passStrength, setPassStrength] = useState(0);

  //valid states
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  function availableAnimation() {
    gsap.fromTo(
      ".aos-available",
      { opacity: 0, y: "-13px" },
      { opacity: 1, y: 0, duration: 0.2 }
    );
  }

  const handleSubmit = async () => {
    if (!validPassword || !validUsername) return;
    setWeakPass(false);

    if (passStrength < 1) {
      setWeakPass(true);
    }

    const object = {
      username: username,
      password: password,
      email: email,
    };
    const res = dispatch(signup(object)).then((resp) => {
      if (resp?.auth?.id) {
        history("/");
      }
    });

    if (res === "successful") {
      history("/");
    }
  };

  //username input
  useEffect(() => {
    //timer for username input
    var typingTimer; //timer identifier
    var doneTypingInterval = 1000; //time in ms, 5 seconds for example
    var $input = $("#signup-username");
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
      if ($("#signup-username").val().length < 3) {
        setUsernameAvailable(false);
        setUsernameNotAvailable(false);
        setShortUsername(true);
        prev = false;
        return;
      }

      const user = await makeGetRequest(
        `/users/find/${$("#signup-username").val()}`
      );
      if (user === "available") {
        setUsernameNotAvailable(false);
        if (!prev) {
          availableAnimation();
        }
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
    var $input = $("#signup-password");

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
      if ($("#signup-password").val().length < 8) {
        setShortPassword(true);
        return;
      } else {
        setShortPassword(false);
        setValidPassword(true);
      }
    }
  }, []);

  useEffect(() => {
    //if user clicks suggestion name, we will move label out of way
    if (username !== "") {
      $("#signuplabel-username").addClass("movetopleft");
    }
  }, [username]);

  useEffect(() => {
    $("#signup-username").hover(
      function () {
        $("#signuplabel-username").addClass("movetopleft");
        $(this).css("background-color", "white");
      },
      function () {
        const a = $(this).val();
        if (!$(this).is(":focus") && a === "") {
          $("#signuplabel-username").removeClass("movetopleft");
          $(this).css("background-color", "#fcfcfb");
        }
      }
    );

    $("#signup-username").focus(function () {
      $("#signuplabel-username").addClass("movetopleft");
      $(this).css("background-color", "white");
    });

    $("#signup-username").focusout(function () {
      const a = $(this).val();
      if (a === "") {
        $("#signuplabel-username").removeClass("movetopleft");
        $(this).css("background-color", "#fcfcfb");
      }
    });

    $("#signup-password").hover(
      function () {
        $("#signuplabel-password").addClass("movetopleft");
        $(this).css("background-color", "white");
      },
      function () {
        const a = $(this).val();
        if (!$(this).is(":focus") && a === "") {
          $("#signuplabel-password").removeClass("movetopleft");
          $(this).css("background-color", "#fcfcfb");
        }
      }
    );

    $("#signup-password").focus(function () {
      $("#signuplabel-password").addClass("movetopleft");
      $(this).css("background-color", "white");
    });

    $("#signup-password").focusout(function () {
      const a = $(this).val();
      if (a === "") {
        $("#signuplabel-password").removeClass("movetopleft");
        $(this).css("background-color", "#fcfcfb");
      }
    });
  }, []);

  return (
    <div className='signup-container' id='signup-onload'>
      <div className='signup-desc'>
        <div className='signup-title'>Choose your username</div>
        <div className='signup-text'>
          Your username is how other community members will see you. This name
          will be used to credit you for things you share on Reddit. What should
          we call you?
        </div>
      </div>

      <div className='signup-inputcontainer'>
        <div className='signup-innerleft'>
          <div className='signup-fieldset'>
            <label className='auth-inputlabel' id='signuplabel-username'>
              CHOOSE A USERNAME
            </label>
            <input
              className='signup-inputfield'
              id='signup-username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                border:
                  (shortUsername || usernameNotAvailable) && "1px solid red",
              }}
            />
          </div>

          {usernameNotAvailable && (
            <div
              className='aos-error'
              style={{
                display: usernameNotAvailable && "block",
                marginTop: "4px",
              }}
            >
              That username is already taken
            </div>
          )}

          {shortUsername && (
            <div
              className='aos-error'
              style={{
                display: shortUsername && "block",
                marginTop: "4px",
              }}
            >
              Username must be between 3 and 20 characters
            </div>
          )}

          {usernameAvailable && (
            <div
              className='aos-available'
              style={{
                display: usernameAvailable && "block",
                marginTop: "4px",
              }}
            >
              Nice! Username available
            </div>
          )}

          <div className='signup-fieldset' style={{ marginTop: "24px" }}>
            <label className='auth-inputlabel' id='signuplabel-password'>
              PASSWORD
            </label>
            <input
              className='signup-inputfield'
              id='signup-password'
              value={password}
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />

            <PasswordMeter
              top={0}
              right={0}
              inputValue={password}
              passStrength={passStrength}
              setPassStrength={setPassStrength}
            />
          </div>
          {shortPassword && (
            <div
              className='aos-error'
              style={{
                display: shortPassword && "block",
                marginTop: "4px",
              }}
            >
              Passwords must be at least 8 characters long
            </div>
          )}

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

          <div
            className='auth-redtext nodisplay'
            style={{ marginTop: "4px" }}
            id='signup-passworderror'
          >
            Password must be at least 8 characters long
          </div>
        </div>
        <div className='signup-namesuggestions'>
          <div className='signup-textsmall'>
            <span style={{ marginRight: "8px" }}>
              Here are some username suggestions
            </span>{" "}
            <ReloadIcon setSuggestionList2={setSuggestionList2} />
          </div>

          {suggestionList.map((item) => (
            <div
              className='suggestion-option'
              onClick={() => setUsername(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className='signup-bottomnav'>
        <div
          className='signup-back'
          onClick={() => {
            setStep(1);
            setUsername("");
            setPassword("");
            setEmail("");
          }}
        >
          Back
        </div>
        <div className='grow' />
        <button
          className='signup-signup'
          onClick={() => handleSubmit()}
          style={{
            opacity: (!validPassword || !validUsername) && 0.2,
            cursor:
              !validPassword || !validUsername ? "not-allowed" : "pointer",
          }}
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default SignupStep2;
