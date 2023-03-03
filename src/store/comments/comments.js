const SET_COMMENTS = "SET_COMMENTS";
const ADD_COMMENT_TOP = "ADD_COMMENT_TOP";
const ADD_REPLY_F = "ADD_REPLY_F";
const FILTER_A_COMMENT = "FILTER_A_COMMENT"; //FILTER A COMMENT SO NEW COMMENTS ARE ON TOP

const SORT_TOP = "SORT_TOP";
const SORT_BEST = "SORT_BEST";
const SORT_OLD = "SORT_OLD";
const SORT_NEW = "SORT_NEW";
const SORT_CONTROVERSIAL = "SORT_CONTROVERSIAL";

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

export function setComments(comments, sorttype) {
  return (dispatch) => {
    const group = { new: [] };
    comments.slice().forEach((v) => {
      group[v.parentId] ||= [];
      group[v.parentId].push(v);
    });

    dispatch(dispatchComments(group));

    if (!comments.length) return;
    sorttype.toLowerCase() == "best" && dispatch(dispatchSortBest());
    sorttype.toLowerCase() == "top" && dispatch(dispatchSortTop());
    sorttype.toLowerCase() == "new" && dispatch(dispatchSortNew());
    sorttype.toLowerCase() == "controversial" &&
      dispatch(dispatchSortControversial());
    sorttype.toLowerCase() == "old" && dispatch(dispatchSortOld());
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
      console.log(state[null].filter((v) => v.id !== action.id));
      return { ...state, null: state[null].filter((v) => v.id !== action.id) };
    default:
      return state;
  }
}
