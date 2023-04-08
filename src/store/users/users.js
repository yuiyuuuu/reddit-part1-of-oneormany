const SET_SELECTED_USER = "SET_SELECTED_USER";
import { makeGetRequest, makePutRequest } from "../../requests/helperFunction";

const JOIN_COMMUNITY_AUTHSTATE = "JOIN_COMMUNITY_AUTHSTATE";
const LEAVE_COMMUNITY_AUTHSTATE = "LEAVE_COMMUNITY_AUTHSTATE";

const UPVOTE_USERS = "UPVOTES_USERS";

const dispatchSetSelectedUser = (user) => ({
  type: SET_SELECTED_USER,
  user,
});

const dispatchJoinCommunityAuth = (user) => ({
  type: JOIN_COMMUNITY_AUTHSTATE,
  user,
});

const dispatchLeaveCommunityAuth = (user) => ({
  type: LEAVE_COMMUNITY_AUTHSTATE,
  user,
});

const dispatchUpvoteUsersPage = (user) => ({
  type: UPVOTE_USERS,
  user,
});

export function setSelectedUser(name) {
  return async (dispatch) => {
    try {
      const data = await makeGetRequest(`users/${name}`);
      dispatch(dispatchSetSelectedUser(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function joinCommunityAuth(obj) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("users/join/community", obj);
      console.log(data);
      dispatch(dispatchJoinCommunityAuth(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function leaveCommunityAuth(obj) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("users/leave/community", obj);
      dispatch(dispatchLeaveCommunityAuth(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function votesUsers(obj, which) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("/users/vote", {
        ...obj,
        which: which,
      });
      dispatch(dispatchUpvoteUsersPage(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export default function (state = {}, action) {
  switch (action.type) {
    case SET_SELECTED_USER:
      return action.user;

    case JOIN_COMMUNITY_AUTHSTATE:
      return action.user;

    case LEAVE_COMMUNITY_AUTHSTATE:
      return action.user;

    case UPVOTE_USERS:
      return action.user;

    default:
      return state;
  }
}
