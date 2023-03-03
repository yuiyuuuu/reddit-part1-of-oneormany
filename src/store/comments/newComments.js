const ADD_NEWCOMMENT = "ADD_NEWCOMMENT";

const HANDLE_UPVOTE_COMMENT = "HANDLE_UPVOTE_COMMENT_NEW";
const HANDLE_DOWNVOTE_COMMENT = "HANDLE_DOWNVOTE_COMMENT_NEW";
const HANDLE_REMOVEDOWNVOTE_COMMENT = "HANDLE_REMOVEDOWNVOTE_COMMENT_NEW";
const HANDLE_REMOVEUPVOTE_COMMENT = "HANDLE_REMOVEUPVOTE_COMMENT_NEW";

import { makePutRequest } from "../../requests/helperFunction";

export const dispatchAddCommentNew = (comment) => ({
  type: ADD_NEWCOMMENT,
  comment,
});

const dispatchUpvoteComment = (comment) => ({
  type: HANDLE_UPVOTE_COMMENT,
  comment,
});

const dispatchDownvoteComment = (comment) => ({
  type: HANDLE_DOWNVOTE_COMMENT,
  comment,
});

const dispatchRemoveUpvoteComment = (comment) => ({
  type: HANDLE_REMOVEUPVOTE_COMMENT,
  comment,
});

const dispatchRemoveDownvoteComment = (comment) => ({
  type: HANDLE_REMOVEDOWNVOTE_COMMENT,
  comment,
});

export function handleNewCommentUpvote(obj) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("/communities/comment/upvote/new", obj);
      dispatch(dispatchUpvoteComment(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleNewCommentDownvote(obj) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("/communities/comment/downvote", obj);
      dispatch(dispatchDownvoteComment(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleRemoveNewCommentUpvote(obj) {
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

export function handleRemoveNewCommentDownvoteN(obj) {
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

//sample state : {href:'/hi', func: function, parameters: 'function paramteres'}
export default function (state = [], action) {
  switch (action.type) {
    case ADD_NEWCOMMENT:
      return [action.comment, ...state];
    case HANDLE_UPVOTE_COMMENT:
      const w = state.map((comment) =>
        comment.id === action.comment.id ? action.comment : comment
      );
      return w;
    case HANDLE_DOWNVOTE_COMMENT:
      const p = state.posts.map((post) =>
        post.id === action.post.id ? action.post : post
      );
      return { ...state, posts: p };
    case HANDLE_REMOVEUPVOTE_COMMENT:
      const m = state.posts.map((post) =>
        post.id === action.post.id ? action.post : post
      );
      return { ...state, posts: m };
    case HANDLE_REMOVEDOWNVOTE_COMMENT:
      const g = state.posts.map((post) =>
        post.id === action.post.id ? action.post : post
      );
      return { ...state, posts: g };
    default:
      return state;
  }
}
