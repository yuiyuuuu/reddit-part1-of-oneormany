import { makePutRequest } from "../../requests/helperFunction";

const SET_COMMENTS = "SET_COMMENTS";
const ADD_COMMENT_TOP = "ADD_COMMENT_TOP";
const ADD_REPLY_F = "ADD_REPLY_F";
const FILTER_A_COMMENT = "FILTER_A_COMMENT"; //FILTER A COMMENT SO NEW COMMENTS ARE ON TOP

const SORT_TOP = "SORT_TOP";
const SORT_BEST = "SORT_BEST";
const SORT_OLD = "SORT_OLD";
const SORT_NEW = "SORT_NEW";
const SORT_CONTROVERSIAL = "SORT_CONTROVERSIAL";

const REMOVE_DUPLICATES_NEWCOMMENTS = "REMOVE_DUPLICATES_NEWCOMMENTS";

const PUSH_NEWCOMMENTS = "PUSH_NEWCOMMENTS";

const HANDLE_UPVOTE_COMMENT = "HANDLE_UPVOTE_COMMENT";
const HANDLE_DOWNVOTE_COMMENT = "HANDLE_DOWNVOTE_COMMENT";
const HANDLE_REMOVEDOWNVOTE_COMMENT = "HANDLE_REMOVEDOWNVOTE_COMMENT";
const HANDLE_REMOVEUPVOTE_COMMENT = "HANDLE_REMOVEUPVOTE_COMMENT";

const CLEAR_STATE = "CLEAR_STATE_COMMENTS";

//these sort by functions may not be 100% what reddit uses, especially sortByBest .
//i wrote these functions based off of my testing and research. I tried to make it as close as possible

//top - most upvotes, does not take in account sample size
//best- takes in account upvotes, but also sample size
//controversial- highest # of upvotes and downvotes

import {
  sortCommentsByTop,
  sortCommentsByBest,
  sortCommentsByControversial,
  sortCommentsByOld,
  sortByPercentage,
  sorting,
} from "../../requests/sortingfunction";

const dispatchComments = (comments) => ({
  type: SET_COMMENTS,
  comments,
});

export const dispatchSortTop = () => ({
  type: SORT_TOP,
});

export const dispatchSortBest = () => ({
  type: SORT_BEST,
});

export const dispatchSortOld = () => ({
  type: SORT_OLD,
});

export const dispatchSortNew = () => ({
  type: SORT_NEW,
});

export const dispatchSortControversial = () => ({
  type: SORT_CONTROVERSIAL,
});

export const dispatchAddCommentOne = (comment) => ({
  type: ADD_COMMENT_TOP,
  comment,
});

export const dispatchAddReply = (comment) => ({
  type: ADD_REPLY_F,
  comment,
});

export const dispatchFilterAComment = (id) => ({
  type: FILTER_A_COMMENT,
  id,
});

export const dispatchPushNewComments = (array) => ({
  type: PUSH_NEWCOMMENTS,
  array,
});

export const dispatchRemoveNewCommentDuplicates = (array) => ({
  type: REMOVE_DUPLICATES_NEWCOMMENTS,
  array,
});

const dispatchUpvoteComment = (comment, parentid) => ({
  type: HANDLE_UPVOTE_COMMENT,
  comment,
  parentid,
});

const dispatchDownvoteComment = (comment, parentid) => ({
  type: HANDLE_DOWNVOTE_COMMENT,
  comment,
  parentid,
});

const dispatchRemoveUpvoteComment = (comment, parentid) => ({
  type: HANDLE_REMOVEUPVOTE_COMMENT,
  comment,
  parentid,
});

const dispatchRemoveDownvoteComment = (comment, parentid) => ({
  type: HANDLE_REMOVEDOWNVOTE_COMMENT,
  comment,
  parentid,
});

export const dispatchClearCommentState = () => ({
  type: CLEAR_STATE,
});

export const dispatchSortComments = (comments, sorttype) => {
  return (dispatch) => {
    if (!comments.length) return;
    sorttype.toLowerCase() == "best" && dispatch(dispatchSortBest());
    sorttype.toLowerCase() == "top" && dispatch(dispatchSortTop());
    sorttype.toLowerCase() == "new" && dispatch(dispatchSortNew());
    sorttype.toLowerCase() == "controversial" &&
      dispatch(dispatchSortControversial());
    sorttype.toLowerCase() == "old" && dispatch(dispatchSortOld());
  };
};

