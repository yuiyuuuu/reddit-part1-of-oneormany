import React, { useEffect, useState } from "react";
import "./auth.scss";

import $ from "jquery";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log(username);

  useEffect(() => {
    $("#username-input").hover(
      function () {
        console.log(username);
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
        </form>
      </div>
    </div>
  );
};

export default Login;
