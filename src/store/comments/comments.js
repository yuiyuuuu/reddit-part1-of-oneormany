const SET_COMMENTS = "SET_COMMENTS";

const SORT_TOP = "SORT_TOP";
const SORT_BEST = "SORT_BEST";
const SORT_OLD = "SORT_OLD";
const SORT_NEW = "SORT_NEW";

import { SlowBuffer } from "buffer";
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

export function setComments(comments) {
  return (dispatch) => {
    const group = {};
    comments.slice().forEach((v) => {
      group[v.parentId] ||= [];
      group[v.parentId].push(v);
    });

    dispatch(dispatchComments(group));
  };
}

export default function (state = {}, action) {
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

      console.log(top);

      const bottom = sortBySampleSize
        .slice(Math.ceil(sortBySampleSize.length / 2))
        .sort(sortByPercentage);

      return { ...state, null: [...top, ...bottom] }; //combine the two arrays

    case SORT_OLD:
      return { ...state, null: state[null].sort(sortCommentsByOld) };

    case SORT_NEW:
      return { ...state, null: state[null].sort(sorting) };
    default:
      return state;
  }
}
