const SET_SCREENPROPERTIES = "SET_SCREENPROPERTIES";

const dispatchScreen = (prop) => ({
  type: SET_SCREENPROPERTIES,
  prop,
});

export function handleSet(prop) {
  return (dispatch) => {
    dispatch(dispatchScreen(prop));
  };
}

export default function (state = 0, action) {
  switch (action.type) {
    case SET_SCREENPROPERTIES:
      return action.prop;
    default:
      return state;
  }
}
