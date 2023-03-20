const SET_SHAREOVERLAY_STATE = "SET_SHAREOVERLAY_STATE_SCP";
const CLEAR_STATE_SHAREOVERLAY = "CLEAR_STATE_SHAREOVERLAY_SCP";

const dispatchSetOverlayState = (value) => ({
  type: SET_SHAREOVERLAY_STATE,
  value,
});

export const dispatchClearState = () => ({
  type: CLEAR_STATE_SHAREOVERLAY,
});

export function setOverlayStateSCP(value) {
  return (dispatch) => {
    dispatch(dispatchSetOverlayState(value));
  };
}

export default function (state = {}, action) {
  switch (action.type) {
    case SET_SHAREOVERLAY_STATE:
      return action.value;
    case CLEAR_STATE_SHAREOVERLAY:
      return {};
    default:
      return state;
  }
}
