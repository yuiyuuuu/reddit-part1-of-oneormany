const SET_COMMENTS = "SET_COMMENTS";

const dispatchComments = (comments) => ({
  type: SET_COMMENTS,
  comments,
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
    default:
      return state;
  }
}
