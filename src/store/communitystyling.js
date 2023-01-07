const TOGGLE_STATE2 = "TOGGLE_STATE2";

const dispatchToggle = (bool) => ({
  type: TOGGLE_STATE2,
  bool,
});

export function toggleCommunityStyling(bool) {
  return (dispatch) => {
    dispatch(dispatchToggle(bool));
  };
}

export default function (state = false, action) {
  switch (action.type) {
    case TOGGLE_STATE2:
      return action.bool;
    default:
      return state;
  }
}