export function handleCommentUpvote(obj, parentid) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("communities/comment/upvote", obj);
      dispatch(dispatchUpvoteComment(data, parentid));
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleCommentDownvote(obj, parentid) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest("communities/comment/downvote", obj);
      dispatch(dispatchDownvoteComment(data, parentid));
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleRemoveCommentUpvote(obj, parentid) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest(
        "/communities/comment/upvote/remove",
        obj
      );
      dispatch(dispatchRemoveUpvoteComment(data, parentid));
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleRemoveCommentDownvote(obj, parentid) {
  return async (dispatch) => {
    try {
      const data = await makePutRequest(
        "communities/comment/downvote/remove",
        obj
      );
      dispatch(dispatchRemoveDownvoteComment(data, parentid));
    } catch (error) {
      console.log(error);
    }
  };
}

export function setComments(comments) {
  return (dispatch) => {
    const group = { new: [] };
    comments.slice().forEach((v) => {
      group[v.parentId] ||= [];
      group[v.parentId].push(v);
    });

    dispatch(dispatchComments(group));
  };
}

export default function (state = { new: [] }, action) {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments;
    case SORT_TOP:
      return { ...state, null: state[null].sort(sortCommentsByTop) };
    case SORT_BEST:
      //may have some bugs, i simply do not have a big enough sample size to make sure every edge case is handled
      const sortBySampleSize = state[null]
        .slice()
        .sort(sortCommentsByControversial); //sort by highest interaction, aka highest sample size

      //divide array into two halfs, top = most interactions, bottom = least interactions
      const top = sortBySampleSize
        .slice(0, Math.ceil(sortBySampleSize.length / 2))
        .sort(sortByPercentage); //we sort by highest percentage of upvotes

      const bottom = sortBySampleSize
        .slice(Math.ceil(sortBySampleSize.length / 2))
        .sort(sortByPercentage);

      return { ...state, null: [...top, ...bottom] }; //combine the two arrays

    case SORT_OLD:
      return { ...state, null: state[null].sort(sortCommentsByOld) };

    case SORT_NEW:
      return { ...state, null: state[null].sort(sorting) };

    case SORT_CONTROVERSIAL:
      return { ...state, null: state[null].sort(sortCommentsByControversial) };

    case ADD_COMMENT_TOP:
      // state[null].unshift(action.comment);

      return state;
    case ADD_REPLY_F:
      state[action.comment.parentId].unshift(action.comment);
      return state;
    case FILTER_A_COMMENT:
      return { ...state, null: state[null].filter((v) => v.id !== action.id) };
    case PUSH_NEWCOMMENTS:
      return { ...state, null: [...state.null, ...action.array] };
    case REMOVE_DUPLICATES_NEWCOMMENTS:
      //compare newcomments array and top level state array and filter out duplicates
      state[null] = state[null]?.filter((v) => {
        const find = action.array.find((f) => f.id === v.id)?.id;
        return v.id !== find;
      });
      return state;

    case HANDLE_UPVOTE_COMMENT:
      const map = state[action.parentid].map((comment) =>
        comment.id === action.comment.id ? action.comment : comment
      );
      return { ...state, [action.parentid]: map };

    case HANDLE_DOWNVOTE_COMMENT:
      const map2 = state[action.parentid].map((comment) =>
        comment.id === action.comment.id ? action.comment : comment
      );
      return { ...state, [action.parentid]: map2 };

    case HANDLE_REMOVEUPVOTE_COMMENT:
      const map3 = state[action.parentid].map((comment) =>
        comment.id === action.comment.id ? action.comment : comment
      );
      return { ...state, [action.parentid]: map3 };

    case HANDLE_REMOVEDOWNVOTE_COMMENT:
      const map4 = state[action.parentid].map((comment) =>
        comment.id === action.comment.id ? action.comment : comment
      );
      return { ...state, [action.parentid]: map4 };

    case CLEAR_STATE:
      return { new: [] };
    default:
      return state;
  }
}
