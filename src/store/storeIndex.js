import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import auth from "./auth";
import posts from "./posts";
import postsindividualcommunity from "./posts-individualcommunity";
import navToggleCreate from "./nav-createcommunity";
import communityStyling from "./communitystyling";
import bodyBrightness from "./bodyBrightness";
import iconImage from "./selectedCommunityIconImage";
import madeChange from "./comstyling/madeChange";
import discardChanges from "./discard/discardChanges";
import hrefpath from "./comstyling/hrefpath";
import comments from "./comments/comments";
import screenProperties from "./global/screenProperties";
import authOverlaySignupState from "../globalcomponents/authoverlaysignup/authOverlaySignupStates";
import authOverlayLoginStates from "../globalcomponents/authoverlaylogin/authOverlayLoginStates";
import newComments from "./comments/newComments";

const reducer = combineReducers({
  auth,
  posts,
  postsindividualcommunity,
  navToggleCreate,
  communityStyling,
  bodyBrightness,
  iconImage,
  madeChange,
  discardChanges,
  hrefpath,
  comments,
  screenProperties,
  authOverlaySignupState,
  authOverlayLoginStates,
  newComments,
}); //reducers here

let middleware = "";

if (process.env.NODE_ENV === "development") {
  middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
  );
} else {
  middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
}

const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
