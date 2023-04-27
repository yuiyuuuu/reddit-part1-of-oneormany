const SET_HU_STATE = "SET_HU_STATE";

export const dispatchSetHuState = (value) => ({
  type: SET_HU_STATE,
  value,
});

export default function (state = { display: false }, action) {
  switch (action.type) {
    case SET_HU_STATE:
      return action.value;
    default:
      return state;
  }
}
