import {
  makeGetRequest,
  makePostRequest,
  makePutRequest,
} from "../requests/helperFunction";

const FETCH_COMMUNITY = "FETCH_COMMUNITY";
const JOIN_COMMUNITY = "JOIN_COMMUNITY";
const LEAVE_COMMUNITY = "LEAVE_COMMUNITY";

const STYLING_CHANGE = "STYLING_CHANGE";

const CLEAR = "CLEAR";
const CREATE_COMMUNITY = "CREATE_COMMUNITY";
const CHANGE_DESC = "CHANGE_DESC";
const CHANGE_ICONIMAGE = "CHANGE_ICONIMAGE";
const CHANGE_BANNER = "CHANGE_BANNER";

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

const dispatchClear = () => ({
  type: CLEAR,
});

const dispatchStylingChange = (community) => ({
  type: STYLING_CHANGE,
  community,
});

const dispatchChangeDesc = (community) => ({
  type: CHANGE_DESC,
  community,
});

const dispatchChangeIcon = (community) => ({
  type: CHANGE_ICONIMAGE,
  community,
});

const dispatchBanner = (community) => ({
  type: CHANGE_BANNER,
  community,
});

export function fetchCommunity(id) {
  return async (dispatch) => {
    try {
      const community = await makeGetRequest(`communities/single/${id}`);
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

export function clearCommunity() {
  return (dispatch) => {
    dispatch(dispatchClear());
  };
}

export function stylingChange(v) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("communities/stylingchange", v);
      dispatch(dispatchStylingChange(data));
      return "success";
    } catch (error) {
      console.log(error);
      return "error";
    }
  };
}

export function changeDescription(v) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("communities/description", v);
      dispatch(dispatchChangeDesc(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function CreateCommunity(body) {
  return async () => {
    try {
      const community = await makePostRequest("communities/create", body);
      if (community === "exists") {
        return "exists";
      }

      fetchCommunity(community.id);
      return "success";
    } catch (error) {
      console.log(error);
    }
  };
}

export function ChangeIconImage(body) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("communities/iconimage", body);
      dispatch(dispatchChangeIcon(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function changeBanner(body) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("communities/banner", body);
      dispatch(dispatchBanner(data));
      return "success";
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
    case STYLING_CHANGE:
      return action.community;
    case CLEAR:
      return {};
    case CHANGE_DESC:
      return action.community;
    case CHANGE_ICONIMAGE:
      return action.community;
    case CHANGE_BANNER:
      return action.community;
    default:
      return state;
  }
}
