const SET_SCROLLPOS = "SET_SCROLLPOS";

const dispatchSetScrollPos = (value) => ({
  type: SET_SCROLLPOS,
  value,
});

export function setScrollPosition() {
  return (dispatch) => {
    const pos = window.scrollY;
    dispatch(dispatchSetScrollPos(pos));
  };
}

export default function (state = 0, action) {
  switch (action.type) {
    case SET_SCROLLPOS:
      return action.value;
    default:
      return state;
  }
}
