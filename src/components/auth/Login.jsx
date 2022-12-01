import React, { useEffect, useState } from "react";
import "./auth.scss";

import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import auth, { authenticate } from "../../store/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const authState = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function wrongPasswordResponse() {
    $("#login-errortext").css("display", "block");
    $("#password-input").css("border", "1px solid red");
  }

  async function handleSubmit(e) {
    $("#login-errortext").css("display", "none");
    $("#password-input").css("border", "1px solid rgba(0,0,0,.1);");
    if (username === "" || password.length < 8) {
      wrongPasswordResponse();
      return;
    }

    e.preventDefault();

    //if wrong password, set input to red and show the error message, else redirect to home
    const data = dispatch(authenticate(username, password)).then((res) => {
      res === "wrongpassword" ? wrongPasswordResponse() : history("/");
    });
  }

  useEffect(() => {
    if (authState.id) {
      history("/");
    }
  }, [authState]);

  useEffect(() => {
    $("#username-input").hover(
      function () {
        $("#labelfor-username").addClass("movetopleft");
        $(this).css("background-color", "white");
      },
      function () {
        const a = $(this).val();
        if (!$(this).is(":focus") && a === "") {
          $("#labelfor-username").removeClass("movetopleft");
          $(this).css("background-color", "#fcfcfb");
        }
      }
    );

    $("#username-input").focus(function () {
      $("#labelfor-username").addClass("movetopleft");
      $(this).css("background-color", "white");
    });

    $("#username-input").focusout(function () {
      const a = $(this).val();
      if (a === "") {
        $("#labelfor-username").removeClass("movetopleft");
        $(this).css("background-color", "#fcfcfb");
      }
    });

    $("#password-input").hover(
      function () {
        $("#labelfor-password").addClass("movetopleft");
        $(this).css("background-color", "white");
      },
      function () {
        const a = $(this).val();
        if (!$(this).is(":focus") && a === "") {
          $("#labelfor-password").removeClass("movetopleft");
          $(this).css("background-color", "#fcfcfb");
        }
      }
    );

    $("#password-input").focus(function () {
      $("#labelfor-password").addClass("movetopleft");
      $(this).css("background-color", "white");
    });

    $("#password-input").focusout(function () {
      const a = $(this).val();
      if (a === "") {
        $("#labelfor-password").removeClass("movetopleft");
        $(this).css("background-color", "#fcfcfb");
      }
    });
  }, [username, password]);

  return (
    <div className='auth-maincontainer'>
      <div className='auth-leftimage' />
      <div className='auth-main'>
        <div className='auth-text'>Log in</div>

        <div className='auth-smalltext'>
          By continuing, you agree to our{" "}
          <span className='auth-bluetext'>User Agreement</span> and{" "}
          <span className='auth-bluetext'>Privacy Policy</span>.
        </div>
        <form className='auth-form'>
          <div className='auth-google'>CONTINUE WITH GOOGLE</div>
          <div className='auth-apple'>CONTINUE WITH APPLE</div>
          <div className='auth-divider'>
            <span className='auth-line' />
            <span className='auth-or'>OR</span>
            <span className='auth-line' />
          </div>

          <div className='auth-inputcontainer fieldset'>
            <input
              className='auth-input'
              id='username-input'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className='auth-inputlabel' id='labelfor-username'>
              USERNAME
            </label>
          </div>

          <div
            className='auth-inputcontainer fieldset'
            style={{ marginTop: "12px" }}
          >
            <input
              className='auth-input'
              id='password-input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
            />
            <label className='auth-inputlabel' id='labelfor-password'>
              PASSWORD
            </label>
          </div>
          <div
            className='auth-redtext'
            id='login-errortext'
            style={{ marginTop: "4px", display: "none" }}
          >
            Wrong username or password
          </div>
          <button className='auth-submit' onClick={(e) => handleSubmit(e)}>
            LOG IN
          </button>
          <div
            className='auth-smalltext'
            style={{ marginTop: "8px", marginBottom: "20px" }}
          >
            Forgot your <span className='auth-bluetext'>username</span> or{" "}
            <span className='auth-bluetext'>password</span>?
          </div>

          <div className='auth-smalltext' style={{ marginTop: "8px" }}>
            New to Reddit?{" "}
            <a
              className='auth-bluetext'
              style={{ fontWeight: "400" }}
              href='/signup'
            >
              SIGN UP
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
