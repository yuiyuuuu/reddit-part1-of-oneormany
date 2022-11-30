import React, { useState, useEffect } from "react";
import "./auth.scss";

import $ from "jquery";

import { adjectives, nouns, dashes } from "./words";
import SignupStep2 from "./SignupStep2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const auth = useSelector((state) => state.auth);
  const history = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const [suggestionList, setSuggestionList] = useState([]);

  const isValidEmail = (v) => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(v.toLowerCase());
  };

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function setSuggestionList2() {
    setSuggestionList([]);
    for (let i = 0; i < 5; i++) {
      const adjective =
        adjectives[randomIntFromInterval(0, adjectives.length - 1)];

      const noun = nouns[randomIntFromInterval(0, nouns.length - 1)];

      const dash = dashes[randomIntFromInterval(0, 1)];

      const ranNumber = randomIntFromInterval(1, 9999);

      setSuggestionList((prev) => [
        ...prev,
        adjective + dash + noun + ranNumber,
      ]);
    }
  }

  const handleStep1 = (e) => {
    e.preventDefault();
    const validemail = isValidEmail(email);

    if (validemail) {
      $("#email-error").css("display", "none");
      setStep(2);
    } else {
      $("#email-error").css("display", "block");
    }
  };

  useEffect(() => {
    if (auth?.id) {
      history("/");
    }
  }, [auth]);

  useEffect(() => {
    //generate suggestion names for signup
    setSuggestionList2();
  }, []);

  useEffect(() => {
    $("#email-input").hover(
      function () {
        $("#labelfor-email").addClass("movetopleft");
        $(this).css("background-color", "white");
      },
      function () {
        const a = $(this).val();
        if (!$(this).is(":focus") && a === "") {
          $("#labelfor-email").removeClass("movetopleft");
          $(this).css("background-color", "#fcfcfb");
        }
      }
    );

    $("#email-input").focus(function () {
      $("#labelfor-email").addClass("movetopleft");
      $(this).css("background-color", "white");
    });

    $("#email-input").focusout(function () {
      const a = $(this).val();
      if (a === "") {
        $("#labelfor-email").removeClass("movetopleft");
        $(this).css("background-color", "#fcfcfb");
      }
    });
  }, [step]);

  return (
    <div className='signup-outer'>
      {step === 1 ? (
        <div className='auth-maincontainer'>
          <div className='auth-leftimage' />
          <div className='auth-main' style={{ width: "280px" }}>
            <div className='auth-text'>Sign up</div>

            <div className='auth-smalltext'>
              By continuing, you are setting up a Reddit account and agree to
              our
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
                  id='email-input'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type='text'
                />
                <label className='auth-inputlabel' id='labelfor-email'>
                  EMAIL
                </label>
              </div>

              <div
                className='auth-redtext'
                id='email-error'
                style={{ margin: "8px 0px", display: "none" }}
              >
                Invalid Email!
              </div>

              <button className='auth-submit' onClick={(e) => handleStep1(e)}>
                CONTINUE
              </button>

              <div className='auth-smalltext' style={{ marginTop: "24px" }}>
                Already a redditor?{" "}
                <a
                  className='auth-bluetext'
                  style={{ fontWeight: "400" }}
                  href='/login'
                >
                  LOGIN IN
                </a>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <SignupStep2
          suggestionList={suggestionList}
          setSuggestionList2={setSuggestionList2}
          setStep={setStep}
          setEmail={setEmail}
          email={email}
        />
      )}
    </div>
  );
};

export default Signup;
