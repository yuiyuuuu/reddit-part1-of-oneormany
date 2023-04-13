import React, { useEffect, useCallback, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getLocalData } from "./store/auth";
import { handleSet } from "./store/global/screenProperties";
import { setScrollPosition } from "./store/global/scrollPosition";
import { dispatchSetLeftNavState } from "./globalcomponents/LeftNavigation/leftnavigationstates";

import "./index.scss";

import $ from "jquery";

import Home from "./components/home/Home";
import Submit from "./components/submit/Submit";
import Nav from "./components/nav/Nav";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import SingleCommunity from "./components/communities/SingleCommunity";
import Communities404 from "./components/communities/Communities404";
import CreateCommunityOverlay from "./components/communities/CreateCommunityOverlay";
import MainTools from "./components/communities/ModeratorTools/MainTools";
import DiscardChanges from "./discardChanges/DiscardChanges";
import AuthOverlaySignup from "./globalcomponents/authoverlaysignup/AuthOverlaySignup";
import AuthOverlayLogin from "./globalcomponents/authoverlaylogin/AuthOverlayLogin";
import UserMain from "./components/users/UserMain";

import routeObject from "./routeObject";
import SingleCommunityPost from "./components/communities/SingleCommunityPost/SingleCommunityPost";
import Alert from "./globalcomponents/alerts/Alert";
import LeftNavigation from "./globalcomponents/LeftNavigation/LeftNavigation";
import LeftNavNL from "./globalcomponents/LeftNavigation/LeftNavigationNotLoggedIn/LeftNavNL";
import { dispatchSetLnnl } from "./globalcomponents/LeftNavigation/LeftNavigationNotLoggedIn/lnnlStates";

function App() {
  const dispatch = useDispatch();
  const [componentUpdate, setComponentUpdate] = useState(0);

  const [ready, setReady] = useState(false);

  const authState = useSelector((state) => state.auth);
  const createOverlayState = useSelector((state) => state.navToggleCreate);
  const discardState = useSelector((state) => state.discardChanges);
  const authOverlaySignupState = useSelector(
    (state) => state.authOverlaySignupState
  );
  const authOverlayLoginState = useSelector(
    (state) => state.authOverlayLoginStates
  );
  const scp = useSelector((state) => state.scp);
  const selectedPost = useSelector((state) => state.selectedPost);
  const alertsQueue = useSelector((state) => state.alerts);
  const lnState = useSelector((state) => state.lnState);

  const v = useSelector((state) => state.postsindividualcommunity);

  //single community post -- that way the overlay will pop up where the user last was
  let Component = routeObject[scp];

  const resize = useCallback(() => {
    dispatch(handleSet(window.innerWidth));
  });

  const scroll = useCallback(() => {
    dispatch(setScrollPosition());
  }, []);

  const lnStateResize = useCallback(() => {
    if (window.innerWidth < 1251) {
      dispatch(dispatchSetLeftNavState(false));
    }
  }, []);

  $(window).off("resize", window, lnStateResize).resize(lnStateResize);

  useEffect(() => {
    Component = routeObject[scp];
    setComponentUpdate((prev) => prev + 1); //updates a random state so our component rerenders
  }, [scp]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    //need to hide the left nl copmponent until we run the auth function, or else the component will show when we dont want it to
    dispatch(getLocalData()).then((res) => {
      setReady(true);
      $(".hide").css("display", "none");

      // //remove the hide element from the dom
      // $("#reason-auth-leftnavnl").remove();

      if (!res?.id) {
        if (window.innerWidth < 1251) {
          dispatch(dispatchSetLnnl(false));
        } else {
          dispatch(dispatchSetLnnl(true));
        }
      } else {
        dispatch(dispatchSetLnnl(false));
      }
    });

    //scrollpos
    window.addEventListener("scroll", scroll);

    return () => window.removeEventListener("scroll", scroll);
  }, []);

  useEffect(() => {
    //need to change to boolean, localstorage can only store strings
    const item = window.localStorage.getItem("lnstate") === "true";

    if (window.innerWidth < 1251) {
      window.localStorage.setItem("lnstate", false);
      dispatch(dispatchSetLnnl(false)); //only effects users not logged in
      return dispatch(dispatchSetLeftNavState(false));
    }

    //if item is null, it means user is first time in this browser, so we will set it to true
    //if it is false, then we do nothing since original state is false anyways
    if (item == null) {
      window.localStorage.setItem("lnstate", true);
      return dispatch(dispatchSetLeftNavState(true));
    }

    if (item == false) {
      return dispatch(dispatchSetLeftNavState(false));
    }

    return dispatch(dispatchSetLeftNavState(true));
  }, []);

  return (
    <BrowserRouter>
      <Nav />

      {createOverlayState && (
        <CreateCommunityOverlay createOverlayState={createOverlayState} />
      )}
      {discardState && <DiscardChanges display={discardState} />}

      {authOverlaySignupState.display && (
        <AuthOverlaySignup state={authOverlaySignupState} />
      )}

      {authOverlayLoginState.display && (
        <AuthOverlayLogin state={authOverlayLoginState} />
      )}

      {selectedPost?.id ? scp ? <SingleCommunityPost /> : "" : ""}

      {alertsQueue.length !== 0 && <Alert />}

      {lnState && <LeftNavigation lnState={lnState} />}

      {!authState?.id && ready && <LeftNavNL />}

      <div className='hide' id='reason-auth-leftnavnl' />

      <Routes>
        <Route exact path='/submit' element={<Submit />} />
        <Route exact path='/submit/:type' element={<Submit />} />
        <Route exact path='/submit/r/:id' element={<Submit />} />
        <Route exact path='/submit/r/:id/:type' element={<Submit />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/r/:id' element={<SingleCommunity />} />
        <Route exact path='/r/:id/comments/:postid' element={<Component />} />
        <Route
          exact
          path='/r/:id/comments/:postid/comment/:commentid'
          element={<Component />}
        />
        <Route exact path='/404' element={<Communities404 />} />
        <Route exact path='/user/:userid' element={<UserMain />} />
        <Route exact path='/user/:userid/:section' element={<UserMain />} />

        <Route exact path='/' element={<Home />} />
        <Route exact path='/r/:id/about/:section' element={<MainTools />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
