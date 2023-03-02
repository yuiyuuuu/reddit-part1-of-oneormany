import React, { useEffect, useState } from "react";
import "./aos.scss";
import { useDispatch } from "react-redux";
import { dispatchSetAOS } from "./authOverlaySignupStates";

import GoogleIcon from "./svgs/GoogleIcon";
import AppleIcon from "./svgs/AppleIcon";
import XIconNoFunction from "../../globalsvg/XIconNoFunction";

import $ from "jquery";
import { dispatchSetAOL } from "../authoverlaylogin/authOverlayLoginStates";

const obj = {
  comment: "You can comment on any post with a Reddit account.",
  vote: "You can vote on posts and comments to help everyone find the best content with a Reddit account.",
  "": "",
};

const AuthOverlaySignup = ({ state }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [invalidEmailError, setInvalidEmailError] = useState(false);
  const [noLengthError, setNoLengthError] = useState(false);

  function handleClose() {
    dispatch(dispatchSetAOS({ display: false, which: "" }));
  }

  function handleGoLogin() {
    handleClose();
    dispatch(dispatchSetAOL({ display: true }));
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
    <div style={{ display: !state.display && "none" }}>
      <div className='aos-parent'>
        <div className='aos-inner'>
          <div className='aos-actualparent'>
            <div className='aos-title'>{obj[state.which]}</div>

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
                  value={email}
                  onChange={(e) => handleEmailChange(e)}
                  style={{
                    border:
                      (invalidEmailError || noLengthError) && "1px solid red",
                  }}
                />

                <label htmlFor='aos-email' className='aos-emaillabel'>
                  Email
                </label>
              </div>

              <div
                className='aos-error'
                id='aos-emailerror'
                style={{ display: invalidEmailError && "block" }}
              >
                Not a valid email address
              </div>
              <div
                className='aos-error'
                id='aos-nolength'
                style={{ display: noLengthError && "block" }}
              >
                Please enter an email address to continue
              </div>
            </div>

            <div
              className='aos-continue'
              style={{
                opacity:
                  (invalidEmailError || noLengthError || !email.length) && ".2",
                cursor:
                  invalidEmailError || noLengthError || !email.length
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              Continue
            </div>

            <div className='aos-movelogin'>
              Already a redditor?{" "}
              <span>
                <a className='aos-p' onClick={() => handleGoLogin()}>
                  Log In
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

export default AuthOverlaySignup;
