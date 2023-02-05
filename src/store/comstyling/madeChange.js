const SET_MADECHANGE = "SET_MADECHANGE";

const dispatchMadeChange = (bool) => ({
  type: SET_MADECHANGE,
  bool,
});

export function setMadeChange(bool) {
  return (dispatch) => {
    dispatch(dispatchMadeChange(bool));
  };
}

export default function (state = false, action) {
  switch (action.type) {
    case SET_MADECHANGE:
      return action.bool;

    default:
      return state;
  }
}
