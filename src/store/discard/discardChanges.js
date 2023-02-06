const TOGGLE_DISCARD = "TOGGLE_DISCARD";

const dispatchDiscard = (bool) => ({
  type: TOGGLE_DISCARD,
  bool,
});

export function toggleDiscard(bool) {
  return (dispatch) => {
    dispatch(dispatchDiscard(bool));
  };
}

export default function (state = false, action) {
  switch (action.type) {
    case TOGGLE_DISCARD:
      return action.bool;
    default:
      return state;
  }
}
