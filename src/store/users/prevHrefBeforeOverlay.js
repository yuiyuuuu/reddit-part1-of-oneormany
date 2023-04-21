const SET_PREV_HREF = "SET_PREV_HREF";

const dispatchPrevHref = (value) => ({
  type: SET_PREV_HREF,
  value,
});

export function handleSetPrevHref(v) {
  return (dispatch) => {
    dispatch(dispatchPrevHref(v));
  };
}

export default function (state = null, action) {
  switch (action.type) {
    case SET_PREV_HREF:
      return action.value;
    default:
      return state;
  }
}
