import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/auth";
import "./auth.scss";

import ReloadIcon from "./ReloadIcon";

import $ from "jquery";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = async () => {
    if (password.length < 8) {
      $("#signup-passworderror").css("display", "block");
      $("#signup-password").css("border", "1px solid red");
      return;
    }
    const object = {
      username: username,
      password: password,
      email: email,
    };
    const res = dispatch(signup(object)).then((resp) => {
      console.log(resp);
      if (resp.auth.id) {
        history("/");
      }
    });

    if (res === "successful") {
      history("/");
    }
  };

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
            />
          </div>

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
          </div>
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
        <button className='signup-signup' onClick={() => handleSubmit()}>
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default SignupStep2;
