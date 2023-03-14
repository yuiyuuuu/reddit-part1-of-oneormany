const SET_SEARCH_QUERY_COMMENT = "SET_SEARCH_QUERY_COMMENT";

export const dispatchSetCommentSearchQuery = (value) => ({
  type: SET_SEARCH_QUERY_COMMENT,
  value,
});

export default function (state = null, action) {
  switch (action.type) {
    case SET_SEARCH_QUERY_COMMENT:
      return action.value;
    default:
      return state;
  }
}
