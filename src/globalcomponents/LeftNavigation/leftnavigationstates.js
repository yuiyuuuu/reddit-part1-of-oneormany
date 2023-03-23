const SET_LEFTNAV_STATE = "SET_LEFTNAV_STATE";

export const dispatchSetLeftNavState = (state) => ({
  type: SET_LEFTNAV_STATE,
  state,
});

//display = false = no display
//set true for now for testing, will change to false later
export default function (state = true, action) {
  switch (action.type) {
    case SET_LEFTNAV_STATE:
      return action.state;
    default:
      return state;
  }
}
