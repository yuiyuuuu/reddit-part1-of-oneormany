import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import Submit from "./components/submit/Submit";
import Nav from "./components/nav/Nav";
import Posts from "./components/Posts";
import SinglePost from "./components/SinglePost";
import "./index.scss";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

import { getLocalData } from "./store/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleCommunity from "./components/communities/SingleCommunity";
import Communities404 from "./components/communities/Communities404";
import CreateCommunityOverlay from "./components/communities/CreateCommunityOverlay";
import MainTools from "./components/communities/ModeratorTools/MainTools";
import CommunityStyling from "./components/communities/ModeratorTools/styling/CommunityStyling";
import { toggleCommunityStyling } from "./store/communitystyling";

function App() {
  const dispatch = useDispatch();
  const createOverlayState = useSelector((state) => state.navToggleCreate);

  useEffect(() => {
    const styleParms = new URLSearchParams(
      new URL(window.location.href).search
    ).getAll("styling")[0];

    dispatch(toggleCommunityStyling(styleParms === "true"));
  }, []);

  useEffect(() => {
    dispatch(getLocalData());
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <CommunityStyling />
      <CreateCommunityOverlay createOverlayState={createOverlayState} />
      <Routes>
        <Route exact path='/posts' element={<Posts />} />
        <Route exact path='/posts/:id' element={<SinglePost />} />
        <Route exact path='/submit' element={<Submit />} />
        <Route exact path='/submit/:type' element={<Submit />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/r/:id' element={<SingleCommunity />} />
        <Route exact path='/404' element={<Communities404 />} />
        <Route exact path='/' element={<Home />} />
        <Route exact path='/r/:id/about/:section' element={<MainTools />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
