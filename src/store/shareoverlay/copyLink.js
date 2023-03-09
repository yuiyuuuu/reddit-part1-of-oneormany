const SET_LINKTOCOPY_POST = "SET_LINKTOCOPY_POST";

const dispatchSetLinkToCopy = (post) => ({
  type: SET_LINKTOCOPY_POST,
  post,
});

export function setLinkToCopy(post) {
  return (dispatch) => {
    dispatch(dispatchSetLinkToCopy(post));
  };
}

export default function (state = {}, action) {
  switch (action.type) {
    case SET_LINKTOCOPY_POST:
      return action.post;
    default:
      return state;
  }
}
