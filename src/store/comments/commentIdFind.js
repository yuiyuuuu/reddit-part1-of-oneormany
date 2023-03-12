const SET_COMMENTIDFIND_STATE = "SET_COMMENTIDFIND_STATE";

const dispatchSetCommentIdFind = (v) => ({
  type: SET_COMMENTIDFIND_STATE,
  v,
});

//find all parent comments, aka all comments above
export function setCommentIdFind(commentState, commentToFind) {
  return (dispatch) => {
    let find = commentToFind;
    const result = [commentToFind];

    //finds all parent comments
    while (find) {
      const parentComment = commentState.find((v) => v.id == find.parentId);
      if (!parentComment) break;

      result.push(parentComment);

      find = parentComment;
    }
    return result;
  };
}

export default function (state = null, action) {
  switch (action.type) {
    case SET_COMMENTIDFIND_STATE:
      return action.v;
    default:
      return state;
  }
}
