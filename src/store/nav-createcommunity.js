const TOGGLE_STATE = "TOGGLE_STATE";

const dispatchToggle = (bool) => ({
  type: TOGGLE_STATE,
  bool,
});

export function toggleCreateCommunity(bool) {
  return (dispatch) => {
    dispatch(dispatchToggle(bool));
  };
}

export default function (state = false, action) {
  switch (action.type) {
    case TOGGLE_STATE:
      return action.bool;

    default:
      return state;
  }
}
