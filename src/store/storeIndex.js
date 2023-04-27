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
import scp from "./scp/scpConditional";
import selectedPost from "./scp/selectedPost";
import scrollPosition from "./global/scrollPosition";
import copyLink from "./shareoverlay/copyLink";
import threeDotOverlay from "./postoverlays/threeDotOverlay";
import shareOverlay from "./postoverlays/shareOverlay";
import shareOverlayScp from "./postoverlays/shareOverlayScp";
import threeDotOverlaySCP from "./postoverlays/threeDotoverlaySCP";
import commentIdFind from "./comments/commentIdFind";
import searchQueryComment from "./comments/searchQuery";
import alerts from "./alerts/alerts";
import lnState from "../globalcomponents/LeftNavigation/leftnavigationstates";
import navLocation from "./nav/navLocation";
import lnnl from "../globalcomponents/LeftNavigation/LeftNavigationNotLoggedIn/lnnlStates";
import selectedUser from "./users/users";
import userReadyState from "../components/users/userReadyState";
import prevHref from "./users/prevHrefBeforeOverlay";
import hcState from "../globalcomponents/hovercommunities/hovercommunitiesstate";
import huState from "../globalcomponents/hoverusers/hoverUserStates";

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
  scp,
  selectedPost,
  scrollPosition,
  copyLink,
  shareOverlay,
  shareOverlayScp,
  threeDotOverlaySCP,
  threeDotOverlay,
  commentIdFind,
  searchQueryComment,
  alerts,
  lnState,
  navLocation,
  lnnl,
  selectedUser,
  userReadyState,
  prevHref,
  hcState,
  huState,
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
