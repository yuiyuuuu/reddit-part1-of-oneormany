const SET_ICONIMAGE = "SET_ICONIMAGE";

const dispatchImage = (v) => ({
  type: SET_ICONIMAGE,
  v,
});

export function setIconImage(value) {
  return (dispatch) => {
    dispatch(dispatchImage(value));
  };
}

export default function (state = null, action) {
  switch (action.type) {
    case SET_ICONIMAGE:
      return action.v;
    default:
      return state;
  }
}
