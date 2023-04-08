import {
  makeGetRequest,
  makePostRequest,
  makePutRequest,
} from "../requests/helperFunction";

const AUTH = "AUTH";
const ADD_COMMUNITY = "ADD_COMMUNITY";

const ADD_COMMUNITY_FAVORITE_AUTH = "ADD_COMMUNITY_FAVORITE_AUTH";
const REMOVE_COMMUNITY_FAVORITE_AUTH = "ADD_COMMUNITY_FAVORITE_AUTH";

const FOLLOW_USER_USERS = "FOLLOW_USER_USERS";
const UNFOLLOW_USER_USERS = "UNFOLLOW_USER_USERS";

const UPVOTE_AUTH_POST = "UPVOTE_AUTH_POST";
const DOWNVOTE_AUTH_POST = "DOWNVOTE_AUTH_POST";
const UPVOTE_AUTH_POST_remove = "UPVOTE_AUTH_POST_remove";
const DOWNVOTE_AUTH_POST_remove = "DOWNVOTE_AUTH_POST_remove";

const setAuth = (auth) => ({
  type: AUTH,
  auth,
});

const addACommunity = (user) => ({
  type: ADD_COMMUNITY,
  user,
});

const dispatchAddFavoriteCommunity = (user) => ({
  type: ADD_COMMUNITY_FAVORITE_AUTH,
  user,
});

const dispatchRemoveFavoriteCommunity = (user) => ({
  type: REMOVE_COMMUNITY_FAVORITE_AUTH,
  user,
});

const dispatchFollowUser = (user) => ({
  type: FOLLOW_USER_USERS,
  user,
});

const dispatchUnfollowUser = (user) => ({
  type: FOLLOW_USER_USERS,
  user,
});

const dispatchUpvoteAuth = (user) => ({
  type: UPVOTE_AUTH_POST,
  user,
});

const dispatchDownvoteAuth = (user) => ({
  type: DOWNVOTE_AUTH_POST,
  user,
});

const dispatchUpvoteAuthRemove = (user) => ({
  type: UPVOTE_AUTH_POST,
  user,
});

const dispatchDownvoteAuthRemove = (user) => ({
  type: DOWNVOTE_AUTH_POST,
  user,
});

export function getLocalData() {
  const token = window.localStorage.getItem("token");

  return async (dispatch) => {
    try {
      if (token && token !== "undefined") {
        const user = await makeGetRequest("authentication/getlocaldata", {
          headers: {
            authorization: token,
          },
        });

        dispatch(setAuth(user));
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function authenticate(username, password) {
  return async (dispatch) => {
    try {
      const data = await makePostRequest("authentication/login", {
        username: username,
        password: password,
      });

      if (data === "wrongpassword" || data == "notfound") {
        return data;
      }
      window.localStorage.setItem("token", data.jwt);
      window.localStorage.removeItem("nlrecent"); //remove not logged in user recent communities
      dispatch(setAuth(data.user));
      return "successful";
    } catch (error) {
      console.log(error);
    }
  };
}

export function signup(object) {
  return async (dispatch) => {
    try {
      const data = await makePostRequest("authentication/signup", object);

      window.localStorage.setItem("token", data.jwt);
      return dispatch(setAuth(data.user));
    } catch (error) {
      console.log(error);
    }
  };
}

export function logout() {
  return (dispatch) => {
    window.localStorage.removeItem("token");
    dispatch(setAuth({}));
  };
}

export function addCommunity(info) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("communities/join", info);
      dispatch(addACommunity(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function addCommunityToFavorite(obj) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("/authentication/favorite/add", obj);
      dispatch(dispatchAddFavoriteCommunity(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function removeCommunityToFavorite(obj) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("/authentication/favorite/remove", obj);
      dispatch(dispatchRemoveFavoriteCommunity(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function followUser(object) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("users/follow", object);
      dispatch(dispatchFollowUser(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function unfollowUser(object) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("users/unfollow", object);
      dispatch(dispatchUnfollowUser(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function upvoteAuth() {}

export function downvoteAuth() {}

export function upvoteAuthRemove() {}

export function downvoteAuthRemove() {}

export default function (state = {}, action) {
  switch (action.type) {
    case AUTH:
      return action.auth;
    case ADD_COMMUNITY:
      return action.user;
    case ADD_COMMUNITY_FAVORITE_AUTH:
      return action.user;
    case REMOVE_COMMUNITY_FAVORITE_AUTH:
      return action.user;

    case FOLLOW_USER_USERS:
      return action.user;

    case UNFOLLOW_USER_USERS:
      return action.user;

    default:
      return state;
  }
}
