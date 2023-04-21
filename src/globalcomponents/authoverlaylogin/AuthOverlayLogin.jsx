import React, { useEffect, useState, useCallback } from "react";
import "../authoverlaysignup/aos.scss";
import "./aol.scss";
import { useDispatch } from "react-redux";

import GoogleIcon from "../authoverlaysignup/svgs/GoogleIcon";
import AppleIcon from "../authoverlaysignup/svgs/AppleIcon";
import XIconNoFunction from "../../globalsvg/XIconNoFunction";

import $ from "jquery";

import { dispatchSetAOL } from "./authOverlayLoginStates";
import { dispatchSetAOS } from "../authoverlaysignup/authOverlaySignupStates";
import { authenticate } from "../../store/auth";
import { dispatchSetLnnl } from "../LeftNavigation/LeftNavigationNotLoggedIn/lnnlStates";

const AuthOverlayLogin = ({ state }) => {
  const dispatch = useDispatch();

  const [emailOrUsername, setEmailorUsername] = useState("");
  const [password, setPassword] = useState("");

  const [invalidUsernameError, setInvalidUsernameError] = useState(false);
  const [wrongPasswordOrUsername, setWrongPasswordOrUsername] = useState(false);

  function handleClose() {
    dispatch(dispatchSetAOL({ display: false, which: "" }));
  }

  function handleMoveSignup() {
    dispatch(dispatchSetAOS({ display: true, which: state.which }));
    dispatch(dispatchSetAOL({ display: false, which: "" }));
  }

  const isValidEmail = (v) => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(v.toLowerCase());
  };

  function handleEmailChange(e) {
    const target = e.target.value;
    setEmailorUsername(target);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setWrongPasswordOrUsername(false);
    $("#aos-password").css("border", "");
    $("#aos-email").css("border", "");

    dispatch(
      authenticate($("#aos-email").val(), $("#aos-password").val())
    ).then((res) => {
      if (res === "wrongpassword" || res === "notfound") {
        wrongPasswordResponse();
      } else {
        dispatch(dispatchSetLnnl(false));
        handleClose();
      }
    });
  }

  function wrongPasswordResponse() {
    setWrongPasswordOrUsername(true);
    $("#aos-password").css("border", "1px solid red");
    $("#aos-email").css("border", "1px solid red");
  }

  const enterListener = useCallback((e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", enterListener);

    return () => document.removeEventListener("keydown", enterListener);
  }, []);

  useEffect(() => {
    //this one is for username/email
    $("#aos-email").hover(
      () => {
        $(".aos-emaillabel").addClass("movetopleft2");
      },
      () => {
        const a = $("#aos-email").val();
        if ($("#aos-email").is(":focus") || a.length) {
          return;
        }
        $(".aos-emaillabel").removeClass("movetopleft2");
      }
    );

    $("#aos-email").focus(() => {
      $(".aos-emaillabel").addClass("movetopleft2");
    });

    $("#aos-email").focusout(() => {
      const a = $("#aos-email").val();

      if (a.length < 3) {
        setInvalidUsernameError(true);
      } else {
        setInvalidUsernameError(false);
      }

      if (a.length) {
        return;
      }
      $(".aos-emaillabel").removeClass("movetopleft2");
    });

    //this one is for password input

    $("#aos-password").hover(
      () => {
        $(".aos-passwordlabel").addClass("movetopleft2");
      },
      () => {
        const a = $("#aos-password").val();
        if ($("#aos-email").is(":focus") || a.length) {
          return;
        }
        $(".aos-passwordlabel").removeClass("movetopleft2");
      }
    );

    $("#aos-password").focus(() => {
      $(".aos-passwordlabel").addClass("movetopleft2");
    });

    $("#aos-password").focusout(() => {
      const a = $("#aos-password").val();
      if (a.length) {
        return;
      }
      $(".aos-passwordlabel").removeClass("movetopleft2");
    });
  }, []);

  return (
    <div style={{ display: !state.display && "none" }}>
      <div className='aos-parent'>
        <div className='aos-inner'>
          <div className='aos-actualparent'>
            <div className='aos-title'>Log In</div>

            <div className='aos-tos'>
              By continuing, you are setting up a Reddit account and agree to
              our <span className='aos-blue'>User Agreement</span> and{" "}
              <span className='aos-blue'>Privacy Policy</span>.
            </div>

            <div style={{ marginTop: "32px" }}>
              <div className='aos-gaouter'>
                <div className='aos-ga'>
                  <GoogleIcon />
                  <div className='aos-t'>Continue with Google</div>
                </div>
              </div>
              <div className='aos-gaouter'>
                <div className='aos-ga'>
                  <AppleIcon />
                  <div className='aos-t'>Continue with Apple</div>
                </div>
              </div>
            </div>

            <div className='aos-divider'>
              <div className='aos-line' />
              <div className='aos-or'>OR</div>
              <div className='aos-line' />
            </div>

            <div className='aos-fieldset'>
              <div style={{ position: "relative" }}>
                <input
                  className='aos-input'
                  id='aos-email'
                  value={emailOrUsername}
                  onChange={(e) => handleEmailChange(e)}
                  style={{
                    border: invalidUsernameError && "1px solid red",
                  }}
                />

                <label htmlFor='aos-email' className='aos-emaillabel'>
                  Username
                </label>
              </div>

              <div
                className='aos-error'
                id='aos-emailerror'
                style={{
                  display: invalidUsernameError && "block",
                  marginTop: "4px",
                }}
              >
                Username must be between 3 and 20 characters
              </div>

              <div
                className='aos-error'
                id='aos-wrongpassword'
                style={{
                  display: wrongPasswordOrUsername && "block",
                  marginTop: "4px",
                }}
              >
                Incorrect username or password
              </div>
            </div>

            <div className='aos-fieldset' style={{ marginTop: "16px" }}>
              <div style={{ position: "relative" }}>
                <input
                  className='aos-input'
                  id='aos-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type='password'
                />

                <label htmlFor='aos-password' className='aos-passwordlabel'>
                  Password
                </label>
              </div>
            </div>

            <div className='aol-submit' onClick={(e) => handleSubmit(e)}>
              Log In
            </div>

            <div className='aos-movelogin'>
              New to Reddit?{" "}
              <span>
                <a className='aos-p' onClick={() => handleMoveSignup()}>
                  Sign Up
                </a>
              </span>
            </div>
          </div>

          <div className='aos-x' onClick={() => handleClose()}>
            <XIconNoFunction />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthOverlayLogin;
