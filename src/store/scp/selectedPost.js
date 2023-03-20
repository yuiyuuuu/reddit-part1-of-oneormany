import { makePostRequest, makePutRequest } from "../../requests/helperFunction";

const SET_SELECTEDPOST_SINGLE = "SET_SELECTEDPOST_SINGLE";
const HANDLE_ADDCOMMENT = "HANDLE_ADDCOMMENT";

//votes
const HANDLE_SELECTEDPOST_UPVOTE = "HANDLE_SELECTEDPOST_UPVOTE";
const HANDLE_SELECTEDPOST_DOWNVOTE = "HANDLE_SELECTEDPOST_DOWNVOTE";
const HANDLE_SELECTEDPOST_UPVOTE_REMOVE = "HANDLE_SELECTEDPOST_UPVOTE_REMOVE";
const HANDLE_SELECTEDPOST_DOWNVOTE_REMOVE =
  "HANDLE_SELECTEDPOST_DOWNVOTE_REMOVE";

const dispatchSetSelectedPost = (post) => ({
  type: SET_SELECTEDPOST_SINGLE,
  post,
});

const dispatchAddComment = (post) => ({
  type: HANDLE_ADDCOMMENT,
  post,
});

const dispatchUpvoteSelectedPost = (post) => ({
  type: HANDLE_SELECTEDPOST_UPVOTE,
  post,
});

const dispatchDownvoteSelectedPost = (post) => ({
  type: HANDLE_SELECTEDPOST_DOWNVOTE,
  post,
});

const dispatchRemoveUpvoteSelectedPost = (post) => ({
  type: HANDLE_SELECTEDPOST_UPVOTE_REMOVE,
  post,
});

const dispatchRemoveDownvoteSelectedPost = (post) => ({
  type: HANDLE_SELECTEDPOST_DOWNVOTE_REMOVE,
  post,
});

export function setSelectedPost(post) {
  return (dispatch) => {
    dispatch(dispatchSetSelectedPost(post));
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

export function handleSelectedPostUpvote(obj) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("communities/upvote", obj);
      dispatch(dispatchUpvoteSelectedPost(data));
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleSelectedPostDownvote(obj) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("communities/downvote", obj);
      dispatch(dispatchDownvoteSelectedPost(data));
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleSelectedPostRemoveUpvote(obj) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("communities/upvote/remove", obj);
      dispatch(dispatchRemoveUpvoteSelectedPost(data));
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleSelectedPostRemoveDownvote(obj) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("communities/downvote/remove", obj);
      dispatch(dispatchRemoveDownvoteSelectedPost(data));
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

export default function (state = {}, action) {
  switch (action.type) {
    case SET_SELECTEDPOST_SINGLE:
      ``;
      return action.post;

    case HANDLE_ADDCOMMENT:
      // const y = state.posts
      //   .map((post) => (post.id === action.post.id ? action.post : post))
      //   .sort(sorting);
      // return { ...state, posts: y };

      return action.post;
    case HANDLE_SELECTEDPOST_UPVOTE:
      return action.post;
    case HANDLE_SELECTEDPOST_UPVOTE_REMOVE:
      return action.post;
    case HANDLE_SELECTEDPOST_DOWNVOTE:
      return action.post;
    case HANDLE_SELECTEDPOST_DOWNVOTE_REMOVE:
      return action.post;
    default:
      return state;
  }
}
