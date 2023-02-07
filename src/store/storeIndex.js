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
}); //reducers here

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
