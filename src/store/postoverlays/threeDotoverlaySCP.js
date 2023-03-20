const SET_THREE_STATE = "SET_THREE_STATE_SCP";

const dispatchSetThreeState = (value) => ({
  type: SET_THREE_STATE,
  value,
});

export function setThreeStateSCP(value) {
  return (dispatch) => {
    dispatch(dispatchSetThreeState(value));
  };
}

export default function (state = {}, action) {
  switch (action.type) {
    case SET_THREE_STATE:
      return action.value;
    default:
      return state;
  }
}
