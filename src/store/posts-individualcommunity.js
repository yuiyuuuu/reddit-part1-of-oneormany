import { makeGetRequest, makePutRequest } from "../requests/helperFunction";

const FETCH_COMMUNITY = "FETCH_COMMUNITY";
const JOIN_COMMUNITY = "JOIN_COMMUNITY";
const LEAVE_COMMUNITY = "LEAVE_COMMUNITY";

const dispatchFetch = (community) => ({
  type: FETCH_COMMUNITY,
  community,
});

const dispatchJoin = (community) => ({
  type: JOIN_COMMUNITY,
  community,
});

const dispatchLeave = (community) => ({
  type: LEAVE_COMMUNITY,
  community,
});

export function fetchCommunity(id) {
  return async (dispatch) => {
    try {
      const community = await makeGetRequest(`communities/single/${id}`);
      console.log(community);
      dispatch(dispatchFetch(community));
    } catch (error) {
      console.log(error);
    }
  };
}

export function joinCommunity(id, communityid) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("communities/join", {
        userid: id,
        communityid: communityid,
      });

      dispatch(dispatchJoin(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function leaveCommunity(id, communityid) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("communities/leave", {
        userid: id,
        communityid: communityid,
      });

      dispatch(dispatchLeave(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_COMMUNITY:
      return action.community;
    case JOIN_COMMUNITY:
      return action.community;
    case LEAVE_COMMUNITY:
      return action.community;
    default:
      return state;
  }
}
