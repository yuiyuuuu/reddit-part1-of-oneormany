const SET_SCP = "SET_SCP";

const dispatchSetScp = (value) => ({
  type: SET_SCP,
  value,
});

export function setScp(value) {
  return (dispatch) => {
    dispatch(dispatchSetScp(value));
  };
}

export default function (state = null, action) {
  switch (action.type) {
    case SET_SCP:
      return action.value;
    default:
      return state;
  }
}
