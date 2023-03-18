import { Route, Routes, BrowserRouter } from "react-router-dom";
import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocalData } from "./store/auth";
import { handleSet } from "./store/global/screenProperties";

import "./index.scss";

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

import routeObject from "./routeObject";
import SingleCommunityPostNotOverlay from "./components/communities/SingleCommunityPost/SingleCommunityPostNotOverlay/SingleCommunityPostNotOverlay";
import SingleCommunityPost from "./components/communities/SingleCommunityPost/SingleCommunityPost";
import { setScrollPosition } from "./store/global/scrollPosition";

function App() {
  const dispatch = useDispatch();
  // const [Component, setComponent] = useState(Home);
  const [componentUpdate, setComponentUpdate] = useState(0);

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

  //single community post -- that way the overlay will pop up where the user last was
  let Component = routeObject[scp];

  const resize = useCallback(() => {
    dispatch(handleSet(window.innerWidth));
  });

  const scroll = useCallback(() => {
    dispatch(setScrollPosition());
  }, []);

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
    dispatch(getLocalData());

    //scrollpos
    window.addEventListener("scroll", scroll);

    return () => window.removeEventListener("scroll", scroll);
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
        <Route exact path='/' element={<Home />} />
        <Route exact path='/r/:id/about/:section' element={<MainTools />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
