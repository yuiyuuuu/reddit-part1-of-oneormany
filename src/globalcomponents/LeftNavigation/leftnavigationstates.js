const SET_LEFTNAV_STATE = "SET_LEFTNAV_STATE";

export const dispatchSetLeftNavState = (state) => ({
  type: SET_LEFTNAV_STATE,
  state,
});

//display = false = no display
export default function (state = false, action) {
  switch (action.type) {
    case SET_LEFTNAV_STATE:
      return action.state;
    default:
      return state;
  }
}
