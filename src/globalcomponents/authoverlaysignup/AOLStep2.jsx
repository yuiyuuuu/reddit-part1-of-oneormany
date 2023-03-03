import React, { useEffect, useState } from "react";
import "./aos.scss";
import { useDispatch } from "react-redux";
import { dispatchSetAOS } from "./authOverlaySignupStates";

import GoogleIcon from "./svgs/GoogleIcon";
import AppleIcon from "./svgs/AppleIcon";
import XIconNoFunction from "../../globalsvg/XIconNoFunction";

import $ from "jquery";

const AOLStep2 = ({ username, password }) => {
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(dispatchSetAOS({ display: false, which: "" }));
  }

  const isValidEmail = (v) => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(v.toLowerCase());
  };

  function handleEmailChange(e) {
    const target = e.target.value;
    setEmail(target);

    if (!target.length) {
      setNoLengthError(true);
      setInvalidEmailError(false);
      return;
    } else {
      setNoLengthError(false);
    }

    if (!isValidEmail(target)) {
      setInvalidEmailError(true);
    } else {
      setInvalidEmailError(false);
    }
  }

  useEffect(() => {
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
      if (a.length) {
        return;
      }
      $(".aos-emaillabel").removeClass("movetopleft2");
    });
  }, []);
  return (
    <div className='aos-parent'>
      <div className='aos-inner'>
        <div className='aos-actualparent'>
          <div className='aos-title'>{obj[state.which]}</div>

          <div className='aos-tos'>
            By continuing, you are setting up a Reddit account and agree to our{" "}
            <span className='aos-blue'>User Agreement</span> and{" "}
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
                id='aos-username'
                value={username}
                onChange={(e) => handleEmailChange(e)}
              />

              <label htmlFor='aos-username' className='aos-emaillabel'>
                Usernmae
              </label>
            </div>
          </div>

          <div className='aos-fieldset' style={{ marginTop: "16px" }}>
            <div style={{ position: "relative" }}>
              <input
                className='aos-input'
                id='aos-password'
                value={password}
                onChange={(e) => handleEmailChange(e)}
              />

              <label htmlFor='aos-password' className='aos-paswordlabel'>
                Password
              </label>
            </div>
          </div>

          <div className='aos-continue'>Continue</div>
        </div>

        <div className='aos-x' onClick={() => handleClose()}>
          <XIconNoFunction />
        </div>
      </div>
    </div>
  );
};

export default AOLStep2;
