const SET_COMMENTIDFIND_STATE = "SET_COMMENTIDFIND_STATE";

const dispatchSetCommentIdFind = (v) => ({
  type: SET_COMMENTIDFIND_STATE,
  v,
});

//find all parent comments, aka all comments above
export function setCommentIdFind(commentState, commentToFind, context) {
  return (dispatch) => {
    let find = commentToFind;
    const result = [];
    let top = false;
    let count = 0;

    //finds all parent comments
    while (find) {
      if (count >= Number(context)) {
        break;
      }

      const parentComment = commentState.find((v) => v.id == find?.parentId);
      if (!parentComment) break;

      result.push(parentComment);

      find = parentComment;

      if (!parentComment?.parentId) {
        top = true;
      }

      count += 1;
    }
    return { result: result, top: top };
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
