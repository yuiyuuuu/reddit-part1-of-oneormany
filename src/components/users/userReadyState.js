const SET_READY_USER = "SET_READY_USER";

export const dispatchSetReadyUser = (v) => ({
  type: SET_READY_USER,
  v,
});

export default function (state = false, action) {
  switch (action.type) {
    case SET_READY_USER:
      return action.v;
    default:
      return state;
  }
}
