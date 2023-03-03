import {
  makeGetRequest,
  makePostRequest,
  makePutRequest,
} from "../requests/helperFunction";
import { sorting } from "../requests/sortingfunction";

const FETCH_COMMUNITY = "FETCH_COMMUNITY";
const JOIN_COMMUNITY = "JOIN_COMMUNITY";
const LEAVE_COMMUNITY = "LEAVE_COMMUNITY";

const STYLING_CHANGE = "STYLING_CHANGE";

const CLEAR = "CLEAR";
const CREATE_COMMUNITY = "CREATE_COMMUNITY";
const CHANGE_DESC = "CHANGE_DESC";
const CHANGE_ICONIMAGE = "CHANGE_ICONIMAGE";
const CHANGE_BANNER = "CHANGE_BANNER";

const HANDLE_UPVOTE = "HANDLE_UPVOTE_COMMUNITY";
const HANDLE_DOWNVOTE = "HANDLE_DOWNVOTE_COMMUNITY";
const REMOVE_UPVOTE = "HANDLE_REMOVEUPVOTE_COMMUNITY";
const REMOVE_DOWNVOTE = "HANDLE_REMOVEDOWNVOTE_COMMUNITY";

const HANDLE_UPVOTE_COMMENT = "HANDLE_UPVOTE_COMMENT";
const HANDLE_DOWNVOTE_COMMENT = "HANDLE_DOWNVOTE_COMMENT";
const HANDLE_REMOVEDOWNVOTE_COMMENT = "HANDLE_REMOVEDOWNVOTE_COMMENT";
const HANDLE_REMOVEUPVOTE_COMMENT = "HANDLE_REMOVEUPVOTE_COMMENT";

const HANDLE_ADDCOMMENT = "HANDLE_ADDCOMMENT";

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

const dispatchUpvoteCommunity = (post) => ({
  type: HANDLE_UPVOTE,
  post,
});

const dispatchDownvoteCommunity = (post) => ({
  type: HANDLE_DOWNVOTE,
  post,
});

const dispatchRemoveUpvoteCommunity = (post) => ({
  type: REMOVE_UPVOTE,
  post,
});

const dispatchRemoveDownvoteCommunity = (post) => ({
  type: REMOVE_DOWNVOTE,
  post,
});

const dispatchUpvoteComment = (post) => ({
  type: HANDLE_UPVOTE_COMMENT,
  post,
});

const dispatchDownvoteComment = (post) => ({
  type: HANDLE_DOWNVOTE_COMMENT,
  post,
});

const dispatchRemoveUpvoteComment = (post) => ({
  type: HANDLE_REMOVEUPVOTE_COMMENT,
  post,
});

const dispatchRemoveDownvoteComment = (post) => ({
  type: HANDLE_REMOVEDOWNVOTE_COMMENT,
  post,
});

const dispatchAddComment = (post) => ({
  type: HANDLE_ADDCOMMENT,
  post,
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

export function handleCommunityUpvote(obj) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("communities/upvote", obj);
      dispatch(dispatchUpvoteCommunity(data));
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleCommunityDownvote(obj) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("communities/downvote", obj);
      dispatch(dispatchDownvoteCommunity(data));
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleCommunityRemoveUpvote(obj) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("communities/upvote/remove", obj);
      dispatch(dispatchRemoveUpvoteCommunity(data));
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleCommunityRemoveDownvote(obj) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("communities/downvote/remove", obj);
      dispatch(dispatchRemoveDownvoteCommunity(data));
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleCommentUpvote(obj) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("/communities/comment/upvote", obj);
      dispatch(dispatchUpvoteComment(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleCommentDownvote(obj) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("/communities/comment/downvote", obj);
      dispatch(dispatchDownvoteComment(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleRemoveCommentUpvote(obj) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest(
        "/communities/comment/upvote/remove",
        obj
      );
      dispatch(dispatchRemoveUpvoteComment(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleRemoveCommentDownvote(obj) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest(
        "/communities/comment/downvote/remove",
        obj
      );
      dispatch(dispatchRemoveDownvoteComment(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleAddComment(obj) {
  return async (dispatch) => {
    try {
      const data = await makePostRequest("communities/comment/add", obj);
      dispatch(dispatchAddComment(data.post));
      return data;
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
    case HANDLE_UPVOTE:
      const v = state.posts
        .map((post) => (post.id === action.post.id ? action.post : post))
        .sort(sorting);
      return { ...state, posts: v };
    case HANDLE_DOWNVOTE:
      const l = state.posts
        .map((post) => (post.id === action.post.id ? action.post : post))
        .sort(sorting);
      return { ...state, posts: l };
    case REMOVE_UPVOTE:
      const k = state.posts
        .map((post) => (post.id === action.post.id ? action.post : post))
        .sort(sorting);
      return { ...state, posts: k };
    case REMOVE_DOWNVOTE:
      const q = state.posts
        .map((post) => (post.id === action.post.id ? action.post : post))
        .sort(sorting);
      return { ...state, posts: q };
    case HANDLE_UPVOTE_COMMENT:
      const w = state.posts
        .map((post) => (post.id === action.post.id ? action.post : post))
        .sort(sorting);
      return { ...state, posts: w };
    case HANDLE_DOWNVOTE_COMMENT:
      const p = state.posts
        .map((post) => (post.id === action.post.id ? action.post : post))
        .sort(sorting);
      return { ...state, posts: p };
    case HANDLE_REMOVEUPVOTE_COMMENT:
      const m = state.posts
        .map((post) => (post.id === action.post.id ? action.post : post))
        .sort(sorting);
      return { ...state, posts: m };
    case HANDLE_REMOVEDOWNVOTE_COMMENT:
      const g = state.posts
        .map((post) => (post.id === action.post.id ? action.post : post))
        .sort(sorting);
      return { ...state, posts: g };
    case HANDLE_ADDCOMMENT:
      const y = state.posts
        .map((post) => (post.id === action.post.id ? action.post : post))
        .sort(sorting);
      return { ...state, posts: y };
    default:
      return state;
  }
}
