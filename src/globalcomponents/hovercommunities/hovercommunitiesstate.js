const SET_HC_STATE = "SET_HC_STATE";

export const dispatchSetHcState = (value) => ({
  type: SET_HC_STATE,
  value,
});

export default function (state = { display: false }, action) {
  switch (action.type) {
    case SET_HC_STATE:
      return action.value;
    default:
      return state;
  }
}
