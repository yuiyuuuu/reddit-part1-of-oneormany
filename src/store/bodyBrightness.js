const SET_BODYBRIGHTNESS = "SET_BODYBRIGHTNESS";

const dispatchBody = (v) => ({
  type: SET_BODYBRIGHTNESS,
  v,
});

export function setBodyBrightness(value) {
  return (dispatch) => {
    dispatch(dispatchBody(value));
  };
}

export default function (state = null, action) {
  switch (action.type) {
    case SET_BODYBRIGHTNESS:
      return action.v;
    default:
      return state;
  }
}
